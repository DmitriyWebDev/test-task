import {isMobileView, goToUrl} from './common-functions'

$( document ).ready(function() {

  /** Mobile menu button */

  const headerMobileMenuToggleButton = $( ".js-hamburger" );

  (function ($) {

    const headerMobileMenu = $('#header-mobile-menu');

    if( !headerMobileMenuToggleButton.length ) return false;

    headerMobileMenuToggleButton.on( 'click', function () {

      const $this = $( this );
      const activeClass = 'is-active';

      if( headerMobileMenu.css('display') === 'none' ) {
        headerMobileMenu.css({ 'display' : 'flex' });
        $this.addClass( activeClass );
      } else {
        headerMobileMenu.css({ 'display' : 'none' });
        $this.removeClass( activeClass );
      }

    });

  })($);


  /** Main top menu ( mobile ) */

  (function ($) {

    const topMainMenuClass = 'js-header-main-menu__root-menu';
    const topMainMenuSelector = '.' + topMainMenuClass;
    const topMainMenuItemWithSubmenuClass = 'has-sub-menu';
    const topMainMenuItemWithSubmenuSelector = 'li.' + topMainMenuItemWithSubmenuClass;
    const topMainMenuItemLink = $(topMainMenuSelector + ' li.has-sub-menu a');
    const subMenuOpenClass = 'sub-menu-is-open';

    topMainMenuItemLink.on( 'click', function (e) {

      const $this = $(this);
      const linkUrl = $(this).attr( 'href' );

      if( !isMobileView() ) {
        goToUrl( linkUrl );
        return false;
      }

      e.preventDefault();

      const menuListItem = $this.closest( 'li' );

      if( !menuListItem.length || !menuListItem.hasClass( topMainMenuItemWithSubmenuClass ) ) {
        goToUrl( linkUrl );
        return false;
      }

      const subMenu = menuListItem.children( 'ul' );

      menuListItem.toggleClass(subMenuOpenClass);
      subMenu.slideToggle();

    });

  })($);

  /** Top search form */

  (function ($) {

    // Show/hide search form

    const searchFrom = $( '#top-search-form' );

    $( '.js-show-top-search' ).on( 'click', function () {

      setTimeout( () => {
        searchFrom.css({ 'display' : 'block' });
      }, 10 );

    });

    $(document).on('click', function(event) {

      if ( !$(event.target).closest('#top-search-form').length ) {

        if( searchFrom.css('display') === 'block' ) {
          searchFrom.css({ 'display' : 'none' });
        }

      }
    });

    // Cross browser placeholder color

    const searchInput = $( '#top-search-input' );
    const searchInputWrap = searchInput.closest( '.js-top-search-form__input-wrap' );
    const searchInputPlaceholder = $( searchInputWrap.find('.js-top-search-form__input-placeholder')[0] );

    searchInput.on( 'focus', function () {

      if( !searchInputPlaceholder.length ) return false;

      searchInputPlaceholder.css({ 'display' : 'none' });

    });

    searchInput.on( 'blur', function () {

      if( !searchInputPlaceholder.length ) return false;

      const $this = $(this);
      const value = $this.val();

      if( !value.length ) {
        searchInputPlaceholder.css({ 'display' : 'block' });
      }

    });

  })($);







});
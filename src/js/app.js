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

  })($)






});
import {isMobileView, goToUrl} from './common-functions'
import slick from '../../libs/slick-carousel/slick/slick.min';


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

  /** Sliders */

  (function ($) {

    const sliderModalWrapSelector = '.js-slider-modal';
    const sliderModalWrap = $( sliderModalWrapSelector );

    $( '.js-slider-nav .slider-nav__slide' ).click(function () {

      // setTimeout(function () {
      //   $(window).trigger('resize');
      // }, 0)
      //
      // setTimeout(function () {
      //   $(window).trigger('resize');
      // }, 100)
      //
      // setTimeout(function () {
      //   $(window).trigger('resize');
      // }, 200)
      //
      // setTimeout(function () {
      //   $(window).trigger('resize');
      // }, 300)

      $('#modal-window').fadeIn();
      $( 'body' ).css({'overflow' : 'hidden'});

      $('.js-slider-for').slick("setPosition", 0);
      $('.js-slider-for').resize();
      // $( sliderModalWrapSelector + ' ' + 'button.slick-next' ).click();



    });

    $( '.js-slider-modal__close-button' ).click(function () {
      $('#modal-window').fadeOut();
      $( 'body' ).css({'overflow-y' : 'visible'});
    });

    $( '.js-prev-slide-btn' ).on( 'click', function () {
      $( sliderModalWrapSelector + ' ' + 'button.slick-prev' ).click();
    });

    $( '.js-next-slide-btn' ).on( 'click', function () {
      $( sliderModalWrapSelector + ' ' + 'button.slick-next' ).click();
    });

    const allSlidesCount = countSlides();
    $( sliderModalWrapSelector + ' ' + '.js-slider-modal__slides-count' ).text( allSlidesCount );


    $('.js-slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide){

      const nextSlideNumber = Number(nextSlide) + 1;
      $( sliderModalWrapSelector + ' ' + '.js-slider-modal__current-slide-numb' ).text( nextSlideNumber );

    });


    $('.js-slider-for').slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.js-slider-nav'
    });

    $('.js-slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.js-slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      draggable: false,
      infinite: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

    function countSlides() {

      const slidesCount = $( sliderModalWrapSelector + ' ' + '.js-slider-for' ).find( '.slider-modal__slide' ).length;
      return slidesCount;

    }

  })($);









});
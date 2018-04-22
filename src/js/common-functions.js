export function isMobileView() {

  const headerMobileBlock = $('#mobile-menu-button-and-logo');
  return headerMobileBlock.css( 'display' ) === 'block';

}

export function goToUrl( url = '' ) {

  if( url.length ) {
    window.location.href = url;
  }

}
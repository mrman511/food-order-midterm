$(document).ready(() => {

  window.setTimeout(() => {
    $.ajax({
    url: '/confirmation/finish',
    method: 'GET'
  });
  }, 5000)

});

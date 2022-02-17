$(document).ready(() => {
  let currentCookie = undefined;

  const loadMenu = () => {
    $.ajax({
      url: '/menu',
      method: "GET",
      success: (response) => {
        console.log('add or subtract menu item success');
      }
    })
  }

  const fetchCounts = () => {
    $.ajax({
      url: `/menu/food_count`,
      method: "GET",
      success: (response) => {
        for (let item in response) {
          const $value = response[item].food_count;
          console.log("HERE IS THE ID::: ", response[item].food_id);
          console.log("HERE IS THE COUNT::: ", response[item].food_count);
          const $currentCount = $(`#${response[item].food_id}`);
          $currentCount.text($value);
        }
      },
    });
  };

  const setCookie = () => {
    console.log("INSIDE SET COOKIE AJAX REQUEST");
    $.ajax({
      url: `/orders`,
      method: "GET",
      success: (response) => {
        console.log("SUCCESSFULL: ", response);
        currentCookie = response.id;
        if (response.cookie) {
          fetchCounts();
        }
      },
    });
  };

  setCookie();

  $(".add-food").on("submit", function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('name');
    $.ajax({
      url: `/menu/add/${id}`,
      method: "POST",
      success: (response) => {
        location.reload();
      }
    })
  });

  $(".minus-food").on("submit", function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('name');
    $.ajax({
      url: `/menu/minus/${id}`,
      method: "POST",
      success: (response) => {
        location.reload();
      }
    })
  });
});

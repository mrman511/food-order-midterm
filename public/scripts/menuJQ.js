$(document).ready(() => {
  let currentCookie = undefined;

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
    }).then(() => {
      res.render("/menu");
    });
  });

  $(".minus-food").on("submit", function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('name');
    $.ajax({
      url: `/menu/minus/${id}`,
      method: "POST",
    }).then(() => {
      res.render("/menu");
    });
  });
});

// $('#new-tweet-form').on('submit', function (event) {
//   event.preventDefault();
//   const data = $(this).serialize();
//   if (!tweetText.value) {
//     $errorMessage.text('You gotta say something!');
//     $errorMessage.slideDown(500);
//     setTimeout(() => {
//       $errorMessage.slideUp(1000);
//     }, 1500);
//   } else if (tweetText.value.length > 140) {
//     $errorMessage.text('Backspace it up.');
//     $errorMessage.slideDown(500);
//     setTimeout(() => {
//       $errorMessage.slideUp(1000);
//     }, 1500);
//   } else
//     $.ajax({
//       method: 'POST',
//       url: '/tweets',
//       data: data,
//       success: tweets => {
//         tweetText.value = '';
//         $('.counter').text(140).css({ color: 'black' });
//         getTweets();
//       },
//     });

// const getTweets = () => {
//   $.ajax({
//     url: '/tweets',
//     method: 'GET',
//     success: tweets => {
//       console.log(tweets);
//       $tweetContainer.empty();
//       for (const tweet of tweets) {
//         const $tweet = createTweet(tweet);
//         $tweetContainer.prepend($tweet);
//       }
//     },
//   });
// };

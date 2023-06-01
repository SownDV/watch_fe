$(document).ready(function () {
  if ($(".home-slider").length) {
    $(".home-slider").owlCarousel({
      loop: true,
      nav: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      nav: false,
      dots: false,
    });
  }
  if ($("#news__slider").length) {
    $("#news__slider").owlCarousel({
      loop: true,
      items: 3,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      dots: false,
      nav: true,
    });
  }
  if ($(".related-product__slider").length) {
    $(".related-product__slider").owlCarousel({
      loop: true,
      items: 4,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      dots: false,
      nav: true,
    });
  }
});
if ($(".home-slider").length) {
  $(".home-slider").on("changed.owl.carousel", function () {
    const sliderItem = document.querySelectorAll(".home-slider .owl-item");
    sliderItem.forEach((item) => {
      if (!item.classList.contains("active")) {
        item.childNodes[0]
          .querySelector(".banner__content h2")
          .classList.add(
            "animate__animated",
            "animate__bounceInDown",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(1)")
          .classList.add(
            "animate__animated",
            "animate__fadeInLeft",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(2)")
          .classList.add(
            "animate__animated",
            "animate__fadeInLeft",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(3)")
          .classList.add(
            "animate__animated",
            "animate__zoomInDown",
            "animate__slow"
          );
      } else {
        item.childNodes[0]
          .querySelector(".banner__content h2")
          .classList.remove(
            "animate__animated",
            "animate__bounceInDown",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(1)")
          .classList.remove(
            "animate__animated",
            "animate__fadeInLeft",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(2)")
          .classList.remove(
            "animate__animated",
            "animate__fadeInLeft",
            "animate__slow"
          );
        item.childNodes[0]
          .querySelector(".banner__content .content__text p:nth-child(3)")
          .classList.remove(
            "animate__animated",
            "animate__zoomInDown",
            "animate__slow"
          );
      }
    });
  });
}

let rangeInput = document.querySelectorAll(
  ".filter-form__form--range-price input"
);
let rangeText = document.querySelectorAll(".range-price__text div");
let progress = document.querySelector(".range-price__progress");
if (rangeInput && rangeText && progress) {
  let priceMax = rangeInput[0].max;
  let priceGap = 3000000;

  rangeInput.forEach((input) => {
    input.addEventListener("input", (event) => {
      let minVal = parseInt(rangeInput[0].value);
      let maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (event.target.className === "min-range") {
          minVal = rangeInput[0].value = maxVal - priceGap;
        } else {
          maxVal = rangeInput[1].value = minVal + priceGap;
        }
      }

      let positionMin = (minVal / priceMax) * 100;
      let positionMax = 100 - (maxVal / priceMax) * 100;
      progress.style.left = positionMin + "%";
      progress.style.right = positionMax + "%";
      rangeText[0].innerText = minVal.toLocaleString();
      rangeText[1].innerText = maxVal.toLocaleString();
    });
  });
}

$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  if (sync1.length && sync2.length) {
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: true,
        dots: false,
        loop: true,
        autoplayHoverPause: true,
        responsiveRefreshRate: 200,
      })
      .on("changed.owl.carousel", syncPosition);

    sync2
      .on("initialized.owl.carousel", function () {
        sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
        items: slidesPerPage,
        dots: false,
        autoplayHoverPause: true,
        nav: false,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate: 100,
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }

      //end block

      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find(".owl-item.active").length - 1;
      var start = sync2.find(".owl-item.active").first().index();
      var end = sync2.find(".owl-item.active").last().index();

      if (current > end) {
        sync2.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        sync2.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        sync1.data("owl.carousel").to(number, 100, true);
      }
    }

    sync2.on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).index();
      sync1.data("owl.carousel").to(number, 300, true);
    });
  }
});

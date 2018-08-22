$(window).on('load', function () { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').css({'overflow': 'visible'});

  $(window).scroll(function(){
    ($(this).scrollTop() > 500) ? $('#BtnTop').fadeIn() : $('#BtnTop').fadeOut()

  })

  function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
  }

  $("ul.menu li a, .btn_yellow, #BtnTop").click(function () {
    console.log($(this));
    if (!$(this).hasClass('fr')) {
      let arg = $(this).attr('class');
      if ($(this).attr('class').indexOf('btn_yellow') != -1) {
        arg = 'btn_yellow';
      }
      scrollToAnchor(arg);
    }
  });

  $(function () {
    AOS.init();


    $('#command li img').click(function () {
      let temp = $(this);
      temp.before($("li.current_page_item img"));
      $("li.current_page_item").append(temp);

      $('.nav-wrap__text h3').text($('.current_page_item img').data('name'));
      $('.nav-wrap__text p').text($('.current_page_item img').data('position'));
    });

    $('.nav-wrap__text h3').text($('.current_page_item img').data('name'));
    $('.nav-wrap__text p').text($('.current_page_item img').data('position'));


    let $el, leftPos, newWidth,
      $mainNav = $("#command");

    $mainNav.append("<li id='magic-line'></li>");

    let $magicLine = $("#magic-line");

    $magicLine
      .width($(".current_page_item").width())
      .css("left", $(".current_page_item").position().left)
      .data("origLeft", $magicLine.position().left)
      .data("origWidth", $magicLine.width());

    $("#command li img").hover(function () {
      $el = $(this);
      leftPos = $el.position().left;
      newWidth = $el.width();

      $magicLine.stop().animate({
        left: leftPos,
        width: newWidth
      });
    }, function () {
      $magicLine.stop().animate({
        left: $magicLine.data("origLeft"),
        width: $magicLine.data("origWidth")
      });
    });

  });

  $(window).scroll(function () {
    const st = $(this).scrollTop();

    // $('.main-text__text').css({
    //   "transform": "translate(0%, " + st / 20 + "%)"
    // });

    $('.main-slider__slide').css({
      "transform": "translate(0%, " + st / 30 + "%)"
    });
    $('.bg').css({
      "transform": "translate(0%, -" + st / 50 + "%)"
    });
    $('.bg1').css({
      "transform": "translate(0%, -" + st / 100 + "%)"
    });
  });


  $('#main-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  });


  for (let i = 0; i < 2; i++) {
    $('#slick-advantage' + i).slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: '<div class="arrow_right"></div>',
      prevArrow: '<div class="arrow_left"></div>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  for (let i = 0; i < 4; i++) {
    $('#programs-slider' + i).slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: '<i class="arrow_right"></i>',
      prevArrow: '<i class="arrow_left"></i>',
    });
  }

});

ymaps.ready(function () {
  let myMap = new ymaps.Map('map', {
      center: [59.9343, 30.3351],
      zoom: 12,
      controls: ["zoomControl"]
    }, {
      searchControlProvider: 'yandex#search'
    }),
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemark = new ymaps.Placemark([59.9543, 30.3151], {
      hintContent: 'A custom placemark icon',
      balloonContent: 'This is a pretty placemark'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/logo.png',
      iconImageSize: [41, 42],
      iconImageOffset: [0, 0]
    }),
    myPlacemarkWithContent = new ymaps.Placemark([59.9143, 30.3451], {
      hintContent: 'A custom placemark icon with contents',
      balloonContent: 'This one — for Christmas',
      // iconContent: '12'
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '../img/logo.png',
      iconImageSize: [41, 42],
      iconImageOffset: [-24, -24],
      iconContentOffset: [15, 15],
      // iconContentLayout: MyIconContentLayout
    });

  myMap.behaviors.disable('scrollZoom');
  myMap.behaviors.disable('drag');

  myMap.geoObjects
    .add(myPlacemark)
    .add(myPlacemarkWithContent);
});
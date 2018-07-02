"use strict";
var x = 0;
var anchor_offset = $("#scrollspy").offset().top,//menu nav header cĂ¡ch top.
height_menu = $('#scrollspy').height();//menu nav header.

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $("#on-top").addClass('btn-ontop--show');
  } else {
      $("#on-top").removeClass('btn-ontop--show');
  }
}

function clickOnTop() {
  $('#on-top').on('click', function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  })
}

// function Check size of windown
// =============================

function checkSize() {
  var window_width = $(window).width();
  if (window_width <= 992) {
    anchor_offset = $('.header-top').height();
    height_menu = 0;

    $('#scrollspy').removeAttr('data-spy data-offset-top');
    // header-top desktop.
    $('#header-top').attr({
      'data-spy': "affix",
      'data-offset-top': "0"
    })

  } else {
    $('a.menu-main__link').removeAttr('data-toggle', 'data-target');

    $('#header-top').removeAttr('data-sp data-offset-top');

    // clickScroll('#scrollspy','#scrollspy',x);

  }
}
// function click link of menu main (smootscroll)
// =============================

function clickScroll(menu, element) {
  $(menu + " ul li a[href^='#']").on("click", function (e) {
    e.preventDefault();
    var navOffset = $(element).height();
    var anchor = $(this).attr('href');
    // smoothscroll effect
    $('html, body').animate({
      scrollTop: $(anchor).offset().top - navOffset + x,
    },1000);
    // add active
    $(menu + " ul li").removeClass('active');
    $(this).parent('li').addClass('active');
  });
}

// funtion scroll and add class active for menu main
// =============================

// function onScroll(e) {
//   var cur_pos = $(document).scrollTop(),
//   links = $("#scrollspy ul li a[href^='#']")
//   links.each(function() {
//     var cur_link = $(this),
//     cur_secsion = $(cur_link.attr('href')),
//     pos_secstion = cur_secsion.position().top,
//     height_secsion = cur_secsion.height(),
//     height_menu = $("#scrollspy").height;
//     if(pos_secstion - height_menu <= cur_pos && (pos_secstion + height_secsion) > cur_pos) {
//       $('#scrollspy ul li').removeClass("active");
//       cur_link.addClass("active");
//     }
//     else{
//       cur_link.removeClass("active");
//     }
//   })
// }

// set active for page
// ============================
function active_page() {
  var $page_active = localStorage.page_active,
      $page_actived = $('li.menu-main__item a.menu-main__link');

  $('.menu-main__item').removeClass('active');

  $page_actived.each(function() {
    if ($(this).attr('id') === $page_active) {
      $(this).parent().addClass('active');
    }
  })
}

// Check value localstorage

function checkPageActive() {
  if (localStorage.page_active === undefined) {
    localStorage.page_active = 'home';
    active_page();
  } else {
    active_page();
  }
}


// Ready functions
// =============================

$(document).ready(function(){
  checkPageActive();

  // save value link in localStorage
  $('.menu-main').on('click', '.dropdown-catagories__item ', function(e) {
    var $item_active = $(e.target).closest('li.menu-main__item'),
        $link_active = $item_active.find('.menu-main__link'),
        value = $link_active.attr('id');
    localStorage.page_active = value;
  })

  $('.logo__link').on('click', function() {
    localStorage.page_active = 'home';
  })

  // click vĂ o mÅ©i tĂªn arrow > á»Ÿ submenu cáº¥p cuá»‘i cĂ¹ng
  $('.dropdown-submenu span').on("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).next('ul').toggle();//Ä‘Ă³ng má»Ÿ menu.
    $(this).toggleClass('icon-rotate');// hiá»‡u á»©ng xoay mÅ©i tĂªn.
  });

  $('body').on('click', function(e) {
    // khi click vĂ o body mĂ  pháº§n element bá»‹ click Ä‘Ă³ trĂ¹ng vá»›i #menu-hamberger (button pháº£i).
    if ($('#menu-hamberger').has(e.target).length === 0 && !$('#menu-hamberger').is(e.target) && $('.menu-mobile ').has(e.target).length === 0 && !$('.menu-mobile ').is(e.target)) {
      //náº¿u menu mobile bĂªn pháº£i Ä‘Ă£ open.
      if($('#header-mobile .menu-mobile').hasClass('open')) {
        $('#header-mobile .menu-mobile').toggleClass('open');// open/close menu mobile bĂªn pháº£i.
        $('#menu-hamberger .bar').toggleClass('animate');// thĂªm/xĂ³a class .animate Ä‘á»ƒ táº¡o hiá»‡u á»©ng dáº¥u X.
        $('body').removeClass('over-flow-body');// xĂ³a class .over-flow-body(overflow: hidden)
      }
    }
    // khi click vĂ o body mĂ  pháº§n element bá»‹ click Ä‘Ă³ trĂ¹ng vá»›i .categories--mobile (button trĂ¡i).
    if ($('.categories--mobile').has(e.target).length === 0 && !$('.categories--mobile').is(e.target) && $('.menu-mobile--categories ').has(e.target).length === 0 && !$('.menu-mobile--categories ').is(e.target)) {
      //náº¿u menu mobile bĂªn trĂ¡i Ä‘Ă£ open.
      if( $('.menu-mobile--categories').hasClass('open')) {
        $('.menu-mobile--categories').removeClass('open');// open/close menu mobile bĂªn trĂ¡i.
        $('body').removeClass('over-flow-body');// xĂ³a class .over-flow-body(overflow: hidden)
      }
    }
  });

  // play/pause video á»Ÿ footer.
  $(function(){
    $(".icon-video").on('click', function(){
      if ($("#video-background")[0].paused){
        $(".icon-video").html('<span class="glyph-icon flaticon-music icon-custom icon-video__icon"> </span>')
        $("#video-background")[0].play();
      }
      else{
        $("#video-background")[0].pause();
        $(".icon-video").html('<span class="glyph-icon flaticon-arrows-6 icon-custom icon-video__icon"> </span>')
      }
    })
  })

  // Menu mobile
  $('#menu-hamberger').on('click',function(e){
    e.preventDefault();
    var $menu_categories = $('.menu-mobile--categories');// menu mobile bĂªn trĂ¡i.
    $('#header-mobile .menu-mobile').toggleClass('open');// Ä‘Ă³ng má»Ÿ menu mobile bĂªn pháº£i.
    $('#menu-hamberger .bar').toggleClass('animate');// thĂªm/xĂ³a class .animate Ä‘á»ƒ táº¡o hiá»‡u á»©ng dáº¥u X.
    //.over-flow-body(overflow: hidden)
    if($('body').hasClass('over-flow-body')) {
      $('body').removeClass('over-flow-body');
    }
    else {
      $('body').addClass('over-flow-body');
    }
    //$('body').addClass('over-flow-body');
    //náº¿u menu mobile bĂªn trĂ¡i Ä‘Ă£ má»Ÿ mĂ  click má»Ÿ menu bĂªn pháº£i thĂ¬
    if( $menu_categories.hasClass('open')) {
      $menu_categories.removeClass('open');//Ä‘Ă³ng menu mebile bĂªn trĂ¡i.
      $('body').addClass('over-flow-body');
    }
  });
  // Categories Mobile
  //tÆ°Æ¡ng tá»± á»Ÿ trĂªn
  $('.categories--mobile').on('click',function(e){
    e.preventDefault();
    var $menu_mobile = $('#header-mobile .menu-mobile'),
        $menu_hamberger = $('#menu-hamberger .bar');
    $('.menu-mobile--categories').toggleClass('open');
    if($('body').hasClass('over-flow-body')) {
      $('body').removeClass('over-flow-body');
    }
    else {
      $('body').addClass('over-flow-body');
    }
    if($menu_mobile.hasClass('open') && $menu_hamberger.hasClass('animate') ) {
      $menu_mobile.removeClass('open');
      $menu_hamberger.removeClass('animate');
      $('body').addClass('over-flow-body');
    }
  });

  // Ä‘Ă³ng form search á»Ÿ mĂ n hĂ¬nh mobile.
  $('.form-search__button--close').on('click', function(e) {
    $('#form-search-mobile').collapse('hide');
  });

  // Add active signin button
  // ============================
  $('.nav-right__signin__link').on('click', function(e) {
    $content_active = $(this).attr('data-modal-target');
    $item_active = $('a[href$="' + $content_active + '"]');
    $('.signin-form__tabs__items').removeClass('active');
    $item_active.parent().addClass('active');
    $('.tab-pane.fade').removeClass('active in');
    $($content_active).addClass('active in')
  });

  checkSize();

  clickOnTop();

  $(window).scroll(function() {
    var scroll = $(window).scrollTop(),
    menu_main = $('.menu-main'),
    width_window = $(window).width();

    //scroll in desktop and offset top > 116
    if ((width_window > 991) && (scroll >= 116)) {
      menu_main.addClass('fix-header');// float right menu-main
      $('.logo--menu').addClass('logo--menu--active');// appearance logo

    } else {
      menu_main.removeClass('fix-header');
      $('.logo--menu').removeClass('logo--menu--active');
    }
    ( $(window).scrollTop() < anchor_offset ) ? x = -height_menu : x = 0;

    scrollFunction();
  });

  $(window).on('resize load', function() {
    checkSize();
  });

});

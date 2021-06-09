'use strict';

(function () {

  $(function () {
    $('#my-accordion').accordionjs({
      slideSpeed: 150,
      activeIndex: false,
    });

    $('#filter-accordion').accordionjs({
      slideSpeed: 150,
      activeIndex: false,
      closeOther: false,
    });

    $('.slider__list').slick({
      useCSS: false,
      infinite: false,
      speed: 300,
      useTransform: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: $('.slider__button--previous'),
      nextArrow: $('.slider__button--next'),
      dots: true,
      dotsClass: 'slider__controls',
      customPaging: function (slick, index) {
        return '<button class="slider__control" type="button" aria-label="' + (index + 1) + ' slide">' + (index + 1) + '</button>';
      },
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
          }
        }
      ]
    });

    // убрать классы при загрузки js
    $('.slider__list').removeClass('slider__list--nojs');
    $('.filter__form').removeClass('filter__form--nojs');
    $('.filter__form').addClass('filter__form--closed');
    $('button').removeClass('nojs');

    // функции
    var closePopup = function () {
      $('.modal').addClass('visually-hidden');
    };

    var setOverflow = function () {
      $('.page').addClass('page__overflow');
    };

    var removeOverflow = function () {
      $('.page').removeClass('page__overflow');
    };

    // открытие модалки login
    $('.page__login').on('click', function (evt) {
      evt.preventDefault();
      $('#modal-login-email').val(localStorage['modal-form-email']);
      $('.modal-login').removeClass('visually-hidden');
      $('#modal-login-email').trigger('focus');
      setOverflow();
    });

    // открытие модалки card
    $('.card__button').on('click', function (evt) {
      evt.preventDefault();
      $('.modal-card').removeClass('visually-hidden');
      setOverflow();
    });

    // закрытие по крестику
    $('.modal-close').on('click', function () {
      closePopup();
      removeOverflow();
    });

    // закрытие по esc
    $(document).on('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closePopup();
        removeOverflow();
      }
    });

    // закрытие по overlay
    $('.overlay').on('click', function () {
      closePopup();
      removeOverflow();
    });

    // localStorage форма
    $('#modal-login-email').on('input', function () {
      localStorage['modal-form-email'] = $('#modal-login-email').val();
    });

    $('#login-form').on('submit', function () {
      localStorage.removeItem('modal-form-email');
    });

    // открытие фильтра
    $('.filter__button--open').on('click', function (evt) {
      evt.preventDefault();
      $('.filter__form').removeClass('filter__form--closed');
      $('.filter__form').addClass('filter__form--opened');
      setOverflow();
    });

    // закрытие фильтра
    $('.filter__close').on('click', function () {
      $('.filter__form').addClass('filter__form--closed');
      removeOverflow();
    });

    // кнопка clear all
    $('.filter__button--clean').on('click', function () {
      $('input:checkbox').forEach(function (el) {
        el.checked = false;
      });
    });
  });

  var pageHeader = document.querySelector('.page__header');
  var pageToggle = document.querySelector('.page__toggle');
  var mainPage = document.querySelector('.page__main');

  if (pageHeader && pageToggle) {
    pageHeader.classList.remove('page__opened');
    pageHeader.classList.add('page__closed');
    pageHeader.classList.remove('page__nojs');

    pageToggle.addEventListener('click', function () {
      if (pageHeader.classList.contains('page__closed')) {
        pageHeader.classList.remove('page__closed');
        pageHeader.classList.add('page__opened');
        mainPage.classList.add('page__hidden');
      } else {
        pageHeader.classList.add('page__closed');
        pageHeader.classList.remove('page__opened');
        mainPage.classList.remove('page__hidden');
      }
    });
  }
})();

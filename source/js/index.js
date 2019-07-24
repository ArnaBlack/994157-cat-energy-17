'use strict';

( function () {
  var navigation = document.querySelector(".main-nav");
  var burger = navigation.querySelector(".main-nav__toggle");

  navigation.classList.remove("main-nav--nojs");
  navigation.classList.remove("main-nav--open");
  navigation.classList.add("main-nav--closed");

  burger.addEventListener('click', function(evt) {
    evt.preventDefault();
    navigation.classList.toggle("main-nav--open");
    navigation.classList.toggle("main-nav--closed");
  });
})();

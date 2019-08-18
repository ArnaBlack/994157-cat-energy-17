"use strict";

( function () {

  //burger
  var navigation = document.querySelector(".main-nav");
  var burger = navigation.querySelector(".main-nav__toggle");

  navigation.classList.remove("main-nav--nojs");
  navigation.classList.remove("main-nav--open");
  navigation.classList.add("main-nav--closed");

  burger.addEventListener("click", function(evt) {
    evt.preventDefault();
    navigation.classList.toggle("main-nav--open");
    navigation.classList.toggle("main-nav--closed");
  });

  //form validity
  if(document.querySelector(".form")) {
    var form = document.querySelector(".form");
    var petName = form.querySelector("[name=pet-name]");
    var petWeight = form.querySelector("[name=pet-weight]");
    var masterName = form.querySelector("[name=master-name]");
    var masterPhone = form.querySelector("[name=master-phone]");
    form.addEventListener("submit", function (evt) {
      if (!petName.value || !petWeight.value || !masterName.value || !masterPhone.value) {
          evt.preventDefault();

          if (!petName.value) {
            petName.focus();
          }
          if (!petWeight.value) {
            petWeight.focus();
          }
          if (!masterName.value) {
            masterName.focus();
          }
          if (!masterPhone.value) {
            masterPhone.focus();
          }
        }
  });
  }
})();

// Яндекс карта
ymaps.ready(init);
function init() {
  var map = new ymaps.Map("map", {
    center: [59.9386, 30.3230],
    zoom: 17,
    controls: []
  });

  if (window.matchMedia("(min-width: 1300px)").matches) {
    map.setCenter([59.9389,30.3195])
  };
  var placemark = new ymaps.Placemark([59.9386, 30.3231], {
    hintContent: "CatEnergy"
  },
    {
      iconLayout: "default#image", //название
      iconImageHref: "img/map-pin.png", //источник
      iconImageSize: [62, 53], //размер
      iconImageOffset: [-34, -53] //координаты смещения
    });
  // ==========================
  if (window.matchMedia("(min-width: 768px)").matches) {
    placemark.options.set('iconImageSize', [124, 106]);
    placemark.options.set('iconImageOffset', [-60, -106]);
  };
  map.geoObjects.add(placemark);
  map.behaviors.disable("scrollZoom");
};

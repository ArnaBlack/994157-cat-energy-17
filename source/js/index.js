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

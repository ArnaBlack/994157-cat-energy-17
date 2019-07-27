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
        center: [59.9386, 30.3231],
        zoom: 17//,
        //controls: ['zoomControl'],
        //behaviors: ['default', 'scrollZoom']
      },  {
        searchControlProvider: "yandex#search"
    });
      var placemark = new ymaps.Placemark([59.9386,30.3231], {
          hintContent: "CatEnergy"
        },
        {
          iconLayout: "default#image", //название
          iconImageHref: "img/map-pin.png", //источник
          iconImageSize: [113, 106], //размер
          iconImageOffset: [-60, -106] //координаты смещения
        });
      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");
      };

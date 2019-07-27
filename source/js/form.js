"use strict";
(function () {
   //form validity
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
})();

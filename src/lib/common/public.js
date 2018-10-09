!function (e) {
  var cl = null;

  function o() {
    var d = e.document, a = d.documentElement;
    var c = a.getBoundingClientRect().width > 750 ? 750 : a.getBoundingClientRect().width, b = c / (750 / 100);
    a.style.fontSize = `${b}px`;
  }

  window.addEventListener('resize', function () {
    clearTimeout(cl), cl = setTimeout(o, 300);
  }, !1), o();
}(window);

export default {
  /*校验手机*/
  checkPhone(tel) {
    var phone = /^1(2|3|4|5|6|7|8)[0-9]{9}$/;
    if (phone.test(tel)) {
      return true;
    } else {
      return false;
    }
  },
};

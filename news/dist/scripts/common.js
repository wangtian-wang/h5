document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';

window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);
document.addEventListener('touchmove', function () {
  if (event.touches.length > 1) {
    event.preventDefault
  }
}, false)
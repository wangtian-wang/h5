function getUrlQueryValue(key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
    res = window.location.search.substr(1).match(reg);

  return res != null ? decodeURIComponent(res[2]) : null;
}
function tplReplace() {
  return /{{(.*?)}}/g;
}
function imgShow(dom) {
  dom.on('load', function () {
    $(this).css('opacity', 1)
  });
}
// 当滑动到页面的底部的时候,需要执行一些方法,所以就将回调函数的执行,放入这个条件判断里面
function scrollToBottom(callback) {
  if (_getScrollTop() + _getWindowHeight() == _getScrollHeight()) {
    callback();
  }
}

module.exports = {
  getUrlQueryValue,
  tplReplace,
  imgShow,
  scrollToBottom
}
function _getScrollTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

function _getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

function _getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}
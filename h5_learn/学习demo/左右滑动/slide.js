const oSlideWrapper = getElem(".slide-wrapper"),
  oSlidePage = getElem(".slide-page"),
  oItem = getElemAll(".page-item");
oItemWidth = oItem[0].offsetWidth;
let curIndex = 0,
  startX = 0,
  moveX = 0,
  dis = 0;
isMove = false;

function touchStart(e) {
  startX = Math.round(e.touches[0].clientX);
}
function touchMove(e) {
  moveX = Math.round(e.touches[0].clientX);
  if (
    (moveX > startX && curIndex === 0) ||
    (moveX < startX && curIndex === oItem.length - 1)
  ) {
    return;
  }
  dis = Math.round(moveX - startX);
  setTransLate(-curIndex * oItemWidth + dis);
  isMove = true;
}
function setTransLate(dis) {
  oSlideWrapper.style.transition = "all linear .3s";
  oSlideWrapper.style.transform = `translateX(${dis}px)`;
}
function touchEnd(e) {
  if (isMove) {
    if (Math.abs(dis) > Math.floor(oSlidePage.offsetWidth / 3)) {
      // 右滑动

      if (dis > 0) {
        curIndex--;
      } else {
        // 左滑动
        curIndex++;
      }
      setTransLate(-curIndex * oItemWidth);
    }
  }
  isMove = false;
  startX = 0;
  dis = 0;
}
oSlideWrapper.addEventListener("touchstart", touchStart, false);
oSlideWrapper.addEventListener("touchmove", touchMove, false);
oSlideWrapper.addEventListener("touchend", touchEnd, false);

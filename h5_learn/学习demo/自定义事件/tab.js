/** 手机左右滑动事件封装 */
const getElem = (tag) => {
  return document.querySelector(tag);
};
const dom = getElem(".box");
// dom.addEventListener("touchstart", (e) => {
//   console.log(e);
// });
// 手机左右滑动事件
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
function move(e) {
  let target = e.changedTouches[0];
  if (e.type === "touchstart") {
    console.log(target.pageX, "start");
    startX = target.pageX;
    startY = target.pageY;
  } else if (e.type === "touchend") {
    console.log(target.pageX, "end");
    endX = target.pageX;
    endY = target.pageY;
    if (
      Math.abs(endX - startX) > Math.abs(endY - startY) &&
      startX - endX >= 150
    ) {
      console.log("左划了手机");
    } else if (endX - startX >= 150) {
      console.log("右滑动了手机");
    }
  }
}
dom.addEventListener("touchstart", move);
dom.addEventListener("touchend", move);

dom.after(document.createElement("section"));

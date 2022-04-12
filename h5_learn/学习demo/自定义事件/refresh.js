/**  上拉加载 下拉刷新事件封装 */
const getDom = () => {
  let str = "";
  for (var i = 0; i < 20; i++) {
    str += `<li>${i}</li>`;
  }
  return str;
};
const content = getElem(".content");
content.innerHTML = getDom();

function scroll(e) {
  let scrollTop = document.documentElement.scrollTop;
  let contentLen = content.offsetHeight;
  let liLen = content.children.length * 51;
  /**
   * 刚开始scrolltop为0 ，假设高度差为160；
   * 第一次scrolltop 为50，
   * 第二次scrolltop 80，
   * 第三次为 100，
   * 第四次为140 + 50  > 160        早一步加载数据  使用 阈值 50 使页面真实的scrolltop还不到160的时候，就提前加载数据 防止页面出现白屏
   * 第五次为 160   ===  160                       加载数据可能会出现白屏
   * 阈值的理解
   */
  if (scrollTop + 50 > liLen - contentLen) {
    if (content.children.length < 100) {
      content.appendChild(document.createElement("li"));
    }
  } else if (scrollTop == 0) {
    console.log(scrollTop);
  }
}
window.addEventListener("scroll", scroll);

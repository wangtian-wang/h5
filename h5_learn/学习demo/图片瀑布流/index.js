/**
  图片加载完成后 才能获得当前图片的真实高度
  获得图片加载完成的属性 complete

 */
const imgHeight = [0, 0];
const clientWidth = $("body").width();

function init() {
  traverseBox();
}
function traverseBox() {
  $(".box").each((index, elem) => {
    let isReady = $(elem).children("img")[0].complete;
    if (isReady) {
      let minHeight = Math.min.apply(null, imgHeight);
      let minIndex = imgHeight.indexOf(minHeight);
      $(elem).css({
        left: minIndex * (clientWidth / 2),
        top: minHeight,
      });
      imgHeight[minIndex] = minHeight + $(elem).height();
    } else {
      $(elem)
        .children("img")
        .on("load", function () {
          let minHeight = Math.min.apply(null, imgHeight);
          let minIndex = imgHeight.indexOf(minHeight);
          $(elem).css({
            left: minIndex * (clientWidth / 2),
            top: minHeight,
          });
          imgHeight[minIndex] = minHeight + $(elem).height();
        });
    }
    $(".container").height(Math.max.apply(null, imgHeight));
  });
}

window.addEventListener("load", init);
function handleScroll() {
  const scrollTop = $(window).scrollTop();
  const clinetHeight = $(window).height();
  const bodyHeight = $("body").height();
  if (scrollTop + 300 > bodyHeight - clinetHeight) {
    handleLoadMore();
  }
}
function generator(num) {
  let str = "";
  for (let i = 1; i <= num; i++) {
    str += ` <div class="box">
                <img src="../image/${i}.jpeg" alt="" />
              </div>`;
  }
  return str;
}
function handleLoadMore() {
  let str = generator(6);
  let $box = $(str);
  $(".container").append($box);
  $box.children("img").on("load", function () {
    let minHeight = Math.min.apply(null, imgHeight);
    let minIndex = imgHeight.indexOf(minHeight);
    $(this)
      .parent()
      .css({
        left: minIndex * (clientWidth / 2),
        top: minHeight,
      });
    imgHeight[minIndex] = minHeight + $(this).parent().height();
  });
  $(".container").height(Math.max.apply(null, imgHeight));
}
window.addEventListener("scroll", _.debounce(handleScroll, 200));

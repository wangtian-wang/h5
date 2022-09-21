(function () {
  let oScrollItems = document.querySelectorAll(".anchor"),
    oSlideItem = document.querySelectorAll(".slide-item"),
    oScrollItemsHeight = [],
    curIndex = 0,
    lastIndex = 0,
    click = false;

  function getHeight(item) {
    let height = item.offsetTop;
    while ((item = item.offsetParent)) {
      height += item.offsetTop;
    }
    return height;
  }
  oScrollItems.forEach((elem, index) => {
    oScrollItemsHeight[index] = getHeight(elem);
  });
  oSlideItem.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      click = true;
      oSlideItem[lastIndex].classList.remove("active");
      //   oSlideItem[curIndex].classList.remove("active");
      oSlideItem[index].classList.add("active");
      curIndex = index;
      window.scrollTo({
        top: oScrollItemsHeight[index],
        behavior: "smooth",
      });
    });
  });
  function handleScroll() {
    /** 随着滚动,找到当前 元素的offsettop 大于 已经滚动的window的scrollY */
    /** 假若元素的第一个定位的父元素有padding或者margin 那这个计算结果就不准确  必须减去这个值*/
    let top = this.pageYOffset - 300;
    oScrollItemsHeight.forEach((elem, index) => {
      if (elem < top && !click) {
        curIndex = index;
      }
    });
    oSlideItem[lastIndex].classList.remove("active");
    oSlideItem[curIndex].classList.add("active");
    lastIndex = curIndex;
    click = false;
  }
  handleScroll();
  window.addEventListener("scroll", _.debounce(handleScroll, 100), false); //
})();
// getBoundingClientRect() window.innerWidth window.innerHeight

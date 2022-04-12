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
    // elem.addEventListener("mouseover", () => {
    //   console.log(index, curIndex);
    //   elem.classList.add("active");
    // });
    // 页面停在那个位置 对应的侧边栏显示高亮样式
    // elem.addEventListener("mouseout", () => {
    //   if (index !== curIndex) elem.classList.remove("active");
    // });
    elem.addEventListener("click", () => {
      click = true;
      oSlideItem[lastIndex].classList.remove("active");
      oSlideItem[curIndex].classList.remove("active");
      oSlideItem[index].classList.add("active");
      curIndex = index;
      window.scrollTo({
        top: oScrollItemsHeight[index],
        behavior: "smooth",
      });
    });
  });
  function handleScroll() {
    let top = this.pageYOffset;

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
  window.addEventListener("scroll", _.debounce(handleScroll, 200));
})();

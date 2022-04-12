(function () {
  let oLi = document.querySelectorAll("ul li:not(.btn)"),
    oBtn = document.querySelector(".btn"),
    curIndex = 0,
    lastIndex = 0,
    giftsIndex = 4,
    leftTimes = 5,
    timer = null,
    timerDelay = null;
  function handleBtnClick() {
    if (leftTimes === 0) {
      alert("剩余抽奖次数不够");
      return;
    }
    leftTimes--;
    timer = setInterval(() => {
      curIndex++;
      curIndex %= oLi.length;
      oLi[curIndex].classList.add("active");
      oLi[lastIndex].classList.remove("active");
      lastIndex = curIndex;
      let i = curIndex;
      // 成功抽奖
      //   timerDelay = setTimeout(() => {
      //     console.log(i);
      //     if (giftsIndex === curIndex) {
      //       clearInterval(timer);
      //       alert("恭喜你~~~");
      //       oLi[curIndex].classList.remove("active");
      //       lastIndex = curIndex = 0;
      //       oLi[curIndex].classList.add("active");
      //       console.log("000000000000000000");
      //     }
      //   }, 1000);
      window.addEventListener("beforeunload", function () {
        timerDelay = null;
      });
    }, 100);
    // 中奖随机
    let stopTime = +(Math.random() * 3 + 1).toFixed();
    setTimeout(() => {
      clearInterval(timer);
      if (giftsIndex === curIndex) {
        oLi[curIndex].classList.add("active");
      } else {
        alert("抽奖失败！！！！");
        oLi[curIndex].classList.remove("active");
        curIndex = lastIndex = 0;
        oLi[curIndex].classList.add("active");
      }
    }, stopTime * 1000);
  }
  oBtn.addEventListener("click", handleBtnClick, false);
})();

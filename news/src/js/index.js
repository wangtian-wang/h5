import '../scss/index.scss';
import Header from '../components/header/index';
import Nav from '../components/nav/index';
import NewsItem from '../components/news-item/index';
import PageLoading from '../components/page_loading/index';
import BottomTip from '../components/bottom_tips/index';
import ErrorTip from '../components/error_tip/index';
// 加载新闻列表的时候,需要注意的是
// 1,在请求新的页面的时候,需要将这个组件,显示出来
// 2,在请求到了数据之后,然这个组件消失
// 3. 在请求完所有的数据之后,要剔除组件的图标

import { IndexModel } from '../models/index';
import data from '../tools/data';
import tools from '../tools/tools';


const header = new Header(),
  nav = new Nav(),
  newsItem = new NewsItem(),
  pageLoading = new PageLoading(),
  bottomTip = new BottomTip(),
  errorTip = new ErrorTip();


const indexModel = new IndexModel()
const App = ($) => {
  //可以在这里,使用模型层的方法获取数据
  //indexModel.getNewsList()
  const $app = $('#app'),
    $list = $app.children('.list'),
    // tools 下面的方法,传递回调函数进去,回调函数主要执行获取数据的任务,但是必须是当下拉到页面的底部的时候才能执行这个函数, 
    /*newScrollToBottom 决定在那种事件触发的时候,执行这个函数*/
    newScrollToBottom = tools.scrollToBottom.bind(null, scrollToBottom);




  let field = 'top',
    showCount = 10,
    pageCount = 0, // 每个类别的新闻总共有多少页
    pageNum = 0, // 当前页的页码
    dataCache = {},
    // 数据缓存: 将一些获取回来的静态的数据缓存在元素节点中
    // 点击不同的分类之前,先去缓存池看看有没有对应的数据
    // 需要刷新页面获取的数据缓存在 local storage 中
    bottomLock = false;
  // 这个标识决定是否每次都追加 bottom tip 这个组件
  const init = () => {
    render(field, pageNum, showCount).then(bindEvent);
    //初始化的时候,获取数据

  }
  const render = (field, pageNum, showCount) => {
    return new Promise((resolve, reject) => {
      _renderHeader();
      _renderNav(data.news_type);
      _renderList(field, pageNum, showCount)
      resolve();
    })
  }
  const _renderHeader = () => {
    $app.append(header.tpl({
      title: '新闻头条',
      isShow: '',
      isShowRight: 'right'
    }));
  }
  const _renderNav = (newsType) => {
    const tpl = nav.tpl(newsType);
    // 点击不同的分类 field 获取不同的数据
    $app.append(tpl.navStr);
    $('.nav .nav-wrapper').append(tpl.itemsStr);

  }
  const bindEvent = () => {
    $('.nav .nav-wrapper').on('click', '.item', navSelect);
    $list.on('click', '.news-item', toDetailPage)
  }

  const _renderList = (field, pageNum, showCount) => {
    if (dataCache[field]) {
      pageCount = dataCache[field].length;
      //$list.html(newsItem.tpl(dataCache[field][pageNum], pageNum));
      _insertList('cover')
    } else {
      // 先加载 load 图标,在获取数据
      _handlePageLoading('append');;
      indexModel.getNewsList(field, showCount).then((res) => {
        if (res == 404) {
          _handleErrorTip('append', '没有网络~~');
          _handlePageLoading('remove');
          return;
        }

        dataCache[field] = res;
        pageCount = dataCache[field].length;
        setTimeout(() => {
          _insertList('cover')
        }, 500);
      })
    }
  }
  // 单独抽取的插入列表的函数
  const _insertList = (method) => {
    switch (method) {
      // cover 就表示第一次加载列表,所以需要等列表加载出来,然后再调到本页面的最顶端
      case 'cover':
        $list.html(newsItem.tpl(dataCache[field][pageNum], pageNum));
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 150);
        // 移除加载的图标
        _handlePageLoading('remove');
        _afterRender(true);
        break;
      case 'append':
        $list.append(newsItem.tpl(dataCache[field][pageNum], pageNum));
        _afterRender(false);
      default:
        break;
    }
    // 每次加载数据都需要打开这个🔐
    // 每次数据加载完成之后,需要移除这个加载提示组件就不会和下一次加载的重复出现
    bottomLock = false;
    _handleBottomTip('remove')
  }
  // 单独的让图片显示的函数
  const _afterRender = (bindScroll) => {
    bindScroll && _handleScrollEvent(true);
    tools.imgShow($('.news-thumb'));
  }
  // 渲染 load 图标之前,先清空列表,先出现 load 图标,在获取数据
  // const _renderPageLoading = () => {
  //   $list.html('');
  //   $app.append(pageLoading.tpl())
  // }

  function navSelect () {
    // 每次点击新的 field 都需要让每类新闻的当前页面 pageNum,  从 0 开始,并且页面都要调到头部位置,
    // 但是每次切换 field 的时候,都有一段时间加载数据,这个页面还没有渲染完成,所以需要延时处理,等页面加载出来在跳转到 header 区域
    pageNum = 0;
    _handleErrorTip('remove');
    _handleBottomTip('remove');
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 150);
    _handleScrollEvent(false);

    field = $(this).attr('data-type');
    $(this).addClass('current').siblings('.item').removeClass('current');
    _renderList(field, pageNum, showCount)
  }

  const _handleBottomTip = (how, isLoading, text) => {
    switch (how) {
      case 'append':
        $app.append(bottomTip.tpl(isLoading, text));
        break;
      case 'remove':
        $('.bottom-tip').remove();
        break;
      case 'removeAndAppend':
        $('.bottom-tip').remove();
        $app.append(bottomTip.tpl(isLoading, text));
        break;
      default:
        break;
    }
  }

  // 这个函数决定了是否显示 bottom tip 组件,当滚动到页面底部时候,才会执行这个函数
  // 当每个页面的总页面 不大于当前页码的时候, 表示还有内容需要增加 ,但是需要把🔐来限制当前的状态,只要条件成立,就显示加载内容的组件
  // 但是 当加载更多内容的时候,这个🔐的状态需要打开,因为新的页面也需要这个组件
  // 否则,就表示数据已经加载完成,显示加载完成的提示
  function scrollToBottom () {
    if (pageNum < pageCount - 1) {
      if (!bottomLock) {
        bottomLock = true;
        _handleBottomTip('append', 'loading', '正在努力加载中.....');
        //   pageNum++; 放在延时器外面也可以
        setTimeout(() => {
          pageNum++;
          _insertList('append')
        }, 500);
      }
    } else {
      _handleBottomTip('removeAndAppend', 'final', '已加载完所有内容');
    }
  }
  const _handleScrollEvent = (isBind) => {
    isBind ? $(window).on('scroll', newScrollToBottom)
      : $(window).off('scroll', newScrollToBottom);
  }
  const _handlePageLoading = (how) => {
    switch (how) {
      case 'append':
        $list.html('');
        $app.append(pageLoading.tpl());
        break;
      case 'remove':
        $('.loading-icon').remove();
        break;
      default:
        break;
    }
  }
  // 给 detail 页面嵌入一个 iframe 页面,来显示第三方的详情新闻页面
  function toDetailPage () {
    const $this = $(this),
      url = $this.attr('data-url'),
      idx = $this.attr('data-index'),
      pageNum = $this.attr('data-page');
    localStorage.setItem('target', JSON.stringify(dataCache[field][pageNum][idx]));
    window.location.href = `detail.html?news_url=${url}&uniquekey=${dataCache[field][pageNum][idx].uniquekey}`;
  }
  const _handleErrorTip = (how, text) => {
    switch (how) {
      case "append":
        $app.append(errorTip.tpl(text));
        break;
      case "remove":
        if ($('.error-tip')) {
          $('.error-tip').remove();
        }
        break;
      default:
        break;
    }

  }









  init();

}
App(Zepto);
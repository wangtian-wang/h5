import '../scss/news.scss';
import Header from '../components/header/index';
import ContentTip from '../components/no-content-tip/index';
import NewsItem from '../components/news-item/index';

import tools from '../tools/tools';

const header = new Header(),
  contentTip = new ContentTip(),
  newsItem = new NewsItem();

const App = ($) => {
  const $app = $('#app'),
    $list = $app.children('.list'),
    collections = JSON.parse(localStorage.getItem('collections'));
  const init = () => {
    render().then(bindEvent)
  }
  const render = () => {
    return new Promise((resolve, reject) => {
      _renderHeader();
      if (!collections || Object.keys(collections).length === 0) {
        _renderContentTip('您还没有收藏任何新闻')
      } else {
        _renderList(collections)
      }

      resolve();
    })


  }
  const bindEvent = () => {
    $list.on('click', '.news-item', toDetailPage)
  }
  const _renderHeader = () => {
    $app.append(header.tpl({
      title: '我的收藏',
      isShow: 'left',
      isShowRight: ''
    }));
  }
  const _renderContentTip = (text) => {
    $app.append(contentTip.tpl(text))
  }
  const _renderList = (data) => {
    $list.append(newsItem.tpl(_arrangeDatas(data)));
    tools.imgShow($('.news-thumb'))
  }
  function _arrangeDatas(data) {
    let _arr = [];
    for (let key in data) {
      _arr.push(data[key]);
    }
    return _arr;
  }
  function toDetailPage() {
    const $this = $(this),
      url = $this.attr('data-url'),
      uniquekey = $this.attr('data-uniquekey');
    localStorage.setItem('target', JSON.stringify(collections[uniquekey]));
    window.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`;
  }






  init();

}
App(Zepto);
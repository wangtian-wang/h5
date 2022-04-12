import '../scss/detail.scss';
import Header from '../components/header/index';
import NewsFrame from '../components/news_frame/index';
import tools from '../tools/tools';
import Collector from '../components/collector/index';


const header = new Header(),
  newsFrame = new NewsFrame(),
  collector = new Collector();

const App = ($) => {
  const $app = $('#app'),
    $frameWrapper = $app.children('.frame-wrapper'),
    target = JSON.parse(localStorage.getItem('target')),
    newsUrl = tools.getUrlQueryValue('news_url') || target.url,
    uniquekey = tools.getUrlQueryValue('uniquekey') || target.uniquekey;

  // 如何直到这个新闻有没有被收藏
  // 先获取本地已经保存的数据 , 然后对比这个 unique key 存在吗?
  let collections = JSON.parse(localStorage.getItem('collections')) || {},
    collected = Boolean(collections[uniquekey]);
  const init = () => {
    render().then(bindEvent);
  }

  // 必须等到渲染完成之后,才能绑定点击事件,所以必须用到 promise 方法
  const render = () => {
    return new Promise((resolve, reject) => {
      _renderHeader();
      _renderFrame(newsUrl);
      _renderCollector(collected);
      resolve()
    })
  }
  const bindEvent = () => {
    $('.collector').on('click', newsCollect)
  }
  const _renderHeader = () => {
    // $app.append(header.tpl({
    //   title: '新闻详情',
    //   isShow: 'left',
    //   isShowRight: ''
    // }));
    $frameWrapper.before(header.tpl({
      title: '新闻详情',
      isShow: 'left',
      isShowRight: ''
    }))

  }
  const _renderFrame = (newsUrl) => {
    $frameWrapper.append(newsFrame.tpl(newsUrl));
  }
  const _renderCollector = (collected) => {
    $app.append(collector.tpl(collected));
  }

  function newsCollect() {
    if (collections[uniquekey]) {
      delete collections[uniquekey];
      collected = false;
    } else {
      collections[uniquekey] = JSON.parse(localStorage.getItem('target'));
      collected = true;
    }
    localStorage.setItem('collections', JSON.stringify(collections));
    collector.changeCollector(collected)
  }
  init();

}
App(Zepto);
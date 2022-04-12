import navTpl from './nav.tpl';
import itemTpl from './nav_item.tpl'
import './index.scss';
import tools from '../../tools/tools';
export default () => {
  return {
    name: " nav",
    tpl(newsType) {
      const len = newsType.length,
        wrapperW = (6 * len) + 'rem';
      let navStr = '',
        itemsStr = '';
      navStr = navTpl().replace(tools.tplReplace(), wrapperW);
      newsType.forEach((elem, index) => {
        itemsStr += itemTpl().replace(tools.tplReplace(), (node, key) => {
          return {
            isCurrent: index === 0 ? 'current' : '',
            type: elem.type,
            typeName: elem.chs
          }[key];
        })

      });
      return {
        navStr,
        itemsStr
      }
    }
  }
}
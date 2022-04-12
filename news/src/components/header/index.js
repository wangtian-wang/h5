import tpl from './index.tpl';
import tools from '../../tools/tools';
import './index.scss';
export default () => {
  return {
    name: 'Header',
    tpl(opt) {
      return tpl().replace(tools.tplReplace(), (node, key) => {
        return {
          title: opt.title,
          isShow: opt.isShow,
          isShowRight: opt.isShowRight
        }[key];
      })
    }
  }
}
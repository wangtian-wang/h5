import tpl from './index.tpl';
import './index.scss';
import tools from '../../tools/tools';
export default () => {
  return {
    name: 'contentTip',
    tpl(text) {
      return tpl().replace(tools.tplReplace(), text);
    }
  }
}
import tpl from './index.tpl';
import './index.scss';
import tools from '../../tools/tools';

export default () => {
  return {
    name: 'errorTip',
    tpl(text) {
      return tpl().replace(tools.tplReplace(), text);
    }
  }
}
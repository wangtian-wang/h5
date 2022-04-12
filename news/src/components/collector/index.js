import tpl from './index.tpl';
import './index.scss';
import tools from '../../tools/tools';
export default () => {
  return {
    name: 'collector',
    tpl(collected) {
      return tpl().replace(tools.tplReplace(), collected ? 'full' : 'o')
    },
    changeCollector(collected) {
      // 假设现在的 collected 为 true,添加类名: 那就是添加 full 这个类名 移除类名: O 这个类名 完美
      $('.collector').addClass(collected ? 'full' : 'o')
        .removeClass(collected ? 'o' : 'full');
    }
  }
}
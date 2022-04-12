import Tpl_0 from './tpl/tpl_0.tpl';
import Tpl_1 from './tpl/tpl_1.tpl';
import Tpl_2 from './tpl/tpl_2.tpl';
import Tpl_3 from './tpl/tpl_3.tpl';
import './index.scss';
import tools from '../../tools/tools';

export default () => {
  return {
    name: "newItem",
    tpl(data, pageNum) {
      let list = '',
        template = '';
      // 循环获取来的数据,去判断这个数据中的图片的张数,来决定使用哪个模板
      data.forEach((elem, index) => {
        if (!elem.thumbnail_pic_s) {
          template = Tpl_0();
        } else if (elem.thumbnail_pic_s && !elem.thumbnail_pic_s02) {
          template = Tpl_1();
        } else if (elem.thumbnail_pic_s02 && !elem.thumbnail_pic_s03) {
          template = Tpl_2();
        } else if (elem.thumbnail_pic_s03) {
          template = Tpl_3();
        }
        list += template.replace(tools.tplReplace(), (node, key) => {
          return {
            // 与跳转页面相关
            pageNum,
            index,
            url: elem.url,
            uniquekey: elem.uniquekey,
            title: elem.title,
            date: elem.date,
            author: elem.author_name,
            thumbnail_pic_s: elem.thumbnail_pic_s,
            thumbnail_pic_s02: elem.thumbnail_pic_s02,
            thumbnail_pic_s03: elem.thumbnail_pic_s03

          }[key]
        });
      });
      return list
    }
  }
}
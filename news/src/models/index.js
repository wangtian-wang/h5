import { HTTP } from '../tools/http';
class IndexModel extends HTTP {
  getNewsList(field, showCount) {
    // 使用 promise 可以将这个页面的数据,抛出去,在函数调用完毕之后,实行.then()获取请求回来的数据
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Juhe/getNewsList',
        type: 'POST',
        dataType: 'JSON',
        data: {
          field
          // 根据传进来的 field 的不同,获取不同的数据
        },
        success(data) {
          const listDatas = data.result.data,
            len = listDatas.length;
          let pageData = [],
            index = 0;
          while (index < len) {
            pageData.push(listDatas.slice(index, index += showCount))
          }
          resolve(pageData)
        },
        error() {
          resolve(404);
        }

      })
    })
  }

}
export { IndexModel };

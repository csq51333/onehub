export default {
  // actions用来设置异步的方法，mutations用来存放同步代码
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit(data.fn, {num: data.num, num2: '来自actions中的异步函数'})
    }, data.time)
  }
}

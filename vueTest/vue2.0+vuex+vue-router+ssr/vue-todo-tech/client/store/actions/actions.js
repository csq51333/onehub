export default {
  // actions用来设置异步的方法，mutations用来存放同步代码
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit(data.fn, {num: data.num})
    }, data.time)
  }
}

export default {
  updateCount (state, {num, num2}) { // 解构的方法取
    state.count = num
    console.log(num2)
  }
}

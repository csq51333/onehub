import Vue from 'vue'

const app = new Vue({
  template: '<div ref="div">setInterval : {{text}}<span ref="ss">内容</span></div>',
  data: {
    text: 0
  },
  watch: {
    // text(newV, oldV) {
    //   //跟下面一个效果，监听text的值的变化
    //   console.log(newV, oldV)
    // }
    text: function (newV, oldV) {
      console.log(newV, oldV)
    }

  }
})

app.$mount('#root')

setInterval(() => {
  // app.text += 1
  // app.$options.data += 1
  app.$data.text += 1
}, 1000)

console.log(app)
// app.$options.render = (h) => {
//   return h('div', {}, 'render div')
// }
// console.log(app.$root === app)
// console.log(app.$refs.ss)
// app.$refs.ss.style.display = 'inline-block'

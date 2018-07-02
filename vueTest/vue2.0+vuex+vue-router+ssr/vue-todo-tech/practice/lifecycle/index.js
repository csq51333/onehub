import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    throw new TypeError('ABC打发手动阀')
    // console.log('render function invoked')
    // return h('div', {}, 'template 被解析' + this.text + ' render function')
  },
  renderError (h, err) {
    return h('p', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡，并且正式环境也可以使用
  }
})

app.$mount('#root')
setInterval(() => {
  // app.$data.text += 1
  app.text += 1
}, 1000)

setTimeout(() => {
  app.$destroy()
}, 2000)

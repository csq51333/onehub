import Vue from 'vue'

var globalVar = '1111' //eslint-disable-line

const app = new Vue({
  // el: '#root',
  template: '<div :style="[styles,styles2]">{{isActive}}</div>',
  data: {
    isActive: false,
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      backgroundColor: 'greenyellow'
    }
  }
})

app.$mount('#root')

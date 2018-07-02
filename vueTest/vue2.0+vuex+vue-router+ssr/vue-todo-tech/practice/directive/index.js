import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>' +
  '<div>{{consoles}}' +
  'one:<input type="checkbox" value="1" v-model.number="pick">' +
  'two:<input type="checkbox" value="ewwww" v-model="pick">' +
  '</div></div>',
  data: {
    text: 0,
    pick: [],
    active: false
  },
  computed: {
    consoles () {
      console.log(this.pick)
    }
  }
})

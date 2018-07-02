import Vue from 'vue'

const component = {
  template: '<div v-if="active">' +
  '<span @click="thisChange">this component{{pro}}</span></div>',
  data () {
    return {
      text: '123'
    }
  },
  props: ['pro', 'active'],
  // props: {
  //   pro: Number,
  //   active: Boolean,
  //   onChange: Function
  // },
  methods: {
    thisChange () {
      // this.onChange()
      this.$emit('ccc')
    }
  }
}

// Vue.component('Comp', component) // 定义全局组件

new Vue({
  el: '#root',
  template: '<div>' +
  '<comp-one :active="true" pro="pre" @ccc="handChange" :on-change="handChange"></comp-one>' +
  '<comp-one :active="true"></comp-one>' +
  '</div>',
  components: {
    CompOne: component
  },
  data: {
    pre: 1
  },
  methods: {
    handChange () {
      this.pre += 1
    }
  }
})

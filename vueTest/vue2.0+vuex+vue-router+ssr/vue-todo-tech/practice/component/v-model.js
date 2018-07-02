import Vue from 'vue'

const comp = {
  model: {
    prop: 'value1',
    event: 'changed'
  },
  props: ['value1'], // 未在组件上绑定过此属性，通过model就可以获取v-model绑定
  template: '<div>' +
  '<input type="text" @input="changes" :value="value1">' +
  '</div>',
  methods: {
    changes (e) {
      this.$emit('changed', e.target.value) // changed代替input触发v-model绑定
    }
  }
}

new Vue({
  el: '#root',
  data: {
    value: '123'
  },
  template: '<div>123' +
  '<comp v-model="value">123</comp>' +
  '</div>',
  methods: {
    handChange (e) { // v-model绑定的，input可触发 @input="handChange"
      console.log(this.$children)
    }
  },
  components: {
    comp: comp
  }
})

import Vue from 'vue'

const ChildComp = {
  template: '<div>this child{{data.value}}</div>',
  inject: ['ye', 'data'],
  mounted () {
    console.log(this.ye)
    console.log(this.value)
  }
}

const component = {
  name: 'bigComp',
  components: {ChildComp},
  template: '<div :style="style">' +
    '<header><slot name="head">{{value}}</slot><ChildComp></ChildComp></header>' +
    '<button><slot name="buc" aa="插槽属性" :t ext="text">submit</slot></button>' +
    '</div>',
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '子级作用域',
      text: '子级内容'
    }
  }
}

new Vue({
  el: '#root',
  provide () {
    // 原先直接传递的this.value无法双向联动，所以声明一个data
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    // 此处不能直接传递data.value而是传递data，这样才能get到对象的变化
    return {
      ye: this,
      data
    }
  },
  components: {
    com: component
  },
  template: '<div><com ref="comp">' +
    '<span slot="head" ref="tem">{{value}}</span>' +
    '<template slot="buc" slot-scope="pro">{{pro.text}} {{pro.aa}}</template>' +
    '</com>' +
    '<input type="text" v-model="value" /></div>',
  data: {
    value: '父级作用域'
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.tem)
  }
})

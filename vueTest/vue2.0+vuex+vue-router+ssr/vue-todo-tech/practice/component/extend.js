import Vue from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)
div.id = 'hh'

const component = {
  template: '<div v-if="active">' +
  '<span @click="thisChange">{{text}} component {{pro}}</span></div>',
  data () {
    return {
      text: "I'm"
    }
  },
  props: {
    pro: Number,
    active: Boolean,
    onChange: Function
  },
  mounted () {
    this.$parent.pre = 666
    console.log(this.$parent.$options.name)
  },
  methods: {
    thisChange () {
      // 通过props取得绑定的属性，间接执行父级上事件
      this.onChange()
    }
  }
}

// extends
const compons = {
  extends: component,
  mounted () {
    this.$parent.pre = 66
    console.log(this.$parent.$options.name)
  },
  data () {
    return {
      text: 'seconed'
    }
  },
  props: {
    onChange: Function
  },
  methods: {
    thisChange () {
      // this.onChange()
      this.$emit('ccc')
      console.log('每次自加13')
    }
  }
}

const fa1 = new Vue({
  name: 'fa1',
  el: '#root',
  template: '<div>' +
  '<comp-one :active="true" :pro="pre" :on-change="handChange"></comp-one></br>' +
  '<comp-copy :active="true" :pro="pre2" @ccc="handChange2">123</comp-copy>' +
  '</div>',
  components: {
    CompOne: component,
    compCopy: compons
  },
  data: {
    pre: 1,
    pre2: 2
  },
  methods: {
    handChange () {
      this.pre += 1
    },
    handChange2 () {
      this.pre2 += 13
    }
  }
})

console.log(fa1.$data)

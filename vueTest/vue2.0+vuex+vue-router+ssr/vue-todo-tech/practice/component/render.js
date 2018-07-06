import Vue from 'vue'

const component = {
  name: 'bigComp',
  props: ['props1'],
  // template: '<div :style="style">' +
  //   '<slot></slot>' +
  //   '</div>',
  render (createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => {
          this.$emit('father', this.text)
        }
      }
    }, [
      this.$slots.head,
      this.props1
    ])
  },
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
  components: {
    com: component
  },
  data () {
    return {
      value: '父级作用域'
    }
  },
  methods: {
    handleClick (arg) {
      arg = arguments[0] instanceof Object ? 'run' : arguments[0]
      console.log(arg)
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.tem)
  },
  // template: '<com ref="comp" :props1="value" @father="handleClick">' +
  //   '<span ref="span" slot="head">{{value}}</span>' +
  //   '</com>'
  // render () {
  //   return this.$createElement()
  // },

  render (createElement) {
    return createElement(
      'com',
      {
        ref: 'com',
        props: {
          props1: this.value
        },
        on: {
          father: this.handleClick
        }
        // nativeOn: {
        //   click: this.handleClick
        // }
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'head',
          domProps: {},
          attrs: {
            class: 'text-name'
          }
        }, this.value)
      ]
    )
  }
})

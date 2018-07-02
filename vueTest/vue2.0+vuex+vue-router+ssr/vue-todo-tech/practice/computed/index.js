import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>' +
  '<p>{{name}}</p>' +
  '<p>{{getName()}}</p>' +
  '<p>{{number}}</p>' +
  '<p>FullName： {{fullName}}</p>' +
  '<p><input type="text" v-model="number"></p>' +
  '<p>FirstName:<input type="text" v-model="firName"></p>' +
  '<p>LastName<input type="text" v-model="lastName"></p>' +
  '<p><input type="text" v-model="name"></p>' +
  '<p>obj.a: <input type="text" v-model="obj.a"></p>' +
  '</div>',
  data: {
    firName: 'Chen',
    lastName: 'Shiqi',
    fullName: 'csq',
    number: 0,
    obj: {
      a: '123'
    }
  },
  computed: {
    // name () {
    //   console.log('computed')
    //   return this.firName + this.lastName
    // }
    name: {
      get () {
        console.log('computed')
        return this.firName + ' ' + this.lastName
      },
      set (name) {
        const names = name.split(' ')
        this.firName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // firName (newVal, oldVal) {
    //   this.fullName = newVal + ' ' + this.lastName
    // }
    'obj.a': {
      handler (newVal, oldVal) {
        console.log(oldVal + 'obj change' + newVal)
      },
      immediate: true
      // deep: true用于不加引号时只能监听obj，其中属性可用deep观察
    }
  },
  methods: {
    getName () {
      console.log('Getname')
      return this.firName + this.lastName
    }
  }
})

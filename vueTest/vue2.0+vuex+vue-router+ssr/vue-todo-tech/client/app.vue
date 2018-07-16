<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{textPlus}} </p>
    <p>{{fullName}} {{counter}}</p>
    <!-- <router-link :to="/app/ + search">app</router-link> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/login/exact">login exact</router-link>
    <!-- <todo></todo> -->
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  data () {
    return {
      search: 'csq',
      seatwo: '456'
    }
  },
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // console.log(this.$route)
    // console.log(this.$store)
    console.log(this['a/textPlus'])
    let i = 0
    setInterval(() => {
      this.updateCount({
        num: i += 7,
        num2: i++
      })
    }, 1000)
    this.acUp({fn: 'a/upTextA', num: 5, time: 5000})
    this.aMod()
  },
  computed: {
    // getModulesTextA () {
    //   return this.$store.state.a.text
    // },
    // count () {
    //   return this.$store.state.count
    // },
    ...mapState({
      counter: 'count',
      TextA: state => state.a.text
      // counter: (state) => state.count // 效果同上
    }),
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    // ...mapGetters(['fullName', 'a/textPlus']),
    // textPlus () { 原先想的这种方法太蠢了
    //   return this['a/textPlus']
    // }
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    })
  },
  methods: {
    ...mapActions({
      acUp: 'updateCountAsync',
      aMod: 'a/add'
    }),
    ...mapMutations(['updateCount', 'a/upTextA'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>



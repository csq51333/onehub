<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <p>{{fullName}}</p>
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
    // console.log('下面是$route全局对象')
    // console.log(this.$route)
    // console.log('下面是$store全局对象')
    // console.log(this.$store)
    setInterval(() => {
      this.$store.commit('updateCount', 10)
    }, 1000)
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    fullName () {
      return this.$store.getters.fullName
    }
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



<template>
  <div id="app">
    <a-layout>
      <div class="loading-container" v-show="isLoading">
        <a-spin size="large"/>
      </div>
      <a-layout-header style="padding: 0" v-show="!isLoading">
        <div class="logo" @click="goHome">GACHA</div>
      </a-layout-header>
      <a-layout-content v-show="!isLoading">
        <div class="container">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center" v-show="!isLoading">
        Genshin Lottery ©2020
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Layout} from 'ant-design-vue'

export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutFooter: Layout.Footer,
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/')
        this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;

  .loading-container {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    background: #ffffff;
  }

  .logo {
    font-size: 30px;
    color: white;
    margin-left: 98px;
    cursor: pointer;
    user-select: none;
  }

  .container {
    width: 90%;
    margin: auto;
    padding: 25px 20px 0 20px;
  }
}

@media screen and (max-width: 850px) {
  #app {
    .logo {
      margin-left: 15px;
    }

    .container {
      width: 100%;
      padding: 20px 10px 0 10px;
    }
  }
}
</style>

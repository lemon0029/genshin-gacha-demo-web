<template>
  <div id="app">
    <a-layout>
      <div class="loading-container" v-show="isLoading">
        <a-spin size="large" />
      </div>
      <app-header />
      <a-layout-content v-show="!isLoading">
        <div class="container">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center" v-show="!isLoading">
        Genshin Lottery ©2020
      </a-layout-footer>
      <a-back-top />
    </a-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Layout } from "ant-design-vue";
import AppHeader from "@/components/AppHeader";

export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
    }),
  },
  components: {
    AppHeader,
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ALayoutFooter: Layout.Footer,
  },
};
</script>

<style lang="less">
@font-face {
  font-family: YS-Normal;
  src: url("assets/font/Default_SC.ttf");
  font-style: normal;
}
#app {
  font-family: YS-Normal, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;

  .ant-layout {
    min-height: 100vh;
  }

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

  .container {
    width: 90%;
    margin: 64px auto 0 auto;
    padding: 25px 20px 0 20px;
  }
}

@media screen and (max-width: 850px) {
  #app {
    .container {
      width: 100%;
      padding: 20px 10px 0 10px;
    }

    .ant-back-top {
      display: none;
    }
  }
}
</style>

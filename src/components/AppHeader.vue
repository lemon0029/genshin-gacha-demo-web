<template>
  <a-layout-header
    style="padding: 0"
    :style="{ position: 'fixed', zIndex: 1000, width: '100%' }"
  >
    <div class="header-container">
      <div class="logo" @click="goHome">GACHA</div>
      <div class="tag" @click="showTag">
        <a-icon type="menu" :style="{ fontSize: '26px', color: '#fff' }" />
      </div>
      <div class="header-menu" v-show="menu_show">
        <a-menu
          theme="dark"
          mode="horizontal"
          :selectedKeys="[$route.path]"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="/">
            <router-link :to="{ name: 'Home' }">
              <a-icon type="home" />
              首页
            </router-link>
          </a-menu-item>
          <a-menu-item key="/total">
            <router-link :to="{ name: 'Total' }">
              <a-icon type="rocket" />
              总览
            </router-link>
          </a-menu-item>
          <a-menu-item key="/inventory">
            <router-link :to="{ name: 'Inventory' }">
              <a-icon type="history" />
              个人仓库
            </router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { Menu, Layout } from "ant-design-vue";

export default {
  name: "AppHeader",
  data() {
    return {
      menu_show: true,
    };
  },
  components: {
    ALayoutHeader: Layout.Header,
    AMenu: Menu,
    AMenuItem: Menu.Item,
  },
  methods: {
    goHome() {
      if (this.$route.path !== "/") this.$router.push({ name: "Home" });
    },
    showTag() {
      this.menu_show = !this.menu_show;
    },
  },
};
</script>

<style scoped lang="less">
.header-container {
  width: 90%;
  margin: auto;
  padding: 0 20px;
}

.logo {
  font-size: 30px;
  color: white;
  cursor: pointer;
  user-select: none;
  float: left;
  margin-right: 50px;
}

.tag {
  display: none;
  user-select: none;
  float: right;
  cursor: pointer;
}

@media screen and (max-width: 560px) {
  .header-container {
    width: 100%;
    padding-left: 15px;
    padding-right: 0;
  }

  .header-menu {
    display: none;
  }

  .tag {
    display: flex;
    height: 64px;
    align-items: center;
    float: right;
    padding-right: 15px;
  }
}
</style>
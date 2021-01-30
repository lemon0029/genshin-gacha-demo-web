<template>
  <div
    :loading="false"
    :bordered="true"
    :bodyStyle="{
      padding: 0,
      height: '100%',
    }"
    class="genshin-card"
  >
    <div :class="['item-bg-' + item['ranting']]" class="item-preview">
      <div class="item-avatar">
        <img :alt="item['name']" :src="item['avatar']" />
      </div>
      <div
        class="item-attr"
        :class="['character-attr-' + item['characterAttrId']]"
        v-if="item['character_attr_id'] !== null"
      />
    </div>
    <!--    <div v-if="item['count'] !== undefined" class="item-count">{{ item['count'] }}</div>-->
    <div v-if="item['count'] !== undefined" class="item-name">
      {{ item["name"] }} × {{ item["count"] }}
    </div>
    <!--    <div v-if="item['count'] !== undefined" class="item-count-bg"/>-->
    <!--    <div v-if="item['count'] !== undefined" class="item-name">{{ item['name'] }}</div>-->
    <div v-else class="item-name">{{ item["name"] }}</div>
  </div>
</template>

<script>
export default {
  name: "GenshinCard",
  props: {
    item: {},
  },
};
</script>

<style scoped lang="less">
.genshin-card {
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .item-preview {
    overflow: hidden;
    position: relative;
    background-size: 110% 110%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    border-bottom-right-radius: 17%;

    .item-avatar {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }

    .item-attr {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 26px;
      height: 26px;
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 2;
    }
  }

  .item-name {
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: YS-Normal, serif;
  }

  .item-count,
  .item-count-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
  }

  .item-count {
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }

  .item-count-bg {
    background-color: #ace0f9;
    z-index: 3;
    opacity: 0.4;
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .genshin-card {
    .item-attr {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
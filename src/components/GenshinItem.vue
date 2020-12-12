<template>
  <a-card :loading="false"
          :bordered="true"
          :bodyStyle="{
            padding: 0,
            height: '100%'
          }"
          class="genshin-card">

    <div :class="['item-bg-' + item['ranting']]" class="item-preview">
      <div :style="{backgroundImage: 'url(' + item['avatar'] + ')'}" class="item-avatar"/>
      <div class="item-attr"
           :class="['character-attr-' + item['characterAttrId']]"
           v-if="item['character_attr_id'] !== null"/>
    </div>
<!--    <div v-if="item['count'] !== undefined" class="item-name">{{ item['name'] }} {{ item['count'] }}</div>-->
    <div v-if="item['count'] !== undefined" class="item-name">{{ item['name'] }}</div>
    <div v-else class="item-name">{{ item['name'] }}</div>

  </a-card>
</template>

<script>
export default {
  name: 'GenshinCard',
  props: {
    item: {},
  }
}
</script>

<style scoped lang="less">
.genshin-card {
  margin: 8px;
  width: 120px;
  height: 150px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  overflow: hidden;
  box-sizing: border-box;

  .item-preview {
    width: 100%;
    height: 83%;
    overflow: hidden;
    position: relative;
    background-size: 110% 110%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    border-bottom-right-radius: 17%;

    .item-avatar {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-position-x: center;
      background-position-y: center;
      z-index: 1;
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
    height: 17%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: YS-Normal, serif;
  }
}

@media screen and (max-width: 500px) {
  .genshin-card {
    width: 88px;
    height: 110px;
    margin: 5px;

    .item-name {
      font-size: 12px;
    }

    .item-attr {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
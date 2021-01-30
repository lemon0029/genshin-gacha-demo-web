<template>
  <div class="genshin-item-container">
    <div class="grid-container">
      <genshin-item
        v-for="item in items"
        :key="items.indexOf(item) + 10"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import GenshinItem from "@/components/GenshinItem";

export default {
  components: {
    GenshinItem,
  },
  props: {
    items: {},
  },
};
</script>

<style lang="less" scoped>
.genshin-item-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .grid-container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  }
}
</style>
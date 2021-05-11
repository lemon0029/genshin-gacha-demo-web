<template>
  <div class="inventory">
    <a-select
      mode="tags"
      style="width: 16%"
      @change="handleChange"
      placeholder="请选择分类"
    >
      <a-select-option key="character"> 角色 </a-select-option>
      <a-select-option key="weapon"> 武器 </a-select-option>
    </a-select>
    <div class="main-content">
      <a-empty v-show="gifts.length === 0" />
      <genshin-item-list :items="gifts" />
    </div>
  </div>
</template>

<script>
import GenshinItemList from "@/components/GenshinItemList";
import { Select } from "ant-design-vue";

export default {
  data() {
    return {
      gifts: [],
      pools: [],
      selected_pool: "",
    };
  },
  name: "Total",
  components: {
    GenshinItemList,
    ASelect: Select,
    ASelectOption: Select.Option,
    GenshinItemList,
  },
  async created() {
    await this.fetchGifts();
  },
  methods: {
    async fetchGifts() {
      await axios.get("/api/genshin/items").then((resp) => {
        this.gifts = resp.data.data;
      });
    },
    async handleChange(value) {
      console.log(value);
      if (value.length > 1) {
        await this.fetchGifts();
      } else if (value[0] === "character") {
        await axios.get("/api/genshin/characters").then((resp) => {
          this.gifts = resp.data.data;
        });
      } else if (value[0] === "weapon") {
        await axios.get("/api/genshin/weapons").then((resp) => {
          this.gifts = resp.data.data;
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.main-content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  background-color: white;
  padding: 15px;
  overflow: hidden;
  min-height: 553px;

  .ant-empty {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 320px;
  }

  .genshin-card-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
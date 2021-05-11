<template>
  <div class="inventory">
    <div class="pool-select">
      <a-select v-model="selected_pool">
        <template v-for="pool in pools">
          <a-select-option :value="pool['pool_id']" :key="pool['pool_id']">
            <span v-html="pool['pool_title']"></span>
          </a-select-option>
        </template>
      </a-select>
    </div>

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
  name: "Inventory",
  components: {
    GenshinItemList,
    ASelect: Select,
    ASelectOption: Select.Option,
    GenshinItemList,
  },
  watch: {
    // 切换池子的时候清空抽奖列表和更新统计数据
    selected_pool(val) {
      this.selected_pool = val;
      this.fetchGifts();
      this.wish_gifts = [];
    },
  },
  async created() {
    await axios.get("/api/genshin/items").then((resp) => {
      console.log(resp.data);
    });

    if (this.$route.query["poolId"] !== undefined)
      this.selected_pool = this.$route.query["poolId"];
    await this.fetchPools();
    await this.fetchGifts();
  },
  methods: {
    async fetchGifts() {
      await axios
        .get("/api/inventory", {
          params: {
            poolId: this.selected_pool,
          },
        })
        .then((resp) => {
          this.gifts = resp.data.data;
        });
    },
    async fetchPools() {
      await axios.get("/api/genshin/pool").then((resp) => {
        this.pools = resp.data.data;
        if (this.selected_pool === "")
          this.selected_pool = resp.data.data[0]["pool_id"];
      });
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
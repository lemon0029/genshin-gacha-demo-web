<template>
  <div class="statistic-container">
    <div class="grid-container">
      <div class="statistic-card go-to-store" @click="go_to_store">
        前往仓库
      </div>
      <div class="statistic-card">
        {{ statistic_pool["totalWishCount"] }}
        <div class="inner-info">总祈愿数</div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["totalGet5Count"] }}
        <div class="inner-info">
          5星总数 ({{
            getPercent(
              statistic_pool["totalGet5Count"],
              statistic_pool["totalWishCount"]
            )
          }})
        </div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["totalGet4Count"] }}
        <div class="inner-info">
          4星总数 ({{
            getPercent(
              statistic_pool["totalGet4Count"],
              statistic_pool["totalWishCount"]
            )
          }})
        </div>
      </div>
      <div
        v-show="statistic_pool['totalGet5UpCount'] !== null"
        class="statistic-card"
      >
        {{ statistic_pool["totalGet5UpCount"] }}
        <div class="inner-info">
          5星UP数 ({{
            getPercent(
              statistic_pool["totalGet5UpCount"],
              statistic_pool["totalGet5Count"]
            )
          }})
        </div>
      </div>
      <div
        class="statistic-card"
        v-show="statistic_pool['totalGet4UpCount'] !== null"
      >
        {{ statistic_pool["totalGet4UpCount"] }}
        <div class="inner-info">
          4星UP数 ({{
            getPercent(
              statistic_pool["totalGet4UpCount"],
              statistic_pool["totalGet4Count"]
            )
          }})
        </div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["get5ByBaodiCount"] }}
        <div class="inner-info">5星保底数</div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["get4ByBaodiCount"] }}
        <div class="inner-info">4星保底数</div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["lastGet5Count"] }}
        <div class="inner-info">last get 5 count</div>
      </div>
      <div class="statistic-card">
        {{ statistic_pool["lastGet4Count"] }}
        <div class="inner-info">last get 4 count</div>
      </div>
      <div
        class="statistic-card"
        v-show="statistic_pool['lastGet4isUp'] !== null"
      >
        {{ statistic_pool["lastGet4isUp"] }}
        <div class="inner-info">上一次为4星UP</div>
      </div>
      <div
        class="statistic-card"
        v-show="statistic_pool['lastGet5isUp'] !== null"
      >
        {{ statistic_pool["lastGet5isUp"] }}
        <div class="inner-info">上一次为5星UP</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WishPoolStatistic",
  props: {
    statistic_pool: {},
  },
  methods: {
    go_to_store() {
      this.$emit("toStore", this.statistic_pool["wishPoolId"]);
    },
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0
        ? "0%"
        : Math.round((num / total) * 10000) / 100.0 + "%";
    },
  },
};
</script>

<style scoped lang="less">
.statistic-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .grid-container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  }

  .statistic-card {
    min-height: 120px;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .inner-info {
      background-color: rgba(0, 0, 0, 0.06);
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      width: 100%;
      margin: 0;
      padding: 5px 0;
      position: absolute;
      bottom: 0;
    }
  }

  .go-to-store {
    font-size: 25px;
    background: linear-gradient(#fff1eb, #ace0f9);
    //background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);
    cursor: pointer;
  }
}

</style>
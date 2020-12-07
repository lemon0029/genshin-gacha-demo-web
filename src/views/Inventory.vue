<template>
  <div class="main-content">
    <div class="genshin-card-container">
      <genshin-item
          v-for="gift in gifts"
          :item="gift['gift']"
          :key="gifts.indexOf(gift) + 10"
      />
    </div>
  </div>
</template>

<script>
import GenshinItem from '@/components/GenshinItem'

export default {
  data() {
    return {
      selected_pool: "",
      gifts: []
    }
  },
  name: 'Store',
  components: {
    GenshinItem
  },
  created() {
    this.selected_pool = this.$route.params['poolId']
    this.fetchGifts()
  },
  methods: {
    async fetchGifts() {
      let resp = await axios.get("/api/lottery/gifts", {
        params: {
          'sessionId': localStorage.getItem('session_id'),
          'poolId': this.$route.params['poolId']
        }
      })

      this.gifts = resp.data.data
      console.log(resp)
    }
  }
}
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

  .genshin-card-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
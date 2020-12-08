<template>
  <div class="main-content">
    <div class="genshin-card-container">
      <genshin-item
          v-for="gift in gifts"
          :item="gift"
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
      gifts: []
    }
  },
  name: 'Inventory',
  components: {
    GenshinItem
  },
  created() {
    this.fetchGifts()
  },
  methods: {
    async fetchGifts() {
      await axios.get('/api/inventory', {
        params: {
          'poolId': this.$route.query['poolId']
        },
        headers: {
          'vid': localStorage.getItem('vid')
        }
      }).then(resp => {
        this.gifts = resp.data.data
      })
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
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
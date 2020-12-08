<template>
  <div class="home">
    <a-alert :message="error_message"
             v-if="error_show"
             type="error"
             close-text="Close Now"
             class="error_msg"
             @close="() => {this.error_show = false}"/>

    <div class="pool-select">
      <a-select v-model="selected_pool">
        <template v-for="pool in pools">
          <a-select-option :value="pool['pool_id']">
            <span v-html="pool['pool_title']"></span>
          </a-select-option>
        </template>
      </a-select>
    </div>

    <div class="main-content">
      <div class="left-box">
        <a-empty :description="false" v-show="wish_gifts.length === 0"/>
        <div class="genshin-card-container">
          <genshin-item
              v-for="gift in wish_gifts"
              :key="wish_gifts.indexOf(gift) + 10"
              :item="gift"
          />
        </div>
        <div class="lottery-button-group">
          <a-config-provider :auto-insert-space-in-button="false">
            <a-button type="danger" size="large" class="reset-button" @click="reset">重置</a-button>
          </a-config-provider>
          <a-config-provider :auto-insert-space-in-button="false">
            <a-button class="wish-button" size="large" type="primary" @click="wish(10)">祈愿 &times; 10</a-button>
          </a-config-provider>
          <a-config-provider :auto-insert-space-in-button="false">
            <a-button class="wish-button" size="large" type="primary" @click="wish(90)">祈愿 &times; 90</a-button>
          </a-config-provider>
        </div>
      </div>

      <div class="right-box">
        <div class="statistic-title">数据统计</div>
        <wish-pool-statistic :statistic_pool="statistic_pool"
                             v-show="is_static_show"
                             @toStore="toStoreHandler"/>
      </div>

    </div>
  </div>
</template>

<script>
import {Layout, Select} from 'ant-design-vue'
import GenshinItem from '@/components/GenshinItem'
import WishPoolStatistic from '@/components/WishPoolStatistic'
import '@/service/HomeService'

export default {
  name: 'Home',
  data() {
    return {
      vid: '',
      pools: [],
      selected_pool: '',
      wish_gifts: [],
      statistic_pool: {},
      error_message: '',
      error_show: false,
    }
  },
  components: {
    GenshinItem: GenshinItem,
    WishPoolStatistic: WishPoolStatistic,
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutFooter: Layout.Footer,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  async created() {
    let vid = localStorage.getItem('vid')
    if (vid === null) {
      await this.auth()
    } else {
      this.vid = vid
    }
    await this.fetchPools()
  },
  computed: {
    is_static_show() {
      let strings = Object.keys(this.statistic_pool)
      return strings.length !== 0
    }
  },
  watch: {
    // 切换池子的时候清空抽奖列表和更新统计数据
    selected_pool(val) {
      this.selected_pool = val
      this.fetchWishPoolStatistic()
      this.wish_gifts = []
    }
  },
  methods: {
    toStoreHandler(data) {
      this.$router.push({name: 'Inventory', query: {'poolId': data}})
    },
    async fetchPools() {
      await axios.get('/api/genshin/pool', {
        headers: {'vid': this.vid}
      }).then(resp => {
        if (resp.data.code === 401) { // 授权未通过
          this.error_show = true
          this.error_message = '当前会话已过期，请尝试重新刷新页面注册 😑'
          localStorage.removeItem('vid')
        } else {
          this.pools = resp.data.data
          this.selected_pool = resp.data.data[0]['pool_id']
        }
      })
    },
    async auth() {
      await axios.get('/api/auth').then(resp => {
        this.vid = resp.data.data
        // 将 vid 保存到 localStorage 中
        localStorage.setItem('vid', resp.data.data)
      })
    },
    async fetchWishPoolStatistic() {
      await axios.get('/api/wish/statistic', {
        params: {
          'poolId': this.selected_pool
        },
        headers: {
          'vid': this.vid
        }
      }).then(resp => {
        if (resp.data.code !== 200) {
          if (resp.data.code === 401) { // 授权未通过
            this.error_show = true
            this.error_message = '当前会话已过期，请尝试重新刷新页面注册 😑'
            localStorage.removeItem('vid')
          }
        } else {
          this.statistic_pool = resp.data.data
        }
      })
    },
    // 获取池子的抽奖信息
    // 祈愿
    async wish(n) {
      await axios.get('/api/wish', {
        params: {
          'poolId': this.selected_pool, // 抽奖池子ID
          'n': n // 抽奖次数
        }, headers: {
          'vid': this.vid
        }
      }).then(resp => {
        if (resp.data.code !== 200) {
          this.error_show = true
          this.error_message = resp.data.message
        } else {
          this.wish_gifts = resp.data.data['wish_gifts']
          this.statistic_pool = resp.data.data['wish_statistic']
        }
      })
    },
    // 重置当前用户信息
    async reset() {
      await axios.get('/api/wish/reset', {
        params: {'poolId': this.selected_pool,}, headers: {
          'vid': this.vid
        }
      })
      await this.fetchWishPoolStatistic()
    }
  }
}
</script>

<style lang="less" scoped>
.error_msg {
  margin-bottom: 30px;
}

.home {
  .main-content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    background-color: white;
    padding: 15px;
    overflow: hidden;
    min-height: 553px;

    .left-box {
      z-index: 2;
      width: 60%;
      margin-top: 10px;

      .ant-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 320px;
      }

      .genshin-card-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      .lottery-button-group {
        height: 125px;
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          margin: 10px;
        }
      }
    }

    .right-box {
      width: 40%;
      padding: 8px 0 0 20px;

      .statistic-title {
        font-size: 20px;
        padding: 5px;
        margin-bottom: 12px;
      }

      .statistic-title:before {
        content: "";
        margin-right: .8rem;
        border-left: 6px solid rgba(255, 153, 102, .8);
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .home {
    .main-content {
      padding: 15px 5px;
      min-height: 0;

      .left-box {
        width: 100%;
        margin-top: 0;

        .lottery-button-group {
          z-index: 10;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          justify-content: flex-end;
          border-top: 1px solid #e8e8e8;
          background-color: #fff;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.07);

          button {
            margin: 0;
          }

          button:last-child {
            margin: 0 12px;
          }

          button:nth-last-child(2) {
            margin-left: 12px;
          }
        }
      }

      .right-box {
        width: 100%;
        margin-top: 20px;
        padding-left: 10px;
      }
    }
  }
}
</style>

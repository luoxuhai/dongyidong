<template>
  <div class="container-trends">
    <ul class="navbar">
      <li class="navbar-item"
          :class="{active: currentInedx === index}"
          v-for="(item, index) of navbarList"
          :key="index"
          @click="handleItem(index)">{{ item }}
      </li>
    </ul>
    <info-list :data="trendsList"
               @select="handleEnterDetail" />
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing"
                  :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import InfoList from "@/components/info-list"
import LoadingMore from "@/components/loading-more"
import { MessageNews } from "@/api"
import { mapState } from 'vuex'
import { pagingLoadingMixin } from '@/common/js/mixin'
export default {
  mixins: [pagingLoadingMixin],
  components: {
    InfoList,
    LoadingMore,
    PlaceholderImg
  },
  name: "trends",
  data() {
    return {
      nothing: false,
      currentInedx: 0,
      currentPage: 1,
      totalPage: 1,
      loading: true,
      pageSize: 10,
      trendsList: [],
      navbarList: ['全部', '技术训练', '营养饮食', '体育保健', '资讯', '其他']
    }
  },
  methods: {
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false
        return
      } else this.loading = true
      let data = {
        pageNum: this.currentPage,
        type: this.currentInedx - 1
      }
      if (this.currentInedx === 0) delete data.type
      MessageNews.selectMessageByType(data).then(res => {
        const { pages, size, records } = res.data
        if (records.length === 0) this.nothing = true
        else this.nothing = false
        if (this.currentPage >= pages) this.loading = false
        if (reachBottom) this.trendsList = [...this.trendsList, ...records]
        else this.trendsList = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        setTimeout(() => {
          wx.hideNavigationBarLoading()
        }, 200)
      }).finally(() => {
        wx.stopPullDownRefresh()
      })
    },
    handleEnterDetail(messageId) {
      wx.navigateTo({
        url: `/pages/trends-detail/main?messageId=${messageId}`
      })
    },
    handleItem(index) {
      wx.showNavigationBarLoading()
      this.trendsList = []
      this.currentPage = 1
      this.currentInedx = index
      this.loadMore()
    }
  },
  computed: {
    ...mapState(['userId', 'token'])
  },
  watch: {
    currentPage() {
      if (this.trendsList.length < this.pageSize)
        this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";

.container-trends {
  padding: 42px 15px;
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 42px;
    z-index: 999;
    background-color: #fff;
    .navbar-item {
      box-sizing: border-box;
      height: 100%;
      line-height: 42px;
      font-size: 15px;
      color: #303030;
      &.active {
        border-bottom: 2px solid #ffc83a;
        color: #ffc83a;
      }
    }
  }
}
</style>

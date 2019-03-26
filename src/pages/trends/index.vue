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
    <loading-more :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import InfoList from "@/components/info-list"
import LoadingMore from "@/components/loading-more"
import { MessageNews } from "@/api"
export default {
  components: {
    InfoList,
    LoadingMore
  },
  name: "trends",
  data() {
    return {
      currentInedx: 0,
      currentPage: 1,
      totalPage: 1,
      loading: true,
      pageSize: 10,
      trendsList: [],
      navbarList: ["全部", "技术训练", "营养饮食", "体育保健"]
    }
  },
  methods: {
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false
        return false
      } else this.loading = true
      let data = {
        pageNum: this.currentPage,
        type: this.currentInedx
      }
      MessageNews.selectMessageByType(data).then(res => {
        console.log(res.data);
        const { pages, size, records } = res.data
        if (this.currentPage === pages) this.loading = false
        if (reachBottom) this.trendsList = [...this.trendsList, ...records]
        else this.trendsList = [...records]
        this.totalPage = pages
        this.pageSize = size
        this.currentPage += 1
        wx.stopPullDownRefresh()
      })
    },
    handleEnterDetail(index) {
      wx.navigateTo({
        url: `/pages/trends-detail/main?id=${index}`
      })
    },
    handleItem(index) {
      this.currentPage = 1
      this.currentInedx = index
      this.loadMore()
    }
  },
  onPullDownRefresh() {
    this.currentPage = 1
    this.loadMore()
  },
  onReachBottom() {
    this.loadMore(true)
  },
  watch: {
    currentPage() {
      if (this.trendsList.length < this.pageSize)
        this.loading = false
    }
  },
  onLoad() {
    this.loadMore()
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";

.container-trends {
  padding: 0 15px;

  .navbar {
    @include flex(space-around, center);
    height: 42px;
    margin-bottom: 10px;
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

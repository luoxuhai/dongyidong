<template>
  <div class="container-train">
    <train-list :title="title"
                :data="trainList"
                @select="selectTrain" />
    <loading-more :loading="loading"
                  size="22" />
  </div>
</template>
<script>
import TrainList from "@/components/train-list"
import LoadingMore from "@/components/loading-more"
import { Course } from '@/api'
import { pagingLoadingMixin } from '@/common/js/mixin'
export default {
  mixins: [pagingLoadingMixin],
  components: {
    TrainList,
    LoadingMore
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      loading: true,
      title: "全部训练",
      trainList: []
    }
  },
  methods: {
    selectTrain(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    },
    loadMore(reachBottom = false) {
    //   if (this.currentPage > this.totalPage) {
    //     this.loading = false
    //     return false
    //   } else this.loading = true

      Course.userCourseList({
        pageNum: this.currentPage,
        userId: this.$store.state.userId
      }).then(res => {
        const { pages, size, records, total } = res.data
        // if (this.currentPage >= pages) this.loading = false
        if (reachBottom) this.trainList = [...this.trainList, ...records]
        else this.trainList = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        if (this.currentPage > this.totalPage) {
          this.loading = false
          return false
        } else this.loading = true
      }).finally(() => {
        wx.stopPullDownRefresh()
      })
    }
  },
  onShow() {
    this.currentPage = 1
    this.loadMore()
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";

.container-train {
  padding: 0 15px;

  .title {
    height: 24px;
    padding-left: 7px;
    border-left: 5px solid #ffc83a;
    font-size: 18px;
    color: #4a4a4a;
  }
}
</style>

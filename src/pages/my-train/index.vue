<template>
  <div class="my-train">
    <train-list :title="trainTitle"
                :data="trainData"
                @select="selectTrain" />
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing"
                  :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import TrainList from "@/components/train-list"
import LoadingMore from "@/components/loading-more"
import { pagingLoadingMixin } from '@/common/js/mixin'
import { Course } from '@/api'
export default {
  name: "my-train",
  mixins: [pagingLoadingMixin],
  data() {
    return {
      nothing: false,
      currentInedx: 0,
      currentPage: 1,
      totalPage: 1,
      loading: true,
      pageSize: 10,
      trainTitle: "全部训练",
      trainData: []
    }
  },
  methods: {
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false
        return
      } else this.loading = true
      Course.userCourseList({
        pageNum: this.currentPage,
        userId: this.$store.state.userId
      }).then(res => {
        const { pages, size, records } = res.data
        if (records.length === 0) this.nothing = true
        else this.nothing = false
        if (this.currentPage >= pages) this.loading = false
        if (reachBottom) this.trainData = [...this.trainData, ...records]
        else this.trainData = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        wx.stopPullDownRefresh()
      })
    },
    selectTrain(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    }
  },
  components: {
    TrainList,
    LoadingMore,
    PlaceholderImg
  }
}
</script>

<style scoped lang="scss">
.my-train {
  padding: 0 15px;
}
</style>

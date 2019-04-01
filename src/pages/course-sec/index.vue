<template>
  <div class="course-sec">
    <course-list :data="courseData"
                 @select="selectItem"></course-list>
    <loading-more :loading="loading"
                  :tip="tip" />
  </div>
</template>

<script>
import CourseList from "@/components/course-list"
import LoadingMore from '@/components/loading-more'
import { Course } from '@/api'
import { pagingLoadingMixin } from '@/common/js/mixin'
export default {
  name: "course-sec",
  mixins: [pagingLoadingMixin],
  components: {
    CourseList,
    LoadingMore
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      loading: true,
      courseData: []
    }
  },
  methods: {
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false;
        return
      } else this.loading = true

      let data = {
        pageNum: this.currentPage
      }
      Course.courseList(data).then(res => {
        const { pages, size, records, total } = res.data
        if (this.currentPage >= pages) this.loading = false
        if (reachBottom) this.courseData = [...this.courseData, ...records]
        else this.courseData = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        wx.stopPullDownRefresh()
      })

    },
    selectItem(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped lang="scss">
.course-sec {
  padding: 15px;
}
</style>

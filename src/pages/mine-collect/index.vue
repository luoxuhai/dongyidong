<template>
  <div class="collect-container">
    <ul class="header">
      <li class="navbar-item"
          @click="handleItem(index)"
          v-for="(item, index) of navbarList"
          :key="index"
          :class="{select: index === selectIndex}">{{item}}
      </li>
    </ul>
    <course-list v-if="selectIndex === 0"
                 :data="infoList"
                 @select="selectTrain" />
    <info-list v-if="selectIndex === 1"
               :data="infoList"
               @select="selectInfo" />
    <loading-more :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import CourseList from "@/components/course-list"
import InfoList from "@/components/info-list"
import LoadingMore from "@/components/loading-more"
import { MessageNews, Course } from "@/api"
import { transitionTime } from "@/libs/tools"
import { mapState } from 'vuex'
export default {
  components: {
    CourseList,
    InfoList,
    LoadingMore
  },
  data() {
    return {
      totalPage: 1,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      infoList: [],
      courseList: [],
      selectIndex: 0,
      navbarList: ["课程", "资讯"]
    }
  },

  methods: {
    selectTrain(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    },
    selectInfo(messageId) {
      wx.navigateTo({
        url: `/pages/trends-detail/main?messageId=${messageId}`
      })
    },
    getSucc(reachBottom, res) {
      const { size, pages, records } = res.data
      if (this.selectIndex === 0)
        records.forEach((item, index) => {
          const courseTolTime = records[index].courseTolTime
          records[index].courseTolTime = transitionTime(courseTolTime)
        });
      if (reachBottom) this.infoList = [...this.infoList, ...records]
      else this.infoList = [...records]
      this.totalPage = pages || 1
      this.currentPage += 1
      this.pageSize = size
      wx.stopPullDownRefresh()
    },
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false
        return false
      } else this.loading = true
      let data = {
        userId: this.$store.state.userId,
        pageNum: this.currentPage
      }
      if (this.selectIndex === 1)
        MessageNews.userCollectMessage(data).then(this.getSucc.bind(this, reachBottom)).catch(err => {

        })
      else
        Course.userCollectCourse(data).then(this.getSucc.bind(this, reachBottom)).catch(err => {

        })
    },
    handleItem(index) {
      this.currentPage = 1
      this.selectIndex = index
      this.loadMore()
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  watch: {
    currentPage() {
      if (this.infoList.length < this.pageSize)
        this.loading = false
    }
  },
  onPullDownRefresh() {
    this.currentPage = 1
    this.loadMore()
  },
  onReachBottom() {
    this.loadMore(true)
  },
  onShow() {
    this.currentPage = 1
    this.loadMore()
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.collect-container {
  padding: 50px 15px;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 45px;
  margin-bottom: 10px;
  background-color: #fff;
  .navbar-item {
    width: 34px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    text-align: center;
    color: #303030;

    &.select {
      border-bottom: 2px solid #ffc83a;
      color: #ffc83a;
    }
  }
}
</style>

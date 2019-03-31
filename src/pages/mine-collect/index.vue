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
                 :data="courseList" />
    <info-list v-if="selectIndex === 1"
               :data="infoList" />
    <loading-more :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import CourseList from "@/components/course-list"
import InfoList from "@/components/info-list"
import LoadingMore from "@/components/loading-more"
import { MessageNews, Course } from "@/api"
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
    getSucc(reachBottom, res) {
      const { size, pages, records } = res.data
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
          console.log(err);
        })
      else
        Course.userCourseList(data).then(this.getSucc.bind(this, reachBottom)).catch(err => {
          console.log(err);
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
  onLoad() {
    this.loadMore()
  },
  onPullDownRefresh() {
    this.currentPage = 1
    this.loadMore()
  },
  onReachBottom() {
    this.loadMore(true)
  },

  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.collect-container {
  padding: 40px 15px;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  background-color: #fff;

  .navbar-item {
    width: 30px;
    height: 42px;
    line-height: 42px;
    font-size: 15px;
    text-align: center;
    color: #303030;

    &.select {
      border-bottom: 2px solid #ffc83a;
      color: #ffc83a;
    }
  }
}
</style>

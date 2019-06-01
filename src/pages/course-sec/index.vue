<template>
  <div class="course-sec">
    <header class="navbar">
      <div class="options"
           @click="handleOptionClick">
        <p>{{ currentType }}</p>
        <span class="iconfont">&#xe684;</span>
      </div>
    </header>
    <course-list :data="courseData"
                 @select="selectItem"></course-list>
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing"
                  :loading="loading"
                  size="22" />
    <div v-show="optionShow"
         class="picker"
         :class="{ show:optionShow, hide: !optionShow}">
      <div class="button">
        <p @click="handleCloseClick">取消</p>
        <p @click="handleFilterClick">确认</p>
      </div>
      <div class="mask"
           @click="handleCloseClick"></div>
      <picker-view indicator-style="height: 50px;"
                   @change="bindChange">
        <picker-view-column>
          <view v-for="(item, index) of filters"
                :key="index"
                style="line-height: 50px; text-align: center">{{ item }}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import CourseList from "@/components/course-list"
import LoadingMore from '@/components/loading-more'
import { Course } from '@/api'
import { transitionTime } from "@/libs/tools"
import { pagingLoadingMixin } from '@/common/js/mixin'
let courseType = 0
export default {
  name: "course-sec",
  mixins: [pagingLoadingMixin],
  components: {
    CourseList,
    LoadingMore,
    PlaceholderImg
  },
  data() {
    return {
      optionShow: false,
      currentType: '全部',
      filters: ['全部', '跳绳', '短跑', '耐力跑', '球类', '仰卧起坐', '坐位体前屈', '肺活量', '饮食健康', '运动心理', '运动康复'],
      nothing: false,
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      loading: true,
      courseData: []
    }
  },
  methods: {
    handleCloseClick() {
      this.optionShow = false
      courseType = 0
    },
    handleFilterClick() {
      this.currentPage = 1
      this.currentType = this.filters[courseType]
      this.optionShow = false
      this.loadMore()
    },
    handleOptionClick() {
      this.optionShow = true
    },
    bindChange(e) {
      courseType = e.mp.detail.value[0]
    },
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false;
        return
      } else this.loading = true
      let data = {
        pageNum: this.currentPage
      }
      if (courseType) data.courseType = courseType
      Course.courseList(data).then(res => {
        const { pages, size, records, total } = res.data
        if (records.length === 0) this.nothing = true
        else this.nothing = false
        if (this.currentPage >= pages) this.loading = false
        records.forEach((item, index) => {
          const courseTolTime = records[index].courseTolTime
          records[index].courseTolTime = transitionTime(courseTolTime)
        });
        if (reachBottom) this.courseData = [...this.courseData, ...records]
        else this.courseData = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      })

    },
    selectItem(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    }
  },
  onUnload() {
    courseType = 0
  }
}
</script>

<style scoped lang="scss">
@import "static/styles/common.scss";
.course-sec {
  padding: 50px 15px;
  background-color: #fff;
  .picker {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 230px;
    background-color: #fff;
    picker-view {
      width: 100%;
      height: 100%;
    }
    .button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3em;
      padding: 0 20px;
      font-size: 17px;
      p {
        color: #8888;
        padding: 10px;
        &:last-child {
          color: #19be6b;
        }
      }
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100vh - 230px);
      background-color: rgba(0, 0, 0, 0.5);
    }
    &.show {
      animation: show 0.2s ease-out;
    }
    &.hide {
      animation: hide 0.2s ease-in;
    }
    @keyframes show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes hide {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
  .navbar {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    .options {
      @include center;
      width: max-content;
      height: 30px;
      padding: 0 14px;
      border: 1px solid #4a4a4a;
      border-radius: 15px;
      font-size: 15px;
      color: #4a4a4a;
      p {
        max-width: 4em;
        min-width: 2em;
        margin-right: 12px;
        @include ellipsis;
      }
      .iconfont {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>

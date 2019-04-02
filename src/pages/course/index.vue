<template>
  <div class="course">
      <swiper indicator-dots
              autoplay
              :interval="interval"
              :duration="duration"
              circular>
        <block v-for="(item, index) in imgUrls"
               :key="index">
          <swiper-item>
            <img :src="item"
                 class="slide-image"
                 alt="">
          </swiper-item>
        </block>
      </swiper>
      <div class="nav">
        <div class="nav-item"
             v-for="(item, index) of navbarList"
             :key="index"
             @click="handleEnterClick(index)">
          <img :src="item.imgUrl"
               width="90"
               height="90">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="course-wrap">
        <course-list :title="courseTitle"
                     :data="courseData"
                     @select="selectCourse"></course-list>
      </div>
  </div>
</template>

<script>
import CourseList from "@/components/course-list"
import { Home } from '@/api'

export default {
  name: "course",
  components: {
    CourseList
  },
  data() {
    return {
      navbarList: [
        {
          imgUrl: '/static/images/course/course.png',
          name: '课程'
        },
        {
          imgUrl: '/static/images/course/plan.png',
          name: '计划'
        },
        {
          imgUrl: '/static/images/course/info.png',
          name: '资讯'
        },
        {
          imgUrl: '/static/images/course/teacher.png',
          name: '名师'
        },
      ],
      // 轮播组件数据
      imgUrls: [
        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
      interval: 5000,
      duration: 450,
      // 课程数据
      courseTitle: '推荐课程',
      courseData: [],

    }
  },
  methods: {
    handleEnterClick(index) {
      switch (index) {
        case 0:
          wx.navigateTo({
            url: '/pages/course-sec/main'
          })
          break
        case 1:
          wx.switchTab({
            url: '/pages/train/main'
          });
          break
        case 2:
          wx.switchTab({
            url: '/pages/trends/main'
          });
          break
        case 3:
          wx.navigateTo({
            url: '/pages/course-teacher/main'
          })
      }
    },
    selectCourse(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    },
    getHomeData() {
      Home.selectMessage({}).then(res => {
        let { courseDtoList } = res.data
        this.courseData = [...courseDtoList]
        wx.stopPullDownRefresh()
      })
    }
  },
  onPullDownRefresh() {
    this.getHomeData()
  },
  onLoad() {
    this.getHomeData()
  }

}
</script>

<style scoped lang="scss">
.course {
  padding: 12px 15px 15px 15px;

  swiper {
    width: 100%;
    height: 194px;
    border-radius: 6px;
    overflow: hidden;
    img.slide-image {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    height: 105px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .nav-item {
      width: 45px;

      img {
        width: 45px;
        height: 45px;
      }

      p {
        text-align: center;
        font-size: 11px;
        color: #4a4a4a;
      }
    }
  }
}
</style>

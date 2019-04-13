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
          <img mode="aspectFill"
               :src="item.carouselUrl"
               class="slide-image">
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
import { transitionTime } from "@/libs/tools"
import { Home, Carousel } from '@/api'

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
      banners: [],
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
    getCourseData() {
      Home.selectMessage({}).then(res => {
        let { courseDtoList } = res.data
        courseDtoList.forEach((item, index) => {
          const courseTolTime = courseDtoList[index].courseTolTime
          courseDtoList[index].courseTolTime = transitionTime(courseTolTime)
        });
        this.courseData = [...courseDtoList]
        wx.stopPullDownRefresh()
      })
      Carousel.selectCarouselByType({
        type: 1
      }).then(res => {
        this.banners = res.data
      })
    }
  },
  onPullDownRefresh() {
    this.getCourseData()
  },
  onLoad() {
    this.getCourseData()
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
    background-color: #f7f7f7;
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

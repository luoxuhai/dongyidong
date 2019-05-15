<template>
  <div class="home"
       :style="{opacity: opacity}">
    <div class="weather">
      <div class="weather-left">
        <p class="local">{{addressInfo.city}} <span>{{addressInfo.district}}</span></p>
        <p>PM2.5 <span>μg/m3</span></p>
        <p class="quality">{{weather.quality}}</p>
      </div>
      <div class="weather-right">
        <p><i class="iconfont">&#xe631;</i>{{weather.temperature}}℃</p>
        <h2 :style="{borderRight: '5px solid' + borderColor[colorIndex]}">{{weather.pm2_5}}</h2>
      </div>
    </div>
    <div class="slider">
      <swiper indicator-dots
              autoplay
              indicator-active-color="#CAC4C3"
              :interval="interval"
              :duration="duration"
              circular>
        <block v-for="(item, index) in banners"
               :key="index">
          <swiper-item @click="handleBannerClick(item.carouselShowType, item.carouselShowId)">
            <img mode="aspectFill"
                 lazy-load
                 :src="item.carouselUrl"
                 class="slide-image"
                 width="100%"
                 height="100%" />
            <p class="title">{{ item.carouselTitle }}</p>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nav">
      <div class="train"
           @click="handleEnterClick(index = 0)">
        <img mode="aspectFill"
             src="/static/images/home-train.png">
        <span>我的训练</span>
      </div>
      <div class="collect"
           @click="handleEnterClick(index = 1)">
        <img mode="aspectFill"
             src="/static/images/home-collect.png">
        <span>我的收藏</span>
      </div>
      <div class="report"
           @click="handleEnterClick(index = 2)">
        <img mode="aspectFill"
             src="/static/images/home-report.png">
        <span>体质报告</span>
      </div>
    </div>
    <div class="course-wrap">
      <course-list :title="courseTitle"
                   :data="courseData"
                   @select="selectCourse"></course-list>
    </div>
    <div class="info-wrap">
      <info-list :title="infoTitle"
                 :data="infoData"
                 @select="selectInfo"></info-list>
    </div>
  </div>
</template>

<script>
import CourseList from "@/components/course-list"
import InfoList from "@/components/info-list"
import { Home, Carousel } from '@/api'
import { bannerNavigateMixin } from '@/common/js/mixin'
import { transitionTime } from "@/libs/tools"
export default {
  name: "home",
  mixins: [bannerNavigateMixin],
  components: {
    CourseList,
    InfoList
  },
  data() {
    return {
      opacity: 0,
      borderColor: ['#19be6b', '#ff9900', '#CF1322'],
      weather: {
        quality: '中度污染',
        pm2_5: 88,
        temperature: 22
      },
      addressInfo: {
        city: '天津',
        district: '滨海新区'
      },
      // 滚动视图组件配置
      scrollY: true,
      // 轮播组件数据
      banners: [],
      interval: 5000,
      duration: 450,
      // 课程组件数据
      courseTitle: "热门课程",
      courseData: [],
      // 资讯组件数据
      infoTitle: "热门资讯",
      infoData: []
    }
  },
  methods: {
    selectCourse(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`
      })
    },
    selectInfo(messageId) {
      wx.navigateTo({
        url: `/pages/trends-detail/main?messageId=${messageId}`
      })
    },
    handleEnterClick(index) {
      let url = ''
      switch (index) {
        case 0:
          url = '/pages/my-train/main'
          break
        case 1:
          url = '/pages/mine-collect/main'
          break
        case 2:
          url = '/pages/body-report/main'
      }
      wx.navigateTo({ url })
    },
    getHomeData() {
      Home.selectMessage({}).then(res => {
        let { courseDtoList, newsDtos } = res.data
        courseDtoList.forEach((item, index) => {
          const courseTolTime = courseDtoList[index].courseTolTime
          courseDtoList[index].courseTolTime = transitionTime(courseTolTime)
        });
        this.courseData = [...courseDtoList]
        this.infoData = [...newsDtos]
        wx.stopPullDownRefresh()
      }).then(() => {
        wx.hideNavigationBarLoading()
      })
      Carousel.selectCarouselByType({
        type: 0
      }).then(res => {
        this.banners = res.data
      })
    },
    getWeather(lat, lng) {
      Home.getWeather({
        from: 3,
        lat,
        lng,
        needMoreDay: 0,
        needHourData: 0,
        needIndex: 0,
        needAlarm: 0,
        need3HourForcast: 0
      }).then(res => {
        const now = res.showapi_res_body.now
        const { c3, c7 } = res.showapi_res_body.cityInfo
        const { quality, pm2_5 } = now.aqiDetail
        const { temperature } = now
        this.addressInfo = {
          city: c7,
          district: c3
        }
        this.weather = {
          pm2_5,
          quality,
          temperature
        }
      })
    },
    getLocation() {
      wx.showNavigationBarLoading()
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          const { latitude, longitude } = res
          this.getWeather(latitude, longitude)
        }
      })
    }
  },
  computed: {
    colorIndex() {
      if (this.weather.pm2_5 <= 75) return 0
      else if (this.weather.pm2_5 > 75 && this.weather.pm2_5 <= 115) return 1
      else return 2
    }
  },
  onPullDownRefresh() {
    this.getHomeData()
    this.getLocation()
  },
  onLoad() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        if (res.data)
          this.getLocation()
      }
    })
    this.getHomeData()
    setTimeout(() => {
      this.opacity = 1
    }, 200)
  }
}
</script>

<style scoped lang="scss">
.home {
  padding: 0 15px 10px;
  .weather {
    display: flex;
    justify-content: space-between;

    .weather-left {
      p.local {
        font: {
          size: 17px;
          weight: 600;
        }
        color: #1c2438;
        margin-bottom: 12px;
        span {
          font: {
            size: 14px;
            weight: 400;
          }
          color: #1c2438;
          display: inline-block;
          margin-left: 8px;
        }
        &.quality {
          font: {
            size: 35px;
            weight: 300;
          }
        }
      }
      p {
        font-size: 12px;
        color: #4a4a4a;
        margin-bottom: 8px;

        span {
          font-size: 11px;
          color: #9b9b9b;
          display: inline-block;
          margin-left: 12px;
        }
      }
    }

    .weather-right {
      color: #1c2438;

      p {
        font-size: 17px;
        margin-top: 4px;
        margin-bottom: 11px;
        text-align: right;

        i {
          display: inline-block;
          color: #000;
          font-size: 16px;
          margin-right: 10px;
        }
      }

      h2 {
        font-size: 35px;
        line-height: 35px;
        padding-right: 9px;
      }
    }
  }

  .slider {
    height: 115px;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 15px;

    swiper {
      width: 100%;
      height: 100%;
      background-color: #f7f7f7;
      .slide-image {
        width: 100%;
        height: 100%;
      }
      .title {
        position: absolute;
        bottom: 18px;
        z-index: 99;
        max-width: 90%;
        height: 25px;
        margin-left: 15px;
        padding: 0 5px;
        background-color: rgba(78, 78, 78, 0.25);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 25px;
        color: #fff;
        font: {
          size: 15px;
        }
      }
    }
  }

  .nav {
    display: flex;
    height: 100px;
    justify-content: space-between;

    .train,
    .collect,
    .report {
      width: 203px;
      height: 100%;
      position: relative;
      border-radius: 5px;
      margin-right: 4px;

      img {
        width: 100%;
        height: 100%;
      }

      span {
        position: absolute;
        width: 64px;
        height: 23px;
        top: 14px;
        left: 13px;
        font-size: 16px;
        color: #fff;
      }
    }

    .collect,
    .report {
      width: 67px;
      margin-right: 4px;

      span {
        width: 28px;
        height: 32px;
        top: 18px;
        left: 10px;
        font-size: 14px;
      }
    }

    .report {
      margin-right: 0;
    }
  }

  .course-wrap,
  .info-wrap {
    margin-top: 28px;
  }
}
</style>

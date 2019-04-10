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
        <p><i class="iconfont">&#xe631;</i>{{weather.wendu}}℃</p>
        <h2 :style="{borderRight: '5px solid' + borderColor[colorIndex]}">{{weather.pm25}}</h2>
      </div>
    </div>
    <div class="slider">
      <swiper indicator-dots
              autoplay
              :interval="interval"
              :duration="duration"
              circular>
        <block v-for="(item, index) in imgUrls"
               :key="index">
          <swiper-item>
            <img mode="aspectFill"
                 :src="item"
                 class="slide-image"
                 width="100%"
                 height="100%" />
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
import QQMapWX from '@/libs/qqmap-wx-jssdk.min'
import CourseList from "@/components/course-list"
import InfoList from "@/components/info-list"
import { Home } from '@/api'
import { transitionTime } from "@/libs/tools"
export default {
  name: "home",
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
        pm25: 88,
        wendu: 22
      },
      addressInfo: {
        city: '天津',
        district: '滨海新区'
      },
      // 滚动视图组件配置
      scrollY: true,
      // 轮播组件数据
      imgUrls: [
        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
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
      })
    },
    getWeather() {
      Home.getWeather().then(res => {
        const { pm25, quality, wendu } = res.data
        this.weather = {
          pm25,
          quality,
          wendu
        }
      })
    },
    getLocation() {
      const qqmapsdk = new QQMapWX({
        key: 'UFLBZ-JYS6J-DPAF4-FQJUZ-OG5AZ-K5BUB'
      });
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          const { latitude, longitude } = res
          qqmapsdk.reverseGeocoder({
            location: {
              latitude,
              longitude
            },
            success: res => {
              const { ad_info } = res.result
              this.addressInfo = {
                city: ad_info.city.slice(0, -1),
                district: ad_info.district
              }
              this.getWeather()
              wx.hideNavigationBarLoading()
            }
          })
        }
      })
    }
  },
  computed: {
    colorIndex() {
      if (this.weather.pm25 <= 75) return 0
      else if (this.weather.pm25 > 75 && this.weather.pm25 <= 115) return 1
      else return 0
    }
  },
  onPullDownRefresh() {
    this.getHomeData()
  },
  onLoad() {
    wx.showNavigationBarLoading()
    const token = wx.getStorageSync('token');
    if (token) this.getLocation()
    this.getHomeData()
    setTimeout(() => {
      this.opacity = 1
    }, 400)
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

      .slide-image {
        width: 100%;
        height: 100%;
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

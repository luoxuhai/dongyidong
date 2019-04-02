<template>
  <div class="course-detail">
    <div class="video-wrap">
      <img v-if="!videoPlay"
           mode="aspectFill"
           :src="courseDetail.courseImage">
      <video v-if="videoPlay"
             enable-play-gesture
             :show-fullscreen-btn="false"
             :show-center-play-btn="false"
             :autoplay="autoplay"
             :poster="courseDetail.courseImage"
             :src="courseDetail.courseUrl" />
      <span v-show="!videoPlay">{{courseDetail.courseTolTime}}</span>
      <i v-show="!videoPlay"
         class="iconfont"
         @click="handlePlayClick">&#xe609;</i>
    </div>
    <div class="con-wrap">
      <h4>{{ courseDetail.courseTitle }}</h4>
      <p>{{courseDetail.courseNum}}人正在学习</p>
      <div class="icon-wrap"
           @click="handleCollectClick">
        <img :src="isCollected ? collectIcons[0] : collectIcons[1]">
        <span>收藏</span>
      </div>
    </div>
    <div class="switch">
      <div @click="switchHandle(index = 0)"
           :class="stitchIndex === 0 ? 'active' : ''"
           class="left"
           data-i="1">介绍</div>
      <div @click="switchHandle(index =1)"
           :class="stitchIndex === 1 ? 'active' : ''"
           class="right"
           data-i="2">动作</div>
    </div>
    <div class="introduce"
         v-show="stitchIndex === 0">
      <div class="text">
        <h4>简介</h4>
        <p>{{courseDetail.courseDescription}}</p>
      </div>
      <div class="text">
        <h4>预期目标</h4>
        <p>{{courseDetail.courseTarget}}</p>
      </div>
      <div class="text">
        <h4>相关标准</h4>
        <p>{{courseDetail.courseStandard}}</p>
      </div>
    </div>
    <div class="action"
         v-show="stitchIndex === 1">
      <div class="step"
           v-for="(item, index) of actionList"
           :key="index">
        <div>{{index + 1}}</div>
        <div>
          <img mode="aspectFill"
               :src="item.actionUrl">
        </div>
        <div>
          <h4>{{ item.actionTitle }}</h4>
          <p>练习时间：{{item.actionTime}}分钟</p>
        </div>
      </div>
    </div>
    <div class="bottom-tips"
         @click="handelJoinClick"> {{ isJoin ? '退出训练计划' : '加入训练计划' }}</div>
  </div>
</template>

<script>
import { Course } from '@/api'
export default {
  name: "course-detail",
  data() {
    return {
      videoPlay: false,
      autoplay: false,
      courseId: '',
      courseDetail: {},
      actionList: [],
      isCollected: 0,
      isJoin: 0,
      stitchIndex: 0,
      collectIcons: ['/static/images/course/collect2.png', '/static/images/course/collect1.png']
    }
  },
  methods: {
    handlePlayClick() {
      this.autoplay = true
      this.videoPlay = true
    },
    handelJoinClick() {
      //添加训练
      if (this.isJoin) {
        Course.withdrawCourse({
          userId: this.$store.state.userId,
          courseId: this.courseId
        }).then(res => {
          this.isJoin = 0
          wx.showToast({
            title: '已取消训练',
            icon: 'success',
            duration: 2000
          })
        })
      } else
        //取消训练
        Course.joinCourse({
          userId: this.$store.state.userId,
          courseId: this.courseId
        }).then(res => {
          this.isJoin = 1
          wx.showToast({
            title: '加入训练成功',
            icon: 'success',
            duration: 2000
          })
        })
    },
    handleCollectClick() {
      //添加收藏
      if (this.isCollected) {
        Course.cancelCollect({
          userId: this.$store.state.userId,
          courseId: this.courseId
        }).then(res => {
          this.isCollected = 0
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 2000
          })
        })
      } else
        //取消收藏
        Course.collectCourse({
          userId: this.$store.state.userId,
          courseId: this.courseId
        }).then(res => {
          this.isCollected = 1
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        })
    },
    switchHandle(index) {
      this.stitchIndex = index
      switch (index) {
        case 0:
          break
        case 1:
          this.getActionDetail()
      }
    },
    getActionDetail() {
      Course.courseAction({ courseId: this.courseId }).then(res => {
        this.actionList = [...res.data]
      })
    }
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    const { courseId } = options
    this.courseId = courseId
    Course.courseDetail({
      userId: this.$store.state.userId,
      courseId
    }).then(res => {
      let { data } = res
      this.isCollected = data.isCollected
      this.isJoin = data.isJoin
      this.courseDetail = data
      wx.hideNavigationBarLoading()
    })
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped lang="scss">
.course-detail {
  padding-bottom: 62px;

  .video-wrap {
    height: 211px;
    position: relative;
    video {
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
      left: 15px;
      bottom: 15px;
      padding: 1px 3px;
      font-size: 9px;
      background-color: rgba(137, 137, 137, 0.5);
      color: #fff;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #f7f7f7;
    }

    i.iconfont {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      width: 60px;
      height: 60px;
      color: #fff;
      text-align: center;
      line-height: 60px;
      font-size: 60px;
      opacity: 0.5;
    }
  }

  .con-wrap {
    padding: 13px 15px 14px;
    border-bottom: 5px solid rgba(248, 248, 248, 1);
    position: relative;

    h4 {
      font-size: 15px;
      color: rgba(28, 36, 56, 1);
    }

    p {
      margin-top: 12px;
      font-size: 10px;
      color: rgba(128, 132, 143, 1);
    }

    .icon-wrap {
      position: absolute;
      height: 16px;
      line-height: 16px;
      right: 12px;
      bottom: 12px;
      color: rgba(255, 200, 58, 1);

      img {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }

      span {
        display: inline-block;
        height: 16px;
        font-size: 10px;
        vertical-align: top;
      }
    }
  }

  .switch {
    height: 42px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgba(238, 238, 238, 1);

    div {
      box-sizing: border-box;
      text-align: center;
      width: 64px;
      line-height: 42px;
      border-bottom: 3px solid transparent;

      &.active {
        color: rgba(255, 200, 58, 1);
        border-bottom: 3px solid rgba(255, 200, 58, 1);
      }
    }
  }

  .introduce {
    padding: 14px 15px 15px 15px;

    .text {
      & + .text {
        margin-top: 16px;
      }

      h4 {
        font-size: 14px;
        color: rgba(74, 74, 74, 1);
      }

      p {
        margin-top: 7px;
        font-size: 12px;
        color: rgba(155, 155, 155, 1);
      }
    }
  }

  .action {
    padding-top: 21px;

    .step {
      display: flex;
      justify-content: space-around;

      & + .step {
        margin-top: 15px;
      }

      div:nth-child(1) {
        line-height: 62px;
        font-size: 13pt;
        margin-left: 22px;
        margin-right: 13px;
        color: rgba(74, 74, 74, 1);
      }

      div:nth-child(2) {
        width: 110px;
        height: 62px;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      div:nth-child(3) {
        width: 193px;

        h4 {
          font-size: 13px;
          color: rgba(74, 74, 74, 1);
          width: 100%;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden; /** 隐藏超出的内容 **/
        }

        p {
          margin-top: 9px;
          color: rgba(155, 155, 155, 1);
          font-size: 11px;
        }
      }
    }
  }
}

.bottom-tips {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 47px;
  line-height: 47px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background-color: rgba(255, 200, 58, 1);
}
</style>

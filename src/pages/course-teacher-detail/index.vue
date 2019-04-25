<template>
  <div class="teacher-detail">
    <div class="avatar">
      <img mode="aspectFill"
           :src="teacherDetail.teacherUrl"
           @load="bindload">
    </div>
    <div class="desc">
      <p class="name">{{ teacherDetail.teacherName }}</p>
      <p class="intro">{{ teacherDetail.teacherSlogan }}</p>
      <rich-text class="syn"
                 :nodes="teacherDetail.teacherDescription"
                 space="nbsp" />
      <div class="tag">
        <div class="tag-item"
             v-for="(item, index) of teacherDetail.teacherLabel"
             :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { TrainingTeacher } from '@/api'
export default {
  name: "course-teacher-detail",
  data() {
    return {
      teacherDetail: {}
    }
  },
  methods: {
    bindload() {
      wx.hideNavigationBarLoading()
    },
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    TrainingTeacher.teacherDetail({ teacherId: options.teacherId })
      .then(res => {
        let teacherLabel = res.data.teacherLabel
        this.teacherDetail = res.data
        this.teacherDetail.teacherLabel = teacherLabel.split('，')
      }).catch(err => {
        this.networkError()
      })
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";

.teacher-detail {
  display: flex;
  margin: 25px;
  .avatar {
    @include center;
    width: 82px;
    height: 82px;
    border: 1px solid #ffc83a;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background-color: #f7f7f7;
    }
  }
  .desc {
    flex: 1;
    margin-left: 15px;
    .name {
      font-size: 16px;
      color: #1c2438;
    }
    .intro {
      margin: 15px 0 10px 0;
      font-size: 12px;
      color: #4a5060;
    }
    .syn {
      font-size: 12px;
      color: #80848f;
    }
    .tag {
      margin-top: 15px;
      .tag-item {
        display: inline-block;
        height: 20px;
        margin: 4px;
        padding: 0 9px;
        background-color: rgb(255, 240, 196);
        border-radius: 2px;
        font-size: 10px;
        line-height: 21px;
        text-align: center;
        color: #4a5060;
      }
    }
  }
}
</style>

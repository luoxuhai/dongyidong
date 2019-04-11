<template>
  <div>
    <img class="cover"
         mode="aspectFill"
         :src="detailContent.messageUrl">
    <h1 class="title">{{ detailContent.messageTitle }}</h1>
    <p class="browse-count">{{ detailContent.messageNum}}人浏览</p>
    <text class="article"
          selectable
          decode
          space="nbsp"
          @click="handleShowButton">{{ detailContent.messageContent }}</text>
    <div class="collect-panel"
         :class="{show: buttonShow}">
      <div class="button-collect"
           @click="handleCollect">{{ isCollect ? '取消收藏' : '加入收藏'}}</div>
    </div>
  </div>
</template>

<script>
import { MessageNews } from "@/api"
export default {
  name: '',
  data() {
    return {
      buttonShow: false,
      messageId: '',
      isCollect: false,
      detailContent: {}
    }
  },
  methods: {
    handleCollect() {
      //添加收藏
      if (this.isCollect) {
        MessageNews.cancelCollect({
          userId: this.$store.state.userId,
          newsId: this.messageId
        }).then(res => {
          this.isCollect = false
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 2000
          })
        })
      } else
        //取消收藏
        MessageNews.addInCollect({
          userId: this.$store.state.userId,
          newsId: this.messageId
        }).then(res => {
          this.isCollect = true
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        })
    },
    handleShowButton() {
      this.buttonShow = !this.buttonShow;
    },
    getTrendsDetail() {
      MessageNews.selectMessageDetail({
        userId: this.$store.state.userId,
        newsId: this.messageId
      }).then(res => {
        this.detailContent = res.data
        this.isCollect = Boolean(res.data.isCollect)
        wx.hideNavigationBarLoading()
      }).catch(err => {

      })
    }
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    this.messageId = options.messageId
    this.getTrendsDetail()
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";
.cover {
  width: 100vw;
  height: 125px;
  background-color: #f7f7f7;
}
.title {
  margin: 15px 15px 10px 15px;
  @include ellipsis(3);
  font-size: 17px;
  color: #1c2438;
}
.browse-count {
  margin: 0 0 20px 15px;
  font-size: 10px;
  color: #80848f;
}
.article {
  display: block;
  width: 333px;
  min-height: 50vh;
  margin: 0 auto;
  padding-bottom: 100px;
  font-size: 14px;
  color: #4a5060;
}
.collect-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  transform: translateY(0);
  transition: all 0.2s ease-out;
  //   box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: transparent;
  .button-collect {
    width: 263px;
    height: 38px;
    border-radius: 24px;
    background-color: #ffc83a;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    color: #fff;
  }
  &.show {
    transform: translateY(0);
  }
}
</style>

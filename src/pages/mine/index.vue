<template>
  <div class="container">
    <div class="header">
      <div class="header-user">
        <img class="header-user-img"
             style="background: url('/static/images/course/teacher.png') 100% / cover;"
             mode="aspectFill"
             :src="userInfo.userImage">
        <div class="header-text">
          <text class="text-user-name">{{ userInfo.userNickname }}</text>
          <text class="text-address">{{ userInfo.userCity }}</text>
          <text class="text-school">{{userInfo.schoolName || '未知'}}</text>
        </div>
      </div>
      <div class="function">
        <div class="function-text">我的足迹</div>
        <div class="function-images">
          <div class="function-images-text"
               v-for="(item, index) of List"
               :key="index"
               @click="handleEnterDetail(index)">
            <img class="function-image"
                 :src="item.img">
            <text class="function-textone">{{item.text}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserInfo } from '@/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: {},
      List: [
        {
          img: "/static/images/my/collect.png",
          text: "收藏"
        },
        {
          img: "/static/images/my/help.png",
          text: "帮助反馈"
        },
        {
          img: "/static/images/my/setting.png",
          text: "设置"
        }
      ]
    }
  },
  methods: {
    getUserInfo() {
      UserInfo.selectUserInfo({ userId: this.$store.state.userId }).then(res => {
        const { schoolName, userCity, userImage, userNickname } = res.data
        this.userInfo = {
          schoolName, userCity, userImage, userNickname: decodeURI(userNickname)
        }
      })
    },
    handleEnterDetail(index) {
      switch (index) {
        case 0:
          wx.navigateTo({
            url: `/pages/mine-collect/main`
          })
      }
    }
  },
  onShow() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";
.container {
  height: 100vh;
  background-color: #f8f8f8;
}
.header {
  display: flex;
  flex-direction: column;
  position: relative;
  .header-user {
    display: flex;
    width: 375px;
    height: 128px;
    background-color: #ffc83a;
    .header-user-img {
      width: 70px;
      height: 70px;
      margin: 13px 16px 0 16px;
      border-radius: 50%;
    }
    .header-text {
      display: flex;
      flex-direction: column;
      margin-top: 25rpx;
      .text-address,
      .text-school,
      .text-user-name {
        color: #fff;
      }
      .text-user-name {
        font-size: 16px;
        font-weight: 500;
      }
      .text-address {
        margin-top: 12px;
        font-size: 12px;
      }
      .text-school {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .function {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 345px;
    height: 103px;
    margin: 98px 15px auto 15px;
    border-radius: 6px;
    background-color: #fff;
    .function-text {
      margin: 13px;
      font-size: 17px;
      font-weight: 500;
      color: #4a4a4a;
    }
    .function-images {
      display: flex;
      justify-content: space-between;
      margin: 0 46px;
      .function-images-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .function-image {
          width: 22px;
          height: 22px;
        }
        .function-textone {
          margin-top: 10px;
          font-size: 10px;
          color: #4a4a4a;
        }
      }
    }
  }
}
</style>

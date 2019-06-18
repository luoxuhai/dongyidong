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
          <text class="text-school">{{userInfo.userSchool || '未知'}}</text>
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
                 mode="aspectFill"
                 :src="item.img">
            <text class="function-textone">{{item.text}}</text>
          </div>
        </div>
      </div>
    </div>
    <ul class="option-container">
      <li class="option-item"
          v-for="(item, index) of options"
          :key="index"
          @click="handleEnterDetailClick(index)">
        <img :src="item.icon"
             mode="aspectFill">
        {{ item.title }}</li>
    </ul>
    <div class="logo-container">
      <img class="logo"
           src="/static/images/logo.png"
           mode="aspectFit">
    </div>
  </div>
</template>

<script>
import { UserInfo } from '@/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      userInfo: {},
      options: [
        {
          title: '会员',
          icon: '/static/images/my/vip.png'
        },
        {
          title: '反馈',
          icon: '/static/images/my/feedback.png'
        },
        {
          title: '绑定手机号',
          icon: '/static/images/my/binding.png'
        }
      ],
      List: [
        {
          img: "/static/images/my/collect.png",
          text: "收藏"
        },
        {
          img: "/static/images/my/help.png",
          text: "帮助"
        },
        {
          img: "/static/images/my/setting.png",
          text: "设置"
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleEnterDetailClick(index) {
      let url = ''
      switch (index) {
        case 0:
          url = '/pages/mine-vip/main'
          break
        case 1:
          url = '/pages/mine-feedback/main'
          break
        case 2:
          url = '/pages/mine-binding/main'
      }
      wx.navigateTo({ url });
    },
    getUserInfo() {
      UserInfo.selectUserInfo({ userId: this.$store.state.userId }).then(res => {
        const { userSchool, userCity, userImage, userNickname } = res.data
        this.userInfo = {
          userSchool, userCity, userImage, userNickname: decodeURI(userNickname)
        }
        this.setUserInfo({
          school: userSchool,
          nickName: decodeURI(userNickname),
          avatarUrl: userImage,
          city: userCity
        })
      })
    },
    handleEnterDetail(index) {
      let url
      switch (index) {
        case 0:
          url = '/pages/mine-collect/main'
          break
        case 1:
          url = '/pages/help/main'
          break
        case 2:
          url = '/pages/setting/main'
      }
      wx.navigateTo({ url });
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
  .logo-container {
    @include center;
    height: calc(100vh - 350px);
    .logo {
      width: 30vw;
      height: 30vw;
    }
  }
  .header {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 99;
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
          font: {
            size: 16px;
            weight: 600;
          }
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
      justify-content: center;
      position: absolute;
      width: 345px;
      height: 103px;
      margin: 98px 15px auto 15px;
      border-radius: 6px;
      background-color: #fff;
      .function-text {
        margin: 5px 13px 13px 13px;
        font-size: 17px;
        font-weight: 500;
        color: #4a4a4a;
      }
      .function-images {
        display: flex;
        justify-content: space-around;
        .function-images-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 10px 20px;
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
  .option-container {
    width: 345px;
    margin: 82px auto 0;
    background-color: #fff;
    border-radius: 6px;
    .option-item {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 10px;
      font: {
        size: 14px;
      }
      color: #4a4a4a;
      img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }
  }
}
</style>

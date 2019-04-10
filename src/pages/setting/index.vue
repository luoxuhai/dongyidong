<template>
  <div class="container">
    <ul class="setting-list">
      <li class="setting-item avatar">
        <h1>头像</h1>
        <div>
          <img mode="aspectFill"
               :src="userInfo.userImage">
          <span class="iconfont"></span>
        </div>
      </li>
      <li class="setting-item"
          @click="handleEnterClick(index = 1)">
        <h1>姓名</h1>
        <div>
          <p>{{ userInfo.userNickname }}</p>
          <span class="iconfont"></span>
        </div>
      </li>
      <li class="setting-item">
        <h1>地区</h1>
        <div>
          <picker mode="selector"
                  @change="bindPickerChange"
                  :value="index"
                  :range="array">
            <p>{{ array[index] }}</p>
          </picker>
          <span class="iconfont"></span>
        </div>

      </li>
      <li class="setting-item"
          @click="handleEnterClick(index = 1)">
        <h1>学校</h1>
        <div>
          <p>{{userInfo.userSchool || '未知'}}</p>
          <span class="
          iconfont"></span>
        </div>
      </li>
    </ul>
    <div class="button-logout"
         @click="handleLogoutClick">退出登录</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      index: 0,
      customItem: '全部',
      array: ['北京', '天津', '上海', '深圳', '重庆', '广州'],
      userInfo: {},
      settingList: ['头像', '姓名', '地区', '学校']
    }
  },
  methods: {
    handleLogoutClick() {
      wx.showModal({
        title: '提示',
        content: '确认退出登录',
        success(res) {
          if (res.confirm) {
            wx.clearStorageSync()
            wx.navigateTo({ url: `/pages/login/main` });
          }
        }
      })
    },
    bindPickerChange(e) {
      const index = Number(e.mp.detail.value)
      this.index = index
    },
    handleEnterClick(index) {
      switch (index) {
        case 1:
          wx.navigateTo({
            url: `/pages/setting-detail/main?value=${this.userInfo.userNickname}`
          })
          break;
        case 3:
          wx.navigateTo({
            url: `/pages/setting-detail/main?value=${this.userInfo.userSchool}`
          })

      }
    },
    getUserInfo() {
      UserInfo.selectUserInfo({ userId: this.$store.state.userId }).then(res => {
        const { userSchool, userCity, userImage, userNickname } = res.data
        this.userInfo = {
          userSchool, userCity, userImage, userNickname: decodeURI(userNickname)
        }
      })
    },
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName'])
  },
  onLoad() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f8f8f8;
  .setting-list {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      padding: 0 15px;
      border-bottom: 0.5rpx solid #ececec;
      background-color: #fff;
      div {
        display: flex;
      }
      h1 {
        font: {
          size: 16px;
        }
      }
      p {
        font: {
          size: 15px;
        }
        color: #4a4a4a;
      }
      picker {
        width: 50vw;
        p {
          text-align: right;
        }
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .iconfont {
        margin-left: 15px;
      }
    }
    .avatar {
      height: 63px;
      border-top: 0.5rpx solid #ececec;
    }
  }
  .button-logout {
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    width: 264px;
    height: 40px;
    border-radius: 24px;
    background-color: #ffc83a;
    text-align: center;
    line-height: 40px;
    font: {
      size: 16px;
    }
    color: #fff;
    &:active {
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
    }
  }
}
</style>

<template>
  <div class="container">
    <ul class="setting-list">
      <li class="setting-item avatar"
          @click="handleEnterClick(index = 0)">
        <h1>头像</h1>
        <div>
          <img mode="aspectFill"
               :src="avatarUrl"
               @load="bindload">
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>
      <li class="setting-item"
          @click="handleEnterClick(index = 1)">
        <h1>姓名</h1>
        <div>
          <p>{{ nickName }}</p>
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>
      <li class="setting-item"
          @click="handleEnterClick(index = 2)">
        <h1>地区</h1>
        <div>
          <!-- <picker mode="selector"
                  @change="changePickerCity"
                  :value="cityIndex"
                  :range="cityArr"> -->
          <p>{{ city }}</p>
          <!-- </picker> -->
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>
      <li class="setting-item">
        <h1>学校</h1>
        <div>
          <picker mode="selector"
                  @change="changePickerSchool"
                  :value="schoolIndex"
                  :range="schoolArr"
                  range-key="schoolName">
            <p>{{ school }}</p>
          </picker>
          <!-- <p>{{userInfo.userSchool || '未知'}}</p> -->
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>
    </ul>
    <div class="button-logout"
         @click="handleLogoutClick">退出登录</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      imgUrl: '',
      schoolIndex: 0,
      schoolArr: [],
      school: '',
      userInfo: {},
      settingList: ['头像', '姓名', '地区', '学校']
    }
  },
  methods: {
    bindload() {
      wx.hideNavigationBarLoading()
    },
    changePickerCity(e) {
      const index = Number(e.mp.detail.value)
      this.cityIndex = index
    },
    changePickerSchool(e) {
      wx.showLoading({
        title: '保存中',
      })
      const schoolId = this.schoolArr[e.mp.detail.value].schoolId
      UserInfo.upDateUserBasicInfo({
        userId: this.$store.state.userId,
        schoolId
      }).then((res) => {
        const school = this.schoolArr[e.mp.detail.value].schoolName
        this.school = school
        this.setUserInfo({ school })
        wx.hideLoading()
      })
    },
    selectImage() {
      wx.showLoading({
        title: '加载中',
      })
      wx.chooseImage({
        count: 1,
        sizeType: ["original"],
        success: res => {
          wx.navigateTo({
            url: `/pages/setting-cropper/main?imageSrc=${res.tempFilePaths[0]}`
          });
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },
    ...mapMutations(['setUserInfo']),
    handleLogoutClick() {
      wx.showModal({
        title: '提示',
        content: '确认退出登录',
        confirmColor: '#ed3f14',
        success: (res) => {
          if (res.confirm) {
            this.setUserInfo({
              userId: '',
              token: '',
              openId: '',
            })
            wx.clearStorageSync()
            wx.reLaunch({
              url: `/pages/login/main`
            })
          }
        }
      })
    },
    handleEnterClick(index) {
      switch (index) {
        case 0:
          this.selectImage()
          break
        case 1:
          wx.navigateTo({
            url: `/pages/setting-name/main?value=${this.userInfo.userNickname}&userKey=0`
          })
          break
        case 2:
          wx.navigateTo({ url: `/pages/setting-city/main?currentCity=${this.city}` })
          break
        case 3:
          wx.navigateTo({
            url: `/pages/setting-detail/main?value=${this.userInfo.userSchool}&userKey=0`
          })
      }
    },
    getUserInfo() {
      UserInfo.selectUserInfo({ userId: this.$store.state.userId }).then(res => {
        const { userSchool, userCity, userImage, userNickname } = res.data
        this.userInfo = {
          userSchool, userCity, userImage, userNickname: decodeURI(userNickname)
        }
        wx.hideNavigationBarLoading()
      })
    },
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName'])
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    this.school = this.$store.state.school || '未知'
    UserInfo.selectClassAndSchool().then(res => {
      this.schoolArr = res.data
    })
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
      &:first-child {
        height: 63px;
        border-top: 0.5rpx solid #ececec;
      }
      div {
        display: flex;
        align-items: center;
        height: 100%;
        p {
          font: {
            size: 15px;
          }
          color: #4a4a4a;
        }

        picker {
          width: 70vw;
          height: 100%;
          p {
            line-height: 45px;
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
          color: #c7c7cc;
        }
      }
      h1 {
        font: {
          size: 16px;
        }
      }
      &:active {
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.05),
          rgba(0, 0, 0, 0.05)
        );
      }
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

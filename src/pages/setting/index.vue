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
          <p>{{ city }}</p>
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>
      <li class="setting-item">
        <h1>学校班级</h1>
        <div>
          <picker mode="multiSelector"
                  @cancel="bindcancel"
                  @change="bindMultiPickerChange"
                  @columnchange="bindMultiPickerColumnChange"
                  :value="multiIndex"
                  :range="multiArray">
            <p>{{school + ' ' + uclass}}</p>
          </picker>
          <span class="iconfont">&#xe71a;</span>
        </div>
      </li>

      <li class="setting-item"
          @click="handleEnterClick(index = 5)">
        <h1>学号</h1>
        <div>
          <p>{{ userSno || '未知' }}</p>
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
      multiIndex: [0, 0],
      multiArray: [],
      imgUrl: '',
      temp: [],
      schoolIndex: 0,
      schoolArr: [],
      school: '',
      userSchool: [],
      userGrad: [],
      userClass: [],
      userInfo: {},
      settingList: ['头像', '姓名', '地区', '学校']
    }
  },
  methods: {
    bindMultiPickerChange(e) {
      const value = e.mp.detail.value
      wx.showLoading({
        title: '保存中',
      })
      let schoolId;
      let classIdArr = [];
      this.schoolArr.forEach((item, index) => {
        if (item.schoolName === this.multiArray[0][value[0]]) {
          schoolId = item.schoolId
          classIdArr.push(item.classId)
        }
      })

      UserInfo.upDateUserBasicInfo({
        userId: this.$store.state.userId,
        schoolId,
        classId: classIdArr[value[1]]
      }).then((res) => {
        const school = this.multiArray[0][value[0]]
        this.school = school
        this.setUserInfo({ school, uclass: this.multiArray[1][value[1]] })
        wx.setStorageSync('multiIndexArr', value)
        wx.hideLoading()
      })

      this.multiIndex = value
    },
    bindcancel() {
      // this.multiIndex = this.multiIndexArr
      // console.log(this.multiIndex);
    },
    bindMultiPickerColumnChange(e) {
      const data = {
        multiArray: this.multiArray
      }
      this.multiIndex.splice(e.mp.detail.column, 1, e.mp.detail.value)
      if (e.mp.detail.column === 0) data.multiArray[1] = this.temp[e.mp.detail.value]
      this.multiArray.splice(1, 1, data.multiArray[1])
    },
    bindload() {
      wx.hideNavigationBarLoading()
    },
    changePickerCity(e) {
      const index = Number(e.mp.detail.value)
      this.cityIndex = index
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
            url: `/pages/setting-name/main?type=0&value=${this.userInfo.userNickname}&userKey=0`
          })
          break
        case 2:
          wx.navigateTo({ url: `/pages/setting-city/main?currentCity=${this.city}` })
          break
        case 3:
          wx.navigateTo({
            url: `/pages/setting-detail/main?value=${this.userInfo.userSchool}&userKey=0`
          })
          break
        case 5:
          wx.navigateTo({
            url: `/pages/setting-name/main?type=1&value=${this.userInfo.userNickname}&userKey=0`
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
    format(grade) {
      let _grade;
      switch (grade) {
        case 1:
          _grade = '一年级'
          break
        case 2:
          _grade = '二年级'
          break
        case 3:
          _grade = '三年级'
          break
        case 4:
          _grade = '四年级'
          break
        case 5:
          _grade = '五年级'
          break
        case 6:
          _grade = '六年级'
          break
        case 7:
          _grade = '初一'
          break
        case 8:
          _grade = '初二'
          break
        case 8:
          _grade = '初二'
          break
        case 9:
          _grade = '初三'
          break
        case 10:
          _grade = '高一'
          break
        case 11:
          _grade = '高二'
          break
        case 12:
          _grade = '高三'
          break
      }
      return _grade
    }
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName', 'userSno', 'uclass'])
  },
  onLoad(options) {
    // this.multiIndex = this.multiIndexArr
    this.multiArray[0] = []
    this.multiArray[1] = []
    wx.showNavigationBarLoading()
    this.school = this.$store.state.school || '未知'
    UserInfo.selectClassAndSchool().then(res => {
      this.schoolArr = res.data
      let tempMultiArray = []
      res.data.forEach((item, index) => {
        tempMultiArray.push(item.schoolName)
      })
      //去除重复学校
      this.multiArray[0] = [...new Set(tempMultiArray)]
      //筛选同一学校的班级
      this.multiArray[0].forEach((item, index) => {
        this.temp[index] = []
        res.data.forEach((_item, _index) => {
          if (_item.schoolName === this.multiArray[0][index])
            this.temp[index].push(`${this.format(_item.userGrad)}${_item.userClass}班`)
        })
      })
      // console.log(temp);
      this.multiArray[1] = this.temp[0]

    })
    this.getUserInfo()
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
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
          width: 60vw;
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

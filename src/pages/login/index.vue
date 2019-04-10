<template>
  <div class="login-container">
    <section>
      <img src="/static/images/body-report/book.png">
      <text class="name">动亿动体育</text>
    </section>
    <section>
      <p class="hint">请授权小程序以继续使用动亿动体育服务</p>
      <div class="button-login">
        <button open-type="getUserInfo"
                @getuserinfo="handleLogin"></button>
        微信授权登录</div>
    </section>
  </div>
</template>

<script>
import { UserInfo } from '@/api'
import { mapMutations, mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {
    ...mapMutations(['setUserInfo', 'setLoadState']),
    handleLogin() {
      wx.showLoading({
        title: '登录中',
      })
      this.login();
    },
    login() {
      wx.getUserInfo({
        withCredentials: true,
        lang: 'zh_CN',
        success: res => {
          let data = res.userInfo;
          wx.login({
            success: res => {
              let { avatarUrl, city, nickName, gender } = data
              UserInfo.login({
                code: res.code
              }).then(res => {
                const { openId, token, status, userId } = res.data
                this.setUserInfo({
                  userId,
                  openId,
                  token
                })
                if (status === 0) {
                  UserInfo.insertBasicUserInfo({
                    openId: res.data.openId,
                    userImage: avatarUrl,
                    userCity: city || '未知',
                    userNickname: encodeURI(nickName),
                  }).then(res => {
                    const { userId } = res.data
                    this.setUserInfo({
                      userId,
                      avatarUrl,
                      nickName,
                      city
                    })
                  })
                }
                wx.hideLoading()
                wx.switchTab({ url: `/pages/home/main` });
              })
            }
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 84px;
    height: 110px;
  }
  .name {
    margin-top: 20px;
    font-size: 18px;
    letter-spacing: 0.3em;
  }
  .hint {
    margin-bottom: 10px;
    font-size: 14px;
    color: #888;
  }
  .button-login {
    position: relative;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: #ffc83a;
    text-align: center;
    line-height: 40px;
    color: whitesmoke;
    button {
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
    &:active {
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
    }
  }
}
</style>

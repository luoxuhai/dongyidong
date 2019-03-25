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
                lang="zh-CN"
                @getuserinfo="handleLogin"></button>
        <span></span>
        微信授权登录</div>
    </section>
  </div>
</template>

<script>
import { login } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {
    }
  },
  onLoad() {
    // wx.switchTab({ url: `/pages/home/main` });
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleLogin() {
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            this.login();
          }
        }
      });
    },
    login() {
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          let data = res.userInfo;
          wx.login({
            success: res => {
              login({ code: res.code }).then(res => {
                console.log(res);
                this.setUserInfo({
                  userId: res.data.userId
                })
              }).catch(err => {
                console.error('errMsg:', err.message);
              })
              console.log('code: ', res.code);
            }
          });
        },
        fail: err => {
          console.error(err);
        }
      });
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
    color: #ffc83a;
  }
  .button-login {
    position: relative;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: #19be6b;
    text-align: center;
    line-height: 40px;
    color: whitesmoke;
    button {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}
</style>

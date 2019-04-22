<template>
  <div class="container">
    <ul class="option-container">
      <li v-if="!binding"
          class="current-number">
        <p class="title">当前手机号</p>
        <p class="number">{{ binded }}</p>
      </li>
      <li v-if="binding"
          class="phone-number">
        手机号
        <input type="number"
               placeholder="请输入手机号" />
      </li>
      <li v-if="binding"
          class="authcode">
        验证码
        <input type="number"
               placeholder="请输入验证码" />
        <div class="button-authcode">获取验证码</div>
      </li>
    </ul>
    <div class="button-submit"
         @click="handleSubmitClick">{{ binded ? '更改手机号' : '绑定手机号' }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      binded: false,
      binding: false,
      inputValue: '',
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleSubmitClick() {
      this.binding = true;

      // UserInfo.upDateUserBasicInfo({
      //   userId: this.$store.state.userId,
      //   userNickname: encodeURI(this.inputValue)
      // }).then((res) => {
      //   this.setUserInfo({
      //     nickName: this.inputValue
      //   })
      //   wx.hideLoading()
      //   wx.navigateBack({
      //     delta: 1
      //   });
      // })
    }
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName'])
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";
.container {
  height: 100vh;
  background-color: #f8f8f8;
}
.option-container {
  margin-bottom: 80px;
  .current-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 15px;
    border: 1px solid #f7f7f7, none, 1px solid #f7f7f7, none;
    background-color: #fff;
    .title {
      font: {
        size: 16px;
        weight: 600;
      }
    }
    .number {
      font-size: 15px;
      color: #4a4a4a;
    }
  }
  .phone-number,
  .authcode {
    height: 45px;
    @extend .current-number;
    font: {
      size: 17px;
      weight: 600;
    }
    input {
      flex: 1;
      margin-left: 13px;
      font-weight: 400;
    }
  }
  .authcode {
    .button-authcode {
      @include center;
      width: 80px;
      height: 30px;
      margin-left: 15px;
      background-color: #ffc83a;
      border-radius: 3px;
      font-size: 13px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="container">
    <ul class="option-container">
      <li v-if="!binding"
          class="current-number">
        <p class="title">当前手机号</p>
        <p class="number">{{ currenPhoneNumber || '无' }}</p>
      </li>
      <li v-if="binding"
          class="phone-number">
        手机号
        <input type="number" v-model="inputPhone"
               placeholder="请输入手机号" />
      </li>
      <li v-if="binding"
          class="authcode">
        验证码
        <input type="number"
               v-model="inputAuthcode"
               placeholder="请输入验证码" />
        <div class="button-authcode"
             @click="handleAuthcodeClick">{{ countDown > 0 ? countDown : '获取验证码' }}</div>
      </li>
    </ul>
    <div class="button-submit"
         @click="handleBinding">{{ (currenPhoneNumber && !binding) ? '更改手机号' : '绑定手机号' }}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { UserInfo } from '@/api'
import { getCountDown } from '@/libs/tools'
let phoneNumber = ''
export default {
  data() {
    return {
      countDown: null,
      binding: false,
      inputPhone: '',
      inputAuthcode: '',
      authcode: '',
      currenPhoneNumber: '',
      clearCountDown: false
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleBinding() {
      if (this.binding === false) {
        this.binding = true
        return
      }
      this.handleSubmitClick()
    },
    handleSubmitClick() {
      if (!(this.validatePhoneNumber(this.inputPhone) && this.validateAuthcode(this.inputAuthcode))) return
      UserInfo.insertPhone({
        userId: this.$store.state.userId,
        phone: phoneNumber
      }).then((res) => {
        this.binding = false
        this.clearCountDown = true
        this.setUserInfo({ phoneNumber })
        this.inputPhone = this.inputAuthcode = null
        wx.hideLoading()
      })
    },
    handleAuthcodeClick() {
      if (!this.validatePhoneNumber(this.inputPhone)) return
      phoneNumber = this.inputPhone
      UserInfo.auth({ phone: phoneNumber }).then(res => {
        if (res.code === 1) {
          this.validateAuthcode(void 0, true)
          return
        }
        this.authcode = res.data
        this.clearCountDown = false
        getCountDown(60, val => {
          if (this.clearCountDown) {
            this.countDown = null
            return
          }
          this.countDown = val
          if (val === 0) this.authcode = null
        })
      })
    },
    validatePhoneNumber(inputValue) {
      const re = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!re.test(inputValue))
        wx.showModal({
          title: '提示',
          content: '请输入正确的手机号码',
          showCancel: false
        })
      return re.test(inputValue)
    },
    validateAuthcode(inputAuthcode, often = false) {
      if (this.authcode === inputAuthcode && phoneNumber === this.inputPhone) return true
      else {
        wx.showModal({
          title: '提示',
          content: often ? '请输入正确的手机号码' : '验证码错误',
          showCancel: false
        })
        return false
      }
    },
    getUserPhoneNumber() {
      const storePhoneNumber = this.$store.state.phoneNumber
      if (storePhoneNumber) this.currenPhoneNumber = storePhoneNumber
      else
        UserInfo.selectPhone({ userId: this.$store.state.userId }).then(res => {
          this.currenPhoneNumber = res.data
        })
    }
  },
  onLoad() {
    this.getUserPhoneNumber()
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
    .button-authcode {
      @include center;
      width: 80px;
      height: 30px;
      margin-left: 15px;
      background-color: #ffc83a;
      border-radius: 3px;
      font: {
        size: 13px;
        weight: 400;
      }
      color: #fff;
      &:active {
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0.1)
        );
      }
    }
  }
}
</style>

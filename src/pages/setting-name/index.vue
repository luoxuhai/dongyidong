<template>
  <div class="container">
    <textarea auto-focus
              :placeholder="placeholder"
              :maxlength="20"
              :show-confirm-bar="false"
              v-model="inputValue"
              class="input"
              type="text" />
    <div class="button-submit" @click="validateInputValue">保存</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      placeholder: '输入要修改的姓名',
      inputValue: '',
      type: ''
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    validateInputValue() {
      if (this.inputValue.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        wx.showModal({
          title: '提示',
          content: type === '0' ? '昵称不能为空' : '学号不能为空',
          showCancel: false
        })
        return
      } else this.submitUptate()
    },
    submitUptate() {
      wx.showLoading({
        title: '保存中',
      })
      const data = {}
      if (this.type === '1') data.userSno = this.inputValue
      else data.userNickname = this.inputValue
      UserInfo.upDateUserBasicInfo({
        userId: this.$store.state.userId,
        ...data
      }).then((res) => {
        if (this.type === '0')
          this.setUserInfo({ nickName: this.inputValue })
        else this.setUserInfo({ userSno: this.inputValue })
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        });
      })
    }
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName', 'userSno'])
  },
  onLoad(options) {
    let title;
    this.type = options.type
    if (options.type === '0') title = '修改姓名'
    else {
      title = '修改学号'
      this.placeholder = '输入要修改的学号'
    }
    wx.setNavigationBarTitle({
      title
    })
    this.inputValue = options.type === '0' ? this.nickName : this.userSno
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding-top: 10px;
  background-color: #f8f8f8;
  box-sizing: border-box;
  .input {
    width: auto;
    height: 100px;
    margin: 0 10px 40px 10px;
    padding: 10px;
    background-color: #fff;
  }
  .button-submit {
    position: relative;
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

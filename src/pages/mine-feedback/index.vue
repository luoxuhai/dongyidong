<template>
  <div class="container">
    <textarea auto-focus
              placeholder="请输入反馈详情"
              :maxlength="400"
              :show-confirm-bar="false"
              v-model="inputValue"
              class="input"
              type="text" />
    <div class="button-submit" @click="handleSubmitClick">提交反馈</div>
  </div>
</template>

<script>
import { Feedback } from '@/api'
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    validateFeedback(inputValue) {
      const re = /.{1,}/;
      if (!re.test(inputValue))
        wx.showModal({
          title: '提示',
          content: '请输入反馈内容',
          showCancel: false
        })
      return re.test(inputValue)
    },
    handleSubmitClick() {
      if (!this.validateFeedback(this.inputValue)) return
      wx.showLoading({
        title: '反馈中',
      })
      Feedback.insertFeedBack({
        userId: this.$store.state.userId,
        feedback: this.inputValue
      }).then((res) => {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        });
      })
    }
  },
  onLoad() {
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
  .input {
    width: auto;
    height: 186px;
    margin-bottom: 45px;
    padding: 10px;
    background-color: #fff;
  }
}
</style>

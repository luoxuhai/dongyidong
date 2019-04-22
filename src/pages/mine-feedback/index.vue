<template>
  <div class="container">
    <textarea auto-focus
              placeholder="请输入反馈详情"
              :maxlength="20"
              :show-confirm-bar="false"
              v-model="inputValue"
              class="input"
              type="text" />
    <div class="button-submit" @click="handleSubmitClick">提交反馈</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleSubmitClick() {
      wx.showLoading({
        title: '保存中',
      })
      console.log(this.inputValue);
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

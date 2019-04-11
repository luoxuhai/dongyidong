<template>
  <div class="container">
    <textarea confirm-type="done"
              auto-focus
              placeholder="输入要修改的姓名"
              :maxlength="20"
              show-confirm-bar="false"
              v-model="inputValue"
              class="input"
              type="text" />
    <div class="button-submit" @click="handleSubmitClick">保存</div>
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
      UserInfo.upDateUserBasicInfo({
        userId: this.$store.state.userId,
        userNickname: encodeURI(this.inputValue)
      }).then((res) => {
        this.setUserInfo({
          nickName: this.inputValue
        })
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        });
      })
    }
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName'])
  },
  onLoad() {
    this.inputValue = this.nickName
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
  }
}
</style>

<template>
  <view class="mask" v-if="!userId" @click="handleToLogin"></view>
</template>

<script>
import { mapState } from "vuex";
  export default {
    methods: {
      handleToLogin() {
        wx.showModal({
          title: "提示",
          content: "登录后查看内容",
          showCancel: true,
          cancelColor: "#000000",
          confirmText: "登录",
          success: res => {
            if (res.confirm) {
              wx.reLaunch({ url: "/pages/login/main" });
            }
          }
        });
      }
    },
      computed: {
    ...mapState(["userId"])
  },
  };
</script>

<style lang='scss' scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <view class="mask" :style="{zIndex: !token ? 99999 : -99999}" @click="handleToLogin"></view>
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
    ...mapState(["token"])
  },
  };
</script>

<style lang='scss' scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <view class="mask" :style="{zIndex: isShow ? 99999 : -99999}" @click="handleToLogin"></view>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true
      };
    },

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
    onShow() {
      const token = wx.getStorageSync("token");
      if (token) this.isShow = false
    }
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

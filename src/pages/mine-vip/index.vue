<template>
  <div class="container">
    <ul class="vip-container">
      <li v-for="(item, index) of vips"
          :key="index">
        <img :src="item.imgUrl"
             mode="aspectFill">
      </li>
    </ul>
    <div class="button-submit"
         @click="handleSubmitClick">立即购买</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vips: [
        {
          imgUrl: '/static/images/my/vip-1.png'
        },
        {
          imgUrl: '/static/images/my/vip-2.png'
        },
        {
          imgUrl: '/static/images/my/vip-3.png'
        }
      ]
    }
  },
  methods: {
    handleSubmitClick() {
      wx.showModal({
        title: '提示',
        content: '会员功能暂未开放',
        showCancel: false
      })
    }
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
  padding-top: 28px;
  background-color: #fff;
}
.vip-container {
  width: min-content;
  margin: 0 auto 58px;
  & li + li {
    margin: 15px 0;
  }
  li {
    width: 315px;
    height: 110px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>

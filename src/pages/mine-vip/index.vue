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
import { mapState, mapMutations } from 'vuex'
import { UserInfo } from '@/api'
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
  background-color: #fff;
}
.vip-container {
  width: min-content;
  margin: 0 auto 70px;
  li {
    width: 315px;
    height: 110px;
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>

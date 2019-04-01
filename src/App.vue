<script>
import { mapMutations } from 'vuex';
export default {
  onLaunch() {
       wx.switchTab({ url: `/pages/home/main` });
    const token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({ url: `/pages/home/main` });
    }
    let state = this.$store.state
    Object.keys(state).forEach(key => {
      const value = wx.getStorageSync(key);
      if (value) state[key] = value;
    });
    this.setUserInfo(state)
  },
  methods: {
    ...mapMutations(['setUserInfo'])
  }
}
</script>

<style>
@font-face {
  font-family: "iconfont"; /* project id 1097190 */
  src: url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.eot");
  src: url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.woff") format("woff"),
    url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1097190_6ohnbxljslg.svg#iconfont") format("svg");
}

.iconfont {
  font-family: "iconfont", serif !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}
</style>

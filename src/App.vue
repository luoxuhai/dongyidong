<script>
import { mapMutations } from 'vuex';
import { UserInfo } from '@/api'
import { wx_login } from '@/libs/utils'
export default {
  onLaunch() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.redirectTo({ url: `/pages/login/main` });
    } else
      wx_login().then(res => {
        return res
      }).then(res => {
        UserInfo.login({ code: res.code })
          .then(res => {
            const { openId, token, status, userId } = res.data
            console.log(status);
            if (status === 0) wx.redirectTo({ url: `/pages/login/main` });
            this.setUserInfo({
              userId,
              openId,
              token,
              avatarUrl,
              nickName,
              city
            })
          })
      })
    let state = {
      userId: '',
      token: '',
      openId: ''
    }
    Object.keys(state).forEach(key => {
      const value = wx.getStorageSync(key);
      if (value) state[key] = value;
    });
    this.setUserInfo(state)
  },
  onShow() {
    const token = wx.getStorageSync('token');
    if (!token) wx.redirectTo({ url: `/pages/login/main` });
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setLoadState'])
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

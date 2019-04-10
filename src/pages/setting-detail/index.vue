<template>
  <div class="container">
    <textarea confirm-type="done"
              placeholder="搜索"
              :maxlength="20"
              v-model="inputValue"
              class="input"
              type="text" />
    <div class="button-submit">保存</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UserInfo } from '@/api'
export default {
  data() {
    return {
      inputValue: '',
      userInfo: {},
      settingList: ['头像', '姓名', '地区', '学校']
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['avatarUrl', 'city', 'nickName'])
  },
  onLoad(options) {
    // let { userNickname } = option s
    this.inputValue = options.value
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f8f8f8;
  .input {
    width: auto;
    height: 100px;
    margin: 10px 10px 20px 10px;
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

<template>
  <div class="container">
    <img mode="aspectFill"
         :src="imgUrl">
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: '/static/images/placeholder/nothing.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translateX(-50%);
  img {
    width: 60vw;
    height: 60vw;
  }
}
</style>

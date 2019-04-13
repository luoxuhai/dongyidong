<template>
  <div class="container">
    <img mode="aspectFill"
         src="/static/images/placeholder/nothing.png">
  </div>
</template>

<script>
export default {

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

<template>
  <div>
    <div class="teacher-detail">
      <div class="avatar">
        <img mode="aspectFill"
             src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
      </div>
      <div class="desc">
        <p class="name">龙芳</p>
        <p class="intro">“跟我一起跳起来”</p>
        <p class="syn">男，32岁，本科毕业于上海体育学院，研究生毕业于浙江大学。主讲公共体育课，主要承担篮球、无线电测向运动的教学工作。</p>
        <div class="tag">
          <div class="tag-item">短跑</div>
          <div class="tag-item">篮球</div>
          <div class="tag-item">体育老师</div>
          <div class="tag-item">篮球</div>
          <div class="tag-item">体育老师</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";
.teacher-detail {
  @include flex;
  margin: 0 20px;
  .avatar {
    @include flex(center, center);
    width: 82px;
    height: 82px;
    border: 1px solid #ffc83a;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 90%;
      height: 90%;
      border-radius: 50%;
    }
  }
  .desc {
    flex: 1;
    margin-left: 15px;
    .name {
      font-size: 16px;
      color: #1c2438;
    }
    .intro {
      margin: 15px 0 10px 0;
      font-size: 12px;
      color: #4a5060;
    }
    .syn {
      font-size: 12px;
      color: #80848f;
    }
    .tag {
      // @include flex(start, start, row, wrap);
      margin-top: 15px;
      .tag-item {
        display: inline-block;
        height: 20px;
        margin: 4px;
        padding: 0 9px;
        background-color: #ffcc3a;
        border-radius: 2px;
        font-size: 10px;
        line-height: 21px;
        text-align: center;
        color: #4a5060;
      }
    }
  }
}
</style>

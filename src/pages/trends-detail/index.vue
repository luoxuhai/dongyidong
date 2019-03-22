<template>
  <div>
    <img class="cover"
         mode="aspectFill"
         :src="detailContent.coverUrl">
    <h1 class="title">{{ detailContent.title }}</h1>
    <p class="browse-count">{{ detailContent.browseCount + '人浏览' }}</p>
    <text class="article"
          selectable
          decode
          space="nbsp"
          @click="handleShowButton">{{ detailContent.mainContent }}</text>
    <div class="collect-panel"
         :class="{show: buttonShow}">
      <div class="button-collect">加入收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      buttonShow: false,
      detailContent: {
        title: '中小学必须养成的健康饮食习惯',
        browseCount: 1566,
        coverUrl: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        mainContent: `坚持喝水，做到水杯不离身。水是生命之源。营养学家建议，每天要
      喝1500毫升左右的水。整日在办公室的人可以准备一个相同体积的容器，提醒自己每天
      完成喝水“任务”。经常外出的人可以自带水杯，现在很多公共场所都有饮水机，见到
      时不妨拿出水杯接一些喝；也可以带上瓶装水方便喝。此外，在不同的季节，还可以自
      己配点养生茶。比如，可以每天用两三个桂圆、三四片西洋参和十来颗枸杞泡水喝。
      多吃水果，颜色越深的水果，营养越高。 多吃水果对人们的身体健康有好处，这个
      就不用多说了。可是现在的水果五花八门，哪些吃了更有营养呢？一般来说，不同颜
      色的水果代表了不同的营养成分含量，比如，黄色水果中维生素B2的含量就较高。要
      均衡营养，各种颜色的水果都应该吃一些，每天选择三种颜色的水果摄入。在同类水果
      中，通常颜色越深的，营养素含量越高。 喝1500毫升左右的水。整日在办公室的人可以准备一个相同体积的容器，提醒自己每天
      完成喝水“任务”。经常外出的人可以自带水杯，现在很多公共场所都有饮水机，见到
      时不妨拿出水杯接一些喝；也可以带上瓶装水方便喝。此外，在不同的季节，还可以自
      己配点养生茶。比如，可以每天用两三个桂圆、三四片西洋参和十来颗枸杞泡水喝。
      多吃水果，颜色越深的水果，营养越高。 多吃水果对人们的身体健康有好处，这个
      就不用多说了。可是现在的水果五花八门，哪些吃了更有营养呢？一般来说，不同颜
      色的水果代表了不同的营养成分含量，比如，黄色水果中维生素B2的含量就较高。要
      均衡营养，各种颜色的水果都应该吃一些，每天选择三种颜色的水果摄入。在同类水果
      中，通常颜色越深的，营养素含量越高。 喝1500毫升左右的水。整日在办公室的人可以准备一个相同体积的容器，提醒自己每天
      完成喝水“任务”。经常外出的人可以自带水杯，现在很多公共场所都有饮水机，见到
      时不妨拿出水杯接一些喝；也可以带上瓶装水方便喝。此外，在不同的季节，还可以自
      己配点养生茶。比如，可以每天用两三个桂圆、三四片西洋参和十来颗枸杞泡水喝。
      多吃水果，颜色越深的水果，营养越高。 多吃水果对人们的身体健康有好处，这个
      就不用多说了。可是现在的水果五花八门，哪些吃了更有营养呢？一般来说，不同颜
      色的水果代表了不同的营养成分含量，比如，黄色水果中维生素B2的含量就较高。要
      均衡营养，各种颜色的水果都应该吃一些，每天选择三种颜色的水果摄入。在同类水果
      中，通常颜色越深的，营养素含量越高。 喝1500毫升左右的水。整日在办公室的人可以准备一个相同体积的容器，提醒自己每天
      完成喝水“任务”。经常外出的人可以自带水杯，现在很多公共场所都有饮水机，见到
      时不妨拿出水杯接一些喝；也可以带上瓶装水方便喝。此外，在不同的季节，还可以自
      己配点养生茶。比如，可以每天用两三个桂圆、三四片西洋参和十来颗枸杞泡水喝。
      多吃水果，颜色越深的水果，营养越高。 多吃水果对人们的身体健康有好处，这个
      就不用多说了。可是现在的水果五花八门，哪些吃了更有营养呢？一般来说，不同颜
      色的水果代表了不同的营养成分含量，比如，黄色水果中维生素B2的含量就较高。要
      均衡营养，各种颜色的水果都应该吃一些，每天选择三种颜色的水果摄入。在同类水果
      中，通常颜色越深的，营养素含量越高。`
      }
    }
  },
  methods: {
    handleShowButton() {
      this.buttonShow = !this.buttonShow;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "static/styles/common.scss";
.cover {
  width: 100vw;
  height: 125px;
}
.title {
  margin: 15px 15px 10px 15px;
  @include ellipsis(3);
  font-size: 17px;
  color: #1c2438;
}
.browse-count {
  margin: 0 0 20px 15px;
  font-size: 10px;
  color: #80848f;
}
.article {
  display: block;
  width: 333px;
  margin: 0 auto;
  padding-bottom: 20px;
  font-size: 14px;
  color: #4a5060;
}
.collect-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  transform: translateY(120px);
  transition: all 0.2s ease-out;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  .button-collect {
    width: 263px;
    height: 38px;
    border-radius: 24px;
    background-color: #ffc83a;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    color: #fff;
  }
  &.show {
    transform: translateY(0);
  }
}
</style>

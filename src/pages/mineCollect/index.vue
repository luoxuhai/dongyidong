<template>
  <div class="collect-container">
    <ul class="header">
      <li class="navbar-item"
          @click="handleItem(index)"
          v-for="(item, index) of navbarList"
          :key="index"
          :class="{select: index === selectIndex}">{{item}}
      </li>
    </ul>
    <course-list v-if="selectIndex === 0"
                 :data="courseList" />
    <info-list v-if="selectIndex === 1"
               :data="infoList" />
    <loading-more :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import CourseList from '@/components/course-list'
import InfoList from '@/components/info-list'
import LoadingMore from '@/components/loading-more'
export default {
  components: {
    CourseList,
    InfoList,
    LoadingMore
  },
  data() {
    return {
      loading: true,
      infoList: [
        {
          con: '如何成功逆转，做到以全新面貌迎接新赛季的挑战',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          num: 1450
        },
        {
          con: '如何成功逆转，做到以全新面貌迎接新赛季的挑战',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          num: 1450
        },
        {
          con: '如何成功逆转，做到以全新面貌迎接新赛季的挑战',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          num: 1450
        },
        {
          con: '如何成功逆转，做到以全新面貌迎接新赛季的挑战',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          num: 1450
        },
      ],
      courseList: [
        {
          interval: '12:45',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          title: '10分钟教会你6种上篮动作',
          num: 1453
        },
        {
          interval: '12:45',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          title: '10分钟教会你6种上篮动作',
          num: 1453
        },
        {
          interval: '12:45',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          title: '10分钟教会你6种上篮动作',
          num: 1453
        },
        {
          interval: '12:45',
          url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          title: '10分钟教会你6种上篮动作',
          num: 1453
        }

      ],
      selectIndex: 0,
      navbarList: ["收藏", "质讯"]
    };
  },

  methods: {
    handleItem(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.collect-container {
  padding: 0 15px;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 375px;
  height: 40px;
  margin-bottom: 10px;
  .navbar-item {
    width: 30px;
    height: 42px;
    line-height: 42px;
    font-size: 15px;
    text-align: center;
    color: #303030;
    &.select {
      border-bottom: 2px solid #ffc83a;
      color: #ffc83a;
    }
  }
}
</style>

<template>
  <div>
    <div class="teacher-container">
      <div class="teacher-item"
           v-for="(item, index) of teacherList"
           :key="index"
           @click="selectItem(item.teacherId)">
        <div class="avatar">
          <img mode="aspectFill"
               :src="item.teacherUrl">
        </div>
        <p class="name">{{ item.teacherName }}</p>
        <p class="intro">{{ item.teacherSlogan }}</p>
      </div>
    </div>
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing"
                  :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import { TrainingTeacher } from '@/api'
import { pagingLoadingMixin } from '@/common/js/mixin'
import LoadingMore from '@/components/loading-more'
export default {
  mixins: [pagingLoadingMixin],
  components: {
    LoadingMore,
    PlaceholderImg
  },
  name: "",
  data() {
    return {
      loading: true,
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      teacherList: []
    }
  },
  methods: {
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false
        return false
      } else this.loading = true
      let data = {
        pageNum: this.currentPage
      }
      TrainingTeacher.teacherList(data).then(res => {
        const { pages, size, records, total } = res.data
        if (records.length === 0) this.nothing = true
        else this.nothing = false
        if (this.currentPage >= pages) this.loading = false
        if (reachBottom) this.teacherList = [...this.teacherList, ...records]
        else this.teacherList = [...records]
        this.totalPage = pages || 1
        this.pageSize = size
        this.currentPage += 1
        wx.stopPullDownRefresh()
      })
    },
    selectItem(teacherId) {
      wx.navigateTo({
        url: `../course-teacher-detail/main?teacherId=${teacherId}`
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

.teacher-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 50px 0 50px;
  .teacher-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 120px;
    height: 150px;
    margin-bottom: 20px;
    .avatar {
      @include center;
      width: 82px;
      height: 82px;
      border: 1px solid #ffc83a;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background-color: #f7f7f7;
      }
    }
    .name {
      margin: 10px 0 4px 0;
      font-size: 15px;
      color: #1c2438;
      @include ellipsis(1);
    }
    .intro {
      font-size: 12px;
      @include ellipsis(2);
      color: #80848f;
    }
  }
  &::after {
    content: "";
    width: 120px;
  }
}
</style>

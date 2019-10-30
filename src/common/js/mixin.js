import { Course } from '@/api';
import { transitionTime } from '@/libs/tools';
export const selectItemMixin = {
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: [],
    },
  },
  methods: {
    selectItem(e) {
      const index = e.currentTarget.dataset.index;
      this.$emit('select', index);
    },
  },
};

export const pagingLoadingMixin = {
  onPullDownRefresh() {
    this.currentPage = 1;
    this.loadMore();
  },
  onReachBottom() {
    this.loadMore(true);
  },
  onLoad() {
    // wx.showNavigationBarLoading();
    this.loadMore();
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
};

export const bannerNavigateMixin = {
  methods: {
    handleBannerClick(carouselShowType, carouselShowId) {
      let pageUrl = '';
      if (carouselShowType === 0) {
        pageUrl = `/pages/course-detail/main?courseId=${carouselShowId}`;
      } else pageUrl = `/pages/trends-detail/main?messageId=${carouselShowId}`;
      wx.navigateTo({ url: pageUrl });
    },
  },
};

export const trainMixin = {
  data() {
    return {
      nothing: false,
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      loading: true,
      title: '全部训练',
      trainList: [],
    };
  },
  methods: {
    selectTrain(courseId) {
      wx.navigateTo({
        url: `/pages/course-detail/main?courseId=${courseId}`,
      });
    },
    loadMore(reachBottom = false) {
      if (this.currentPage > this.totalPage) {
        this.loading = false;
        return false;
      } else this.loading = true;
      Course.userCourseList({
        pageNum: this.currentPage,
        userId: this.$store.state.userId,
      })
        .then(res => {
          const { pages, size, records, total } = res.data;
          if (records.length === 0) this.nothing = true;
          else this.nothing = false;
          records.forEach((item, index) => {
            const courseTolTime = records[index].courseTolTime;
            records[index].courseTolTime = transitionTime(courseTolTime);
          });
          if (reachBottom) this.trainList = [...this.trainList, ...records];
          else this.trainList = [...records];
          this.totalPage = pages || 1;
          this.pageSize = size;
          this.currentPage += 1;
          if (this.currentPage > this.totalPage) {
            this.loading = false;
            return false;
          } else this.loading = true;
        })
        .catch(err => {
          this.nothing = true;
        })
        .finally(() => {
          wx.stopPullDownRefresh();
        });
    },
  },
  onShow() {
    this.currentPage = 1;
    this.loadMore();
  },
};

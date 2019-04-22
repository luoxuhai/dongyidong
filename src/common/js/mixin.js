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

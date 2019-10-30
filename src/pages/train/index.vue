<template>
  <div class="container-train">
    <train-list :title="title" :data="trainList" @select="selectTrain" />
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing" :loading="loading" size="22" />
    <mask />
  </div>
</template>
<script>
import PlaceholderImg from "@/components/placeholder-img";
import TrainList from "@/components/train-list";
import LoadingMore from "@/components/loading-more";
import mask from "@/components/mask";
import { trainMixin, pagingLoadingMixin } from "@/common/js/mixin";
export default {
  mixins: [trainMixin, pagingLoadingMixin],
  components: {
    TrainList,
    LoadingMore,
    PlaceholderImg,
    mask
  },
};
</script>

<template>
  <div class="my-train">
    <train-list :title="title"
                :data="trainList"
                @select="selectTrain" />
    <placeholder-img v-if="nothing" />
    <loading-more v-if="!nothing"
                  :loading="loading"
                  size="22" />
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import TrainList from "@/components/train-list"
import LoadingMore from "@/components/loading-more"
import { trainMixin, pagingLoadingMixin } from '@/common/js/mixin'
import { Course } from '@/api'
export default {
  name: "my-train",
  mixins: [trainMixin,pagingLoadingMixin],

  components: {
    TrainList,
    LoadingMore,
    PlaceholderImg
  }
}
</script>

<style scoped lang="scss">
.my-train {
  padding: 0 15px;
}
</style>

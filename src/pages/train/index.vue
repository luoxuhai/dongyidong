<template>
    <div class="container-train">
        <train-list :title="title"
                    :data="drillList"/>
        <loading-more :loading="loading"
                      size="22"/>
    </div>
</template>
<script>
    import TrainList from "@/components/train-list"
    import LoadingMore from "@/components/loading-more"

    export default {
        components: {
            TrainList,
            LoadingMore
        },
        data() {
            return {
                loading: true,
                title: "全部训练",
                drillList: [
                    {
                        title: "10分钟教会你6种上篮动作",
                        interval: "10:02",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        title: "10分钟教会你6种上篮动作",
                        interval: "10:02",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        title: "10分钟教会你6种上篮动作",
                        interval: "10:02",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        title: "10分钟教会你6种上篮动作",
                        interval: "10:02",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "static/styles/common.scss";

    .container-train {
        padding: 0 15px;

        .title {
            height: 24px;
            padding-left: 7px;
            border-left: 5px solid #ffc83a;
            font-size: 18px;
            color: #4a4a4a;
        }
    }
</style>

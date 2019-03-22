<template>
    <div class="container-train">
        <train-list :title="title"
                    :data="trainList"/>
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
                currentPage: 1,
                totalPage: 1,
                loading: true,
                title: "全部训练",
                trainList: [
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
        },
        methods: {
            loadMore(currentPage = 1) {
                if (this.currentPage > this.totalPage) {
                    this.loading = false
                    return false
                } else  this.loading = true
                
                //let data = {
                    // currentPage,
                    // token
                //}
            // api.then(res => {
            //         this.trainList = [...this.trainList, ...res.data]
            //         this.totalPage = res.totalPage
            //         this.currentPage += 1
            //          wx.stopPullDownRefresh()
            // })
            }
        },
        onPullDownRefresh() {
            this.currentPage = 1
            this.loadMore()
        },
        onReachBottom() {
            this.loadMore()
        },
        onLoad() {
            this.loadMore()
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

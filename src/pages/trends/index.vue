<template>
    <div class="container-trends">
        <ul class="navbar">
            <li class="navbar-item"
                :class="{active: activeIndex === index}"
                v-for="(item, index) of navbarList"
                :key="index"
                @click="handleItem(index)">{{ item }}
            </li>
        </ul>
        <info-list :data="trainList"
                   @select="handleEnterDetail"/>
        <loading-more :loading="loading"
                      size="22"/>
    </div>
</template>

<script>
    import InfoList from "@/components/info-list"
    import LoadingMore from "@/components/loading-more"

    export default {
        components: {
            InfoList,
            LoadingMore
        },
        name: "trends",
        data() {
            return {
                loading: true,
                trainList: [
                    {
                        con: "10分钟教会你6种上篮动作",
                        num: "4258",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        con: "10分钟教会你6种上篮动作",
                        num: "4258",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        con: "10分钟教会你6种上篮动作",
                        num: "4258",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    },
                    {
                        con: "10分钟教会你6种上篮动作",
                        num: "4258",
                        url: "http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
                    }
                ],
                activeIndex: 0,
                navbarList: ["全部", "技术训练", "营养饮食", "体育保健"]
            }
        },
        methods: {
            handleEnterDetail(index) {
                wx.navigateTo({
                    url: `/pages/trends-detail/main?id=${index}`
                })
            },
            handleItem(index) {
                this.activeIndex = index
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "static/styles/common.scss";

    .container-trends {
        padding: 0 15px;

        .navbar {
            @include flex(space-around, center);
            height: 42px;
            margin-bottom: 10px;
            background-color: #fff;

            .navbar-item {
                box-sizing: border-box;
                height: 100%;
                line-height: 42px;
                font-size: 15px;
                color: #303030;

                &.active {
                    border-bottom: 2px solid #ffc83a;
                    color: #ffc83a;
                }
            }
        }
    }
</style>

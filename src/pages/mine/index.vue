<template>
    <div class="container">
        <div class="header">
            <div class="header-user">
                <img class="header-user-img"
                     mode="aspectFill"
                     src="../../../static/images/course/teacher.png" alt="">
                <div class="header-text">
                    <text class="text-user-name">谭敏仪</text>
                    <text class="text-address">北京</text>
                    <text class="text-school">第一小学</text>
                </div>
            </div>
            <div class="function">
                <div class="function-text">我的足迹</div>
                <div class="function-images">
                    <div class="function-images-text"
                         v-for="(item, index) of List"
                         :key="index"
                         @click="handleEnterDetail(index)">
                        <img class="function-image"
                             :src="item.img" alt="">
                        <text class="function-text-one">{{item.text}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                List: [
                    {
                        img: "/static/images/我的/收藏.png",
                        text: "收藏"
                    },
                    {
                        img: "/static/images/我的/帮助.png",
                        text: "帮助反馈"
                    },
                    {
                        img: "/static/images/我的/收藏.png",
                        text: "设置"
                    }
                ]
            }
        },
        methods: {
            handleEnterDetail(index) {
                wx.navigateTo({
                    url: `/pages/mineCollect/main`
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        background-color: #f8f8f8;
    }

    .header {
        display: flex;
        flex-direction: column;
        position: relative;

        .header-user {
            display: flex;
            flex-direction: row;
            width: 375px;
            height: 128px;
            background-color: #ffc83a;

            .header-user-img {
                width: 70px;
                height: 70px;
                margin: 13px 16px 0 16px;
                border-radius: 50%;
            }

            .header-text {
                display: flex;
                flex-direction: column;
                margin-top: 19px;

                .text-user-name {
                    font-size: 16px;
                    color: #fff;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                }

                .text-address {
                    margin-top: 12px;
                    font-size: 12px;
                    color: #fff;
                }

                .text-school {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }

        .function {
            display: flex;
            flex-direction: column;
            position: absolute;
            width: 345px;
            height: 103px;
            margin: 98px 15px auto 15px;
            border-radius: 6px;
            background-color: #fff;

            .function-text {
                margin: 13px 0 0 12px;
                font-size: 17px;
                font-weight: 500;
                color: #4a4a4a;
            }

            .function-images {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 0 46px;

                .function-images-text {
                    display: flex;
                    flex-direction: column;
                    margin-top: 12px;

                    .function-image {
                        width: 22px;
                        height: 22px;
                        margin: auto;
                    }

                    .function-text-one {
                        margin-top: 10px;
                        font-size: 10px;
                        color: #4a4a4a;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

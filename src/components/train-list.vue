<template>
    <div class="train-list">
        <h4>{{title}}</h4>
        <ul>
            <li v-for="(item, index) in data" :key="index" :data-index="index" @click="selectItem">
                <div class="train-pic">
                    <img :src="item.url" alt="">
                    <span>{{item.interval}}</span>
                </div>
                <div class="train-con">
                    <p>{{item.title}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { selectItemMixin } from "@/common/js/mixin"

    export default {
        name: "train-list",
        mixins: [selectItemMixin]
    }
</script>

<style scoped lang="scss">
    .train-list {
        margin-top: 28px;

        h4 {
            text-indent: 7px;
            font-size: 17px;
            border-left: 5px solid #FFC83A;
        }

        ul {
            padding-top: 10px;

            li {
                display: flex;
                justify-content: space-between;

                & + li {
                    margin-top: 16px;
                }

                .train-pic {
                    width: 150px;
                    height: 85px;
                    border-radius: 6px;
                    overflow: hidden;
                    position: relative;
                    margin-right: 9px;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    span {
                        position: absolute;
                        left: 7px;
                        bottom: 7px;
                        height: 11px;
                        font-size: 9px;
                        padding: 1px 3px;
                        color: #fff;
                        background-color: rgba(137, 137, 137, 0.5);
                    }
                }

                .train-con {
                    flex: 1;

                    p {
                        width: 100%;
                        text-align: left;
                        color: #1C2438;
                        font-size: 15px;
                    }
                }
            }
        }
    }
</style>

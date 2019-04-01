<template>
    <div class="hot-info">
        <h4>{{title}}</h4>
        <ul>
            <li v-for="(item, index) in data" :key="index" :data-index="item.messageId" @click="selectItem">
                <div class="info-pic">
                    <img :src="item.messageUrl" lazy-load mode="aspectFill">
                    <span>{{item.messageNum}}人浏览</span>
                </div>
                <p>{{item.messageTitle}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { selectItemMixin } from "@/common/js/mixin"

    export default {
        name: "info-list",
        mixins: [selectItemMixin]
    }
</script>

<style scoped lang="scss">
    .hot-info {

        h4 {
            text-indent: 7px;
            font-size: 17px;
            border-left: 5px solid #FFC83A;
        }

        ul {
            margin-top: 9px;

            li {
                & + li {
                    margin-top: 21px;
                }

                .info-pic {
                    width: 100%;
                    height: 115px;
                    border-radius: 6px;
                    overflow: hidden;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    span {
                        position: absolute;
                        top: 7px;
                        right: 6px;
                        font-size: 10px;
                        color: #fff;
                    }
                }

                p {
                    margin-top: 9px;
                    font-size: 15px;
                    color: #1C2438;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>

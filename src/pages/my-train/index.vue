<template>
    <div class="my-train">
        <scroll-view>
            <train-list
                    :title="trainTitle"
                    :data="trainData"
                    @select="selectTrain"
            ></train-list>
        </scroll-view>
    </div>
</template>

<script>
    import TrainList from "@/components/train-list"

    export default {
        name: "my-train",
        data() {
            return {
                trainTitle: "全部训练",
                trainData: [
                    {
                        title: "10分钟教会你6种上篮动作",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02"
                    },
                    {
                        title: "篮球过人技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02"
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02"
                    }
                ]
            }
        },
        methods: {
            selectTrain(index) {
                console.log(index)
            }
        },
        components: {
            TrainList
        }
    }
</script>

<style scoped lang="scss">
    .my-train {
        padding: 0 15px;
    }
</style>

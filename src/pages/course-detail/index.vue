<template>
    <div class="course-detail">
        <scroll-view>
            <div class="video-wrap">
                <img src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" alt="">
                <span>10:02</span>
                <!--<i class="iconfont">&#xe609;</i>-->
            </div>
            <div class="con-wrap">
                <h4>长跑的技巧基础教学</h4>
                <p>1432人正在学习</p>
                <div class="icon-wrap">
                    <img src="../../../static/images/course/collect2.png" alt="">
                    <span>收藏</span>
                </div>
            </div>
            <div class="switch">
                <div @click="switchHandle" :class="stitchIndex === 1 ? 'active' : ''" class="left" data-i="1">介绍</div>
                <div @click="switchHandle" :class="stitchIndex === 2 ? 'active' : ''" class="right" data-i="2">动作</div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    export default {
        name: "course-detail",
        data() {
            return {
                stitchIndex: 1
            }
        },
        methods: {
            switchHandle(e) {
                const i = e.currentTarget.dataset.i
                this.stitchIndex = parseInt(i)
            }
        }
    }
</script>

<style scoped lang="scss">
    .course-detail {
        .video-wrap {
            height: 211px;
            position: relative;

            span {
                position: absolute;
                left: 15px;
                bottom: 15px;
                padding: 1px 3px;
                font-size: 9px;
                background-color: rgba(137, 137, 137, 0.5);
                color: #fff
            }

            img {
                display: block;
                width: 100%;
                height: 100%;
            }

            i.iconfont {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: auto;
                width: 60px;
                height: 60px;
                opacity: .5;
            }
        }

        .con-wrap {
            padding: 13px 15px 14px;
            border-bottom: 5px solid rgba(248, 248, 248, 1);
            position: relative;

            h4 {
                font-size: 15px;
                color: rgba(28, 36, 56, 1);
            }

            p {
                margin-top: 12px;
                font-size: 10px;
                color: rgba(128, 132, 143, 1);
            }

            .icon-wrap {
                position: absolute;
                height: 16px;
                line-height: 16px;
                right: 12px;
                bottom: 12px;
                color: rgba(255, 200, 58, 1);

                img {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin-right: 4px;
                }

                span {
                    display: inline-block;
                    height: 16px;
                    font-size: 10px;
                    vertical-align: top;
                }
            }
        }

        .switch {
            height: 42px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid rgba(238, 238, 238, 1);

            div {
                box-sizing: border-box;
                text-align: center;
                width: 64px;
                line-height: 42px;
                border-bottom: 3px solid transparent;

                &.active {
                    color: rgba(255, 200, 58, 1);
                    border-bottom: 3px solid rgba(255, 200, 58, 1);
                }
            }
        }
    }
</style>

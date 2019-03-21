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
            <div class="introduce" v-show="stitchIndex === 1">
                <div class="text">
                    <h4>简介</h4>
                    <p>后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点。</p>
                </div>
                <div class="text">
                    <h4>预期目标</h4>
                    <p>后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的兼顾专业和非专业的设计人员。</p>
                </div>
                <div class="text">
                    <h4>相关标准</h4>
                    <p>后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的兼顾专业和非专业的设计人员。</p>
                </div>
            </div>
            <div class="action" v-show="stitchIndex === 2">
                <div class="step">
                    <div>1</div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" alt="">
                    </div>
                    <div>
                        <h4>准备动作</h4>
                        <p>练习时间：10分钟</p>
                    </div>
                </div>
                <div class="step">
                    <div>2</div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" alt="">
                    </div>
                    <div>
                        <h4>左手扶住球的左边，左手大拇指与右手大拇指</h4>
                        <p>练习时间：10分钟</p>
                    </div>
                </div>
                <div class="step">
                    <div>3</div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" alt="">
                    </div>
                    <div>
                        <h4>将球举起在头的上方，两只手要成一个倒V</h4>
                        <p>练习时间：10分钟</p>
                    </div>
                </div>
            </div>
        </scroll-view>
        <div class="bottom-tips">加入训练计划</div>
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
        scroll-view {
            padding-bottom: 62px;

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

            .introduce {
                padding: 14px 15px 15px 15px;


                .text {
                    & + .text {
                        margin-top: 16px;
                    }

                    h4 {
                        font-size: 14px;
                        color: rgba(74, 74, 74, 1);
                    }

                    p {
                        margin-top: 7px;
                        font-size: 12px;
                        color: rgba(155, 155, 155, 1);
                    }
                }
            }

            .action {
                padding-top: 21px;

                .step {
                    display: flex;
                    justify-content: space-around;

                    & + .step {
                        margin-top: 15px;
                    }

                    div:nth-child(1) {
                        line-height: 62px;
                        font-size: 13pt;
                        margin-left: 22px;
                        margin-right: 13px;
                        color: rgba(74, 74, 74, 1);
                    }

                    div:nth-child(2) {
                        width: 110px;
                        height: 62px;
                        border-radius: 5px;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    div:nth-child(3) {
                        width: 193px;

                        h4 {
                            font-size: 13px;
                            color: rgba(74, 74, 74, 1);
                            width: 100%;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                            -webkit-line-clamp: 2; /** 显示的行数 **/
                            overflow: hidden; /** 隐藏超出的内容 **/
                        }

                        p {
                            margin-top: 9px;
                            color: rgba(155, 155, 155, 1);
                            font-size: 11px;
                        }
                    }
                }
            }
        }

        .bottom-tips {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 47px;
            line-height: 47px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            background-color: rgba(255, 200, 58, 1);
        }
    }
</style>

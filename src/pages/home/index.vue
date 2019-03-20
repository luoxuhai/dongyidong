<template>
    <div class="home">
        <scroll-view class="home-con" :scrollY="scrollY">
            <div class="weather">
                <div class="weather-left">
                    <p class="local">天津 <span>滨海新区</span></p>
                    <p>PM2.5 <span>μg/m3</span></p>
                    <p>空气污染很高</p>
                </div>
                <div class="weather-right">
                    <p><i class="iconfont">&#xe631;</i>10℃</p>
                    <h2>132</h2>
                </div>
            </div>
            <div class="slider">
                <swiper
                        indicator-dots="indicatorDots"
                        autoplay="autoplay"
                        interval="interval"
                        duration="duration"
                        circular="circular"
                >
                    <block v-for="(item, index) in imgUrls" :key="index">
                        <swiper-item>
                            <image :src="item" class="slide-image" width="100%" height="100%"></image>
                        </swiper-item>
                    </block>
                </swiper>
            </div>
            <div class="nav">
                <div class="train" @click="myTrainLink">
                    <img src="../../../static/images/home-train.png" alt="">
                    <span>我的训练</span>
                </div>
                <div class="collect">
                    <img src="../../../static/images/home-collect.png" alt="">
                    <span>我的收藏</span>
                </div>
                <div class="report">
                    <img src="../../../static/images/home-report.png" alt="">
                    <span>体质报告</span>
                </div>
            </div>
            <div class="course-wrap">
                <course-list :title="courseTitle" :data="courseData" @select="selectCourse"></course-list>
            </div>
            <div class="info-wrap">
                <info-list :title="infoTitle" :data="infoData" @select="selectInfo"></info-list>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    import CourseList from '@/components/course-list'
    import InfoList from '@/components/info-list'

    export default {
        name: "home",
        data() {
            return {
                // 滚动视图组件配置
                scrollY: true,

                // 轮播组件数据
                imgUrls: [
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
                ],
                indicatorDots: false,
                autoplay: false,
                interval: 5000,
                duration: 500,
                circular: false,

                // 课程组件数据
                courseTitle: '热门课程',
                courseData: [
                    {
                        title: '长跑的技巧基础教学',
                        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                        interval: '10:02',
                        num: 1465
                    },
                    {
                        title: '长跑的技巧基础教学',
                        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                        interval: '10:02',
                        num: 1465
                    },
                    {
                        title: '长跑的技巧基础教学',
                        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                        interval: '10:02',
                        num: 1465
                    }
                ],

                // 资讯组件数据
                infoTitle: '热门资讯',
                infoData: [
                    {
                        con: '如何成功逆转，做到以全新面貌迎接新赛季的',
                        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                        num: 1453
                    },
                    {
                        con: '如何成功逆转，做到以全新面貌迎接新赛季的',
                        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                        num: 1453
                    }
                ]
            }
        },
        methods: {
            myTrainLink() {
                wx.navigateTo({
                    url: '../my-train/main'
                })
            },
            selectCourse(index) {
                console.log(index)
            },
            selectInfo(index) {
                console.log(index)
            }
        },
        components: {
            CourseList,
            InfoList
        }
    }
</script>

<style scoped lang="scss">
    .home {
        padding: 0 15px;

        .home-con {
            padding-bottom: 10px;

            .weather {
                display: flex;
                justify-content: space-between;

                .weather-left {

                    p.local {
                        font-size: 17px;
                        color: #1C2438;
                        margin-bottom: 12px;

                        span {
                            font-size: 14px;
                            display: inline-block;
                            margin-left: 8px;
                        }
                    }

                    p {
                        font-size: 12px;
                        color: #4A4A4A;
                        margin-bottom: 8px;

                        span {
                            font-size: 11px;
                            color: #9B9B9B;
                            display: inline-block;
                            margin-left: 12px;
                        }
                    }
                }

                .weather-right {
                    color: #1C2438;

                    p {
                        font-size: 17px;
                        margin-top: 4px;
                        margin-bottom: 11px;
                        text-align: right;

                        i {
                            display: inline-block;
                            color: #000;
                            font-size: 16px;
                            margin-right: 10px;
                        }
                    }

                    h2 {
                        font-size: 35px;
                        line-height: 35px;
                        border-right: 5px solid #CF1322;
                        padding-right: 9px;
                    }
                }
            }

            .slider {
                height: 115px;
                border-radius: 6px;
                overflow: hidden;
                margin-top: 10px;
                margin-bottom: 15px;

                swiper {
                    width: 100%;
                    height: 100%;

                    .slide-image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .nav {
                display: flex;
                height: 100px;
                justify-content: space-between;

                .train, .collect, .report {
                    width: 203px;
                    height: 100%;
                    position: relative;
                    border-radius: 5px;
                    margin-right: 4px;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    span {
                        position: absolute;
                        width: 64px;
                        height: 23px;
                        top: 14px;
                        left: 13px;
                        font-size: 16px;
                        color: #fff;
                    }
                }

                .collect, .report {
                    width: 67px;
                    margin-right: 4px;

                    span {
                        width: 28px;
                        height: 32px;
                        top: 18px;
                        left: 10px;
                        font-size: 14px;
                    }
                }

                .report {
                    margin-right: 0;
                }
            }

            .course-wrap, .info-wrap {
                margin-top: 28px;
            }

        }

    }
</style>

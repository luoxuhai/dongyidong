<template>
    <div class="course">
        <scroll-view>
            <swiper
                    :indicator-dots="indicatorDots"
                    :autoplay="autoplay"
                    :interval="interval"
                    :duration="duration"
                    :circular="circular"
            >
                <block v-for="(item, index) in imgUrls" :key="index">
                    <swiper-item>
                        <img :src="item" class="slide-image" alt="">
                    </swiper-item>
                </block>
            </swiper>
            <div class="nav">
                <div class="nav-item" @click="courseSecLink">
                    <img src="../../../static/images/course/course.png" alt="" width="90" height="90">
                    <p>课程</p>
                </div>
                <div class="nav-item">
                    <img src="../../../static/images/course/plan.png" alt="" width="90" height="90">
                    <p>计划</p>
                </div>
                <div class="nav-item">
                    <img src="../../../static/images/course/info.png" alt="" width="90" height="90">
                    <p>资讯</p>
                </div>
                <div class="nav-item" @click="courseTeacherLink">
                    <img src="../../../static/images/course/teacher.png" alt="" width="90" height="90">
                    <p>名师</p>
                </div>
            </div>
            <div class="course-wrap">
                <course-list
                        :title="courseTitle"
                        :data="courseData"
                        @select="selectCourse"
                ></course-list>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    import CourseList from "@/components/course-list"

    export default {
        name: "course",
        data() {
            return {
                // 轮播组件数据
                imgUrls: [
                    "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                    "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
                    "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
                ],
                indicatorDots: true,
                autoplay: true,
                interval: 3000,
                duration: 300,
                circular: true,

                // 课程数据
                courseTitle: '推荐课程',
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

            }
        },
        methods: {
            selectCourse(index) {
                console.log(index)
                wx.navigateTo({
                    url: '../course-detail/main'
                })
            },
            courseSecLink() {
                wx.navigateTo({
                    url: '../course-sec/main'
                })
            },
            courseTeacherLink () {
                wx.navigateTo({
                    url: '../course-teacher/main'
                })
            }
        },
        components: {
            CourseList
        }
    }
</script>

<style scoped lang="scss">
    .course {
        padding: 12px 15px 15px 15px;

        swiper {
            width: 100%;
            height: 194px;
            border-radius: 2px;

            img.slide-image {
                width: 100%;
                height: 100%;
            }
        }

        .nav {
            height: 105px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .nav-item {
                width: 45px;

                img {
                    width: 45px;
                    height: 45px;
                }

                p {
                    text-align: center;
                    font-size: 11px;
                    color: #4A4A4A;
                }
            }
        }
    }
</style>

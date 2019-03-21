<template>
    <div class="course-sec">
        <scroll-view>
            <course-list :data="courseData" @select="selectCourse"></course-list>
        </scroll-view>
    </div>
</template>

<script>
    import CourseList from "@/components/course-list"

    export default {
        name: "course-sec",
        data() {
            return {
                courseData: [
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    },
                    {
                        title: "长跑的技巧基础教学",
                        url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                        interval: "10:02",
                        num: 1465
                    }
                ]
            }
        },
        methods: {
            selectCourse(index) {
                console.log(index)
            }
        },
        components: {
            CourseList
        }
    }
</script>

<style scoped lang="scss">
    .course-sec {
        padding: 15px;
    }
</style>

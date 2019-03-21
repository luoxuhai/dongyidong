<template>
    <div class="teacher-container">
        <div class="teacher-item">
            <div class="avatar">
                <img mode="aspectFill"
                     src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
            </div>
            <p class="name">邱秀兰</p>
            <p class="intro">“体育老师，擅长长跑”</p>
        </div>
        <div class="teacher-item">
            <div class="avatar">
                <img mode="aspectFill"
                     src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
            </div>
            <p class="name">邱秀兰</p>
            <p class="intro">“体育老师，擅长长跑”</p>
        </div>
        <div class="teacher-item">
            <div class="avatar">
                <img mode="aspectFill"
                     src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
            </div>
            <p class="name">邱秀兰</p>
            <p class="intro">“体育老师，擅长长跑”</p>
        </div>
        <div class="teacher-item">
            <div class="avatar">
                <img mode="aspectFill"
                     src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
            </div>
            <p class="name">邱秀兰</p>
            <p class="intro">“体育老师，擅长长跑”</p>
        </div>
        <div class="teacher-item">
            <div class="avatar">
                <img mode="aspectFill"
                     src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425832846,3875149543&fm=26&gp=0.jpg">
            </div>
            <p class="name">邱秀兰</p>
            <p class="intro">“体育老师，擅长长跑”</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import "static/styles/common.scss";

    .teacher-container {
        @include flex(space-between, start, row, wrap);
        padding: 20px 50px 0 50px;

        .teacher-item {
            @include flex(start, center, column);
            width: 120px;
            height: 150px;
            margin-bottom: 20px;

            .avatar {
                @include flex(center, center);
                width: 82px;
                height: 82px;
                border: 1px solid #ffc83a;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 90%;
                    height: 90%;
                    border-radius: 50%;
                }
            }

            .name {
                margin: 10px 0 4px 0;
                font-size: 15px;
                color: #1c2438;
            }

            .intro {
                font-size: 12px;
                @include ellipsis(2);
                color: #80848f;
            }
        }

        &::after {
            content: "";
            width: 120px;
        }
    }
</style>

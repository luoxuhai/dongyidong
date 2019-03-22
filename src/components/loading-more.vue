<template>
    <div class="class load-more"
         :class="[loading ? '' : 'load-more-line']">
        <div class="load-more-loading"
             v-if="loading"
             :style="{width: size + 'px', height: size + 'px'}"></div>
        <div class="load-more-tip">
            <div v-if="loading"></div>
            <div v-else>{{tip}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                default: 24
            },
            loading: {
                type: Boolean,
                default: true
            },
            tip: {
                type: String,
                default: "你踩到我的底线了!"
            }
        }
    }
</script>

<style scoped>
    .load-more {
        margin: 10 rpx auto;
        line-height: 4em;
        font-size: 14px;
        text-align: center;
    }

    .load-more-loading {
        display: inline-block;
        vertical-align: middle;
        background: 0 0;
        border-radius: 50%;
        border: 4px solid #e9eaec;
        border-color: #e9eaec #e9eaec #e9eaec #f66c35;
        animation: btn-spin 0.6s linear;
        animation-iteration-count: infinite;
    }

    .load-more-tip {
        display: inline-block;
        vertical-align: middle;
        height: 90 rpx;
        line-height: 110 rpx;
        color: #495060;
    }

    .load-more-line {
        border-top: 1px solid #dddee1;
        display: flex;
        border-top: 0;
    }

    .load-more-line::before {
        position: relative;
        top: 15px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        content: "";
        border-top: 1px solid #dddee1;
    }

    .load-more-line::after {
        position: relative;
        top: 15px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        content: "";
        border-top: 1px solid #dddee1;
    }

    .load-more-line .load-more-tip {
        position: relative;
        top: -0.9em;
        padding: 0 0.55em;
    }

    .load-more-empty {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #e5e5e5;
        display: inline-block;
        position: relative;
        vertical-align: 0;
        top: -0.16em;
    }

    @keyframes btn-spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

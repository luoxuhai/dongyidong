<template>
    <div class="body-report">
        <scroll-view>
            <div class="report-head">
                <img src="../../../static/images/body-report/book.png" alt="">
                <div class="head-con">
                    <h3>姓名：<span>朱大大</span></h3>
                    <p>评价：良好</p>
                    <p>性别：女 <i>|</i> 年龄：14</p>
                    <p>测试时间：2018年12月2日</p>
                </div>
            </div>
            <div class="rating">
                <ul>
                    <li>
                        <h3>64</h3>
                        <p>综合评分</p>
                    </li>
                    <li>
                        <h3>16</h3>
                        <p>班级排名</p>
                    </li>
                    <li>
                        <h3>230</h3>
                        <p>年级排名</p>
                    </li>
                </ul>
            </div>
            <div class="body-details">
                <div class="body-base">
                    <div class="base-wrap">
                        <ul>
                            <li>评价：微瘦</li>
                            <li>身高：175cm</li>
                            <li>体重：55kg</li>
                        </ul>
                        <div class="body-line">
                            <img src="../../../static/images/body-report/line.png" alt="">
                            <img src="../../../static/images/body-report/line.png" alt="">
                            <img src="../../../static/images/body-report/line.png" alt="">
                        </div>
                        <div class="body-pic">
                            <img src="../../../static/images/body-report/person.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="info-table">
                    <div class="table-row">
                        <span>项目</span>
                        <span><i>有待提高</i><i>良好</i><i>优秀</i></span>
                        <span>合格范围</span>
                        <span>成绩</span>
                    </div>
                    <div class="table-row">
                        <span>仰卧起坐</span>
                        <span><i>60</i><i>70</i><i>80</i></span>
                        <span>60-100</span>
                        <span>78</span>
                    </div>
                    <div class="table-row">
                        <span>仰卧起坐</span>
                        <span><i>60</i><i>70</i><i>80</i></span>
                        <span>60-100</span>
                        <span>78</span>
                    </div>
                    <div class="table-row">
                        <span>仰卧起坐</span>
                        <span><i>60</i><i>70</i><i>80</i></span>
                        <span>60-100</span>
                        <span>78</span>
                    </div>
                    <div class="table-row">
                        <span>仰卧起坐</span>
                        <span><i>60</i><i>70</i><i>80</i></span>
                        <span>60-100</span>
                        <span>78</span>
                    </div>
                </div>
            </div>
            <div class="empty"></div>
            <div class="text">
                <h3>成绩评估</h3>
                <p> 后台产品线迅速推广，对接多条业务线，覆盖系统 800
                    个以上。兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。</p>
            </div>
            <div class="empty"></div>
            <div class="text">
                <h3>专家建议</h3>
                <p> 后台产品线迅速推广，对接多条业务线，覆盖系统 800
                    个以上。兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。</p>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    export default {
        name: "body-report",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .body-report {
        .report-head {
            height: 146px;
            position: relative;
            padding-top: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid #DDDEE1;

            img {
                position: absolute;
                width: 84px;
                height: 110px;
                top: 21px;
                left: 35px;
            }

            .head-con {
                margin-left: 140px;
                color: #80848F;

                h3 {
                    font-size: 15px;

                    span {
                        color: #1C2438;
                    }
                }

                p {
                    font-size: 11px;
                    margin-top: 6px;

                    &:last-child {
                        font-size: 10px;
                    }

                    i {
                        display: inline-block;
                        margin: 0 2px;
                    }
                }
            }
        }

        .rating {
            width: 100%;
            height: 80px;
            border-bottom: 1px solid #DDDEE1;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                align-items: center;

                li {
                    width: 30%;
                    text-align: center;

                    h3 {
                        font-size: 20px;
                        color: #FFC83A;
                        margin-bottom: 2px;
                    }

                    p {
                        font-size: 11px;
                        color: #4A5060;
                    }
                }
            }

        }

        .body-details {
            .body-base {
                width: 100%;
                height: 178px;
                position: relative;

                .base-wrap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    width: 270px;
                    height: 133px;
                    display: flex;
                    justify-content: space-between;
                    align-content: center;

                    ul {
                        width: 95px;
                        padding-top: 20px;
                        color: #4A5060;
                        font-size: 14px;
                        display: flex;
                        flex-flow: column wrap;
                        align-content: space-between;

                        li + li {
                            margin-top: 15px;
                        }
                    }

                    .body-line {
                        width: 85px;
                        padding-top: 26px;

                        img {
                            display: block;
                            width: 100%;
                            height: 6px;

                            & + img {
                                margin-top: 31px;
                            }
                        }
                    }

                    .body-pic {
                        width: 70px;
                        text-align: center;

                        img {
                            width: 90px;
                            height: 150px;
                        }
                    }
                }
            }

            .info-table {
                .table-row {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    display: flex;
                    text-align: center;
                    border-bottom: 1px solid #ccc;

                    span {
                        display: inline-block;

                        &:nth-child(1) {
                            width: 86px;
                            color: #4A5060;
                            font-size: 10px;
                        }

                        &:nth-child(2) {
                            width: 165px;
                            color: #4A5060;
                            font-size: 8px;
                            display: flex;
                            justify-content: space-around;
                            flex-flow: row nowrap;

                            i {
                                display: inline-block;
                            }
                        }

                        &:nth-child(3) {
                            width: 70px;
                            color: #4A5060;
                            font-size: 8px;
                        }

                        &:nth-child(4) {
                            width: 55px;
                            color: #4A5060;
                            font-size: 10px;
                        }
                    }

                    &:first-child {
                        border-bottom: 0;

                        span {
                            &:nth-child(1) {
                                background-color: #ECECEC;
                            }

                            &:nth-child(2) {
                                background: linear-gradient(to right, rgba(255, 230, 108, 0.13), #FFC120);
                            }

                            &:nth-child(3) {
                                background-color: #FFC120;
                            }

                            &:nth-child(4) {
                                background-color: #ECECEC;
                            }
                        }
                    }
                }

                .body-pic {
                    width: 43px;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .empty {
            height: 5px;
            background-color: #F8F8F9;
        }

        .text {
            padding: 15px 21px 21px 21px;

            &:last-child {
                padding-bottom: 40px;
            }

            h3 {
                color: #1C2438;
                font-size: 14px;
            }

            p {
                margin-top: 15px;
                color: #80848F;
                font-size: 12px;
                text-indent: 2em;
            }
        }
    }

</style>

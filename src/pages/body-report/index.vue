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
            </div>
        </scroll-view>
    </div>
</template>

<script>
    export default {
        name: "body-report"
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

        .body-base {
            width: 100%;
            height: 177px;
            position: relative;
            border-bottom: 1px solid #ccc;

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
    }

</style>

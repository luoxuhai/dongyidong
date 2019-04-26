<template>
  <div class="body-report">
    <scroll-view v-if="!nothing"
                 :style="{opacity}">
      <div class="report-head">
        <img src="/static/images/body-report/book.png"
             mode="aspectFill">
        <div class="head-con">
          <h3>姓名：<span>{{ nickName }}</span></h3>
          <p>评价：{{ info.testAssess }}</p>
          <p>性别：{{ info.testSex === 0 ? '男' : '女' }} <i>|</i> 年龄：{{ info.testAge }}</p>
          <p>测试时间：{{ info.testTime }}</p>
        </div>
      </div>
      <div class="rating">
        <ul>
          <li>
            <h3>{{ info.testScore }}</h3>
            <p>综合评分</p>
          </li>
          <li>
            <h3>{{ info.testRanking }}</h3>
            <p>班级排名</p>
          </li>
          <li>
            <h3>{{ info.testGradeRanking }}</h3>
            <p>年级排名</p>
          </li>
        </ul>
      </div>
      <div class="body-details">
        <div class="body-base">
          <div class="base-wrap">
            <ul>
              <li>评价：{{ info.testEvaluate }}</li>
              <li>身高：{{ info.testHeight }}cm</li>
              <li>体重：{{ info.testWeight }}kg</li>
            </ul>
            <div class="body-line">
              <img src="/static/images/body-report/line.png">
              <img src="/static/images/body-report/line.png">
              <img src="/static/images/body-report/line.png">
            </div>
            <div class="body-pic">
              <img src="/static/images/body-report/person.png">
            </div>
          </div>
        </div>
        <div class="info-table">
          <div class="table-header">
            <span>项目</span>
            <span><i>有待提高</i><i>良好</i><i>优秀</i></span>
            <span>合格范围</span>
            <span>成绩</span>
          </div>
          <div class="table-row"
               v-for="(item, index) of projects"
               :key="index">
            <span>{{ item.name }}</span>
            <span>
              <i>{{ item.baseScore }}</i>
              <i>{{ item.midScore }}</i>
              <i>{{ item.valueScore }}</i>
              <i>{{ item.maxScore }}</i>
            </span>
            <span>{{ item.baseScore + '-' + item.maxScore }}</span>
            <span>{{ item.score }}</span>
          </div>
        </div>
      </div>
      <div class="empty"></div>
      <div class="text">
        <h3>成绩评估</h3>
        <p> {{ info.expectSuggess || '未知' }}</p>
      </div>
      <div class="empty"></div>
      <div class="text">
        <h3>专家建议</h3>
        <p>{{ info.testGradeAssess || '未知' }}</p>
      </div>
    </scroll-view>
    <placeholder-img v-if="nothing"
                     imgUrl="/static/images/placeholder/body-report.png" />
  </div>
</template>

<script>
import PlaceholderImg from "@/components/placeholder-img"
import { UserInfo } from '@/api'
import { mapState } from 'vuex'
export default {
  name: "body-report",
  components: {
    PlaceholderImg
  },
  data() {
    return {
      opacity: 0,
      nothing: false,
      info: {},
      testInfo: {},
      projects: []
    }
  },
  computed: {
    ...mapState(['nickName'])
  },
  onLoad() {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    UserInfo.selectTest({
      userId: this.$store.state.userId
    }).then((res => {
      
      let info = res.data
      this.info = info
      let { list } = res.data
      if (list) {
        this.opacity = 1
      } else {
        this.nothing = true
        return
      }
      let tempProjects = list.filter((item) => (item.name !== null))
      const BASE_VALUE = 10
      let index = 0
      for (let value of tempProjects) {
        if (value.name === '50米跑' || value.name === '坐位体前屈' || value.name === '50*8') {
          tempProjects[index].baseScore = (value.baseScore / BASE_VALUE).toFixed(1) == 0.0 ? 0 : (value.baseScore / BASE_VALUE).toFixed(1)
          tempProjects[index].valueScore = (value.valueScore / BASE_VALUE).toFixed(1)
          tempProjects[index].maxScore = (value.maxScore / BASE_VALUE).toFixed(1)
          tempProjects[index].midScore = (value.midScore / BASE_VALUE).toFixed(1)
          tempProjects[index].score = (value.score / BASE_VALUE).toFixed(1)
        }
        index += 1
      }
      this.projects = tempProjects
    })).catch((err) => {
      this.networkError()
    }).finally(() => {
      wx.hideLoading()
    })
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
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
    border-bottom: 1px solid #ececec;

    img {
      position: absolute;
      width: 84px;
      height: 110px;
      top: 21px;
      left: 35px;
    }

    .head-con {
      margin-left: 140px;
      color: #80848f;

      h3 {
        font-size: 15px;

        span {
          color: #1c2438;
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
          color: #cccccc;
          margin: 0 2px;
        }
      }
    }
  }

  .rating {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #ececec;

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
          color: #ffc83a;
          margin-bottom: 2px;
        }

        p {
          font-size: 11px;
          color: #4a5060;
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
        height: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul {
          width: 95px;
          height: 100%;
          color: #4a5060;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          li + li {
            height: 14px;
            line-height: 14px;
            // margin-top: 15px;
          }
        }
        .body-line {
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          width: 85px;
          height: 100%;
          img {
            display: block;
            width: 100%;
            height: 6px;
            & + img {
              //   margin-top: 26px;
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
      .table-header {
        @extend .table-row;
        height: 20px !important;
        line-height: 20px !important;
        span {
          font-size: 10px !important;
          color: #4a5060 !important;
          i {
            font-size: 10px !important;
            color: #4a5060 !important;
          }
        }
      }
      .table-row {
        height: 45px;
        line-height: 45px;
        display: flex;
        text-align: center;
        border-bottom: 1rpx solid #ececec;

        span {
          display: inline-block;
          color: #1c2438;

          &:nth-child(1) {
            width: 86px;
            font-size: 12px;
          }

          &:nth-child(2) {
            width: 165px;
            font-size: 10px;
            display: flex;
            justify-content: space-around;
            flex-flow: row nowrap;
            i {
              display: inline-block;
              color: #cccccc;
            }
          }

          &:nth-child(3) {
            width: 70px;
            font-size: 12px;
          }

          &:nth-child(4) {
            width: 55px;
            color: #ffc83a;
            font: {
              size: 14px;
              weight: 600;
            }
          }
        }

        &:first-child {
          border-bottom: 0;

          span {
            &:nth-child(1) {
              background-color: #ececec;
            }

            &:nth-child(2) {
              background: linear-gradient(
                to right,
                rgba(255, 230, 108, 0.13),
                #ffc120
              );
            }

            &:nth-child(3) {
              background-color: #ffc120;
            }

            &:nth-child(4) {
              background-color: #ececec;
            }
          }
        }
      }
    }
  }

  .empty {
    height: 5px;
    background-color: #f8f8f9;
  }

  .text {
    padding: 15px 21px 21px 21px;

    &:last-child {
      padding-bottom: 40px;
    }

    h3 {
      color: #1c2438;
      font-size: 14px;
    }

    p {
      margin-top: 15px;
      color: #80848f;
      font-size: 12px;
      text-indent: 2em;
    }
  }
}
</style>

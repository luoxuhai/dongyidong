<template>
  <div class="hot-course">
    <h4 v-if="title">{{title}}</h4>
    <ul>
      <li v-for="(item, index) in data"
          :key="index"
          :data-index="item.courseId"
          @click="selectItem">
        <div class="course-pic">
          <img :src="item.courseImage"
               lazy-load
               mode="aspectFill">
          <span>{{item.courseTolTime}}</span>
        </div>
        <div class="course-con">
          <h5>{{item.courseTitle}}</h5>
          <p>{{item.courseNum}}人正在学习</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { selectItemMixin } from "@/common/js/mixin"
import { transitionTime } from "@/libs/tools"

export default {
  name: "course-list",
  mixins: [selectItemMixin]
}

</script>

<style scoped lang="scss">
.hot-course {
  h4 {
    text-indent: 7px;
    font-size: 17px;
    border-left: 5px solid #ffc83a;
  }

  ul {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 9px;

    li {
      width: 168px;
      margin-bottom: 15px;

      &:last-child,
      &:nth-last-child(2) {
        margin-bottom: 0;
      }

      .course-pic {
        width: 168px;
        height: 95px;
        border-radius: 6px;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        span {
          position: absolute;
          left: 7px;
          bottom: 7px;
          height: 11px;
          font-size: 9px;
          padding: 1px 3px;
          color: #fff;
          background-color: rgba(137, 137, 137, 0.5);
        }
      }

      .course-con {
        font-size: 13px;

        h5 {
          margin-top: 6px;
          margin-bottom: 5px;
        }

        p {
          color: #80848f;
          font-size: 10px;
        }
      }
    }
  }
}
</style>

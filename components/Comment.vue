<template>
  <div>
    <div v-if="!commentList.length" style="text-align:center; color:#999">还没有人评论呢～</div>
    <ul id="replyCont">
      <li v-for="item in commentList" :key="item.id">
        <div class="img">
          <a>
            <img :src="item.user.avatar" />
          </a>
        </div>
        <div class="readCom">
          <p class="name">
            <a>{{item.user.name}}</a>
            <span>{{item.created_at}}</span>
            <!-- <span class="goods">
              100
              <i class="layui-icon layui-icon-news-good"></i>
            </span> -->
          </p>
          <p class="txt">{{item.content}}</p>
          <!-- <a class="reply" href="javascript:;">回复</a> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { dateFormat } from "../utils/index";
dateFormat();
export default {
  name: "commentList",
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    articlesDetailsFn: function(id) {
      this.$router.push({ path: `/details/${id}` });
    }
  }
};
</script>


<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  float: left;
}

.avatar img {
  width: 100%;
}

.textarea {
  padding-left: 50px;
  padding-bottom: 50px;
  margin-top: 20px;
}

.comment-button {
  padding: 6px 12px;
  font-size: 15px;
  letter-spacing: 2px;
  float: right;
  margin-top: 10px;
}

.comment-item {
  overflow: hidden;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}

.comment-item .avatar {
  margin-right: 14px;
}

.comment-item .avatar img {
  float: left;
  width: 100%;
}

.comment-item h1 {
  float: left;
  color: #009a61;
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
}

.comment-item span {
  float: left;
  color: #666;
  font-size: 13px;
  line-height: 18px;
}

.comment-item-con {
  padding-top: 46px;
  padding-left: 50px;
  padding-right: 30px;
  margin-bottom: 30px;
}

.comment-item-con p {
  color: #333;
  font-size: 14px;
  text-align: left;
}

.comment-item-con i {
  font-style: normal;
  color: #287156;
  font-size: 14px;
}

.children-comment {
  padding-right: 60px;
  margin-top: 14px;
}

.children-comment-wrapper {
  position: relative;
  top: -10px;
}

.children-comment-wrapper i {
  position: absolute;
  top: 10px;
  right: 4px;
  display: inline-block;
  cursor: pointer;
}
.removecomment {
  position: absolute;
  top: 10px;
  right: 4px;
  display: inline-block;
  cursor: pointer;
  right: 48px !important;
  font-style: normal;
  color: #287156;
  font-size: 14px;
}
.comment-item-sub .removecomment {
  right: 15px !important;
}
.comment-item-sub {
  overflow: hidden;
  margin-top: 4px;
  padding: 10px 20px 10px 20px;
  background-color: #fafafa;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 50px;
  position: relative;
}

.comment-item-sub p {
  padding-top: 30px;
  padding-left: 40px;
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
  font-size: 13px;
  color: #666;
}

.comment-item-sub .avatar {
  width: 30px;
  height: 30px;
}

.ok-style {
  padding: 8px;
  position: absolute;
  right: 0px;
  top: 16px;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(10%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInRight {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(10%, 0, 0);
  }
}

.fadeOutRight {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
  animation-name: fadeOutRight;
}
</style>

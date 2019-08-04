<template>
  <div class="layui-col-md8 index-list">
    <div class="date">{{date}}</div>
    <div v-if="!flashArticleList.length" style="text-align:center; color:#999">还没有快讯呢～</div>
    <ul class="newsList">
      <li v-for="item in flashArticleList" :key="item.id">
        <div class="txt" style="width:100%">
          <span
            style="display: block;color: #27292e;font-size: 18px;line-height: 24px;font-weight: bold"
          >{{item.title}}</span>
          <div class="label">
            {{item.user.name}}
            <b>{{item.created_at}}</b>
          </div>
          <p style="color:#6c7179;line-height:26px;">{{item.content}}</p>
          <div class="flash-picture">
            <a>
              <i
                class="el-icon-picture-outline"
                style="font-size:24px;color:#999"
                @click="goDetail(item.id)"
              ></i>
            </a>
          </div>
          <div id="qrCode" style="float:right">
            <canvas
              :id="item.id"
              style="display:none;opacity: 0.9;z-index: 999;position: absolute;right:30px"
            ></canvas>
          </div>
          <div id="weixin-icon" style="float:right">
            <a>
              <i
                class="layui-icon layui-icon-news-wechat"
                @mouseenter="useqrcode(item.id)"
                @mouseleave="deleteQrcode(item.id)"
              ></i>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { dateFormat } from "../utils/index";
import axios from "~/plugins/axios";
import QRCode from "qrcode";
import Vue from "vue";


dateFormat();
export default {
  name: "FlashArticleList",
  props: {
    date: {
      type: String,
      default: () => ""
    },
    flashArticleList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    QRCode
  },
  data() {
    return {
      dialogVisible: false,
      title: "",
      content: "",
      imgUrl: "",
      created_at: "",
      hidden: ""
    };
  },
  mounted() {},
  methods: {
    useqrcode(id) {
      document.getElementById(id).style.display = "block";
      var canvas = document.getElementById(id);
      QRCode.toCanvas(
        canvas,
        process.env.homeUrl + `/flashnews/${id}`,
        function(error) {
          if (error) console.error(error);
          document.getElementById(id).style.display = "block";
        }
      );
    },
    deleteQrcode(id) {
      document.getElementById(id).style.display = "none";
    },
    showDialog(id) {
      this.dialogVisible = true;
      axios.get(`/api/flash/show/${id}`).then(res => {
        this.title = res.data.data.title;
        this.content = res.data.data.content;
        this.created_at = res.data.data.updated_at.substring(0, 10);
      });
    },
    goDetail(id) {
      this.$router.push(`/flashnews/${id}`)
    }
  }
};
</script>

<style scoped>
.date {
  font-weight: 600;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  background-color: #4b4f8c;
  color: #fff;
}
.poster {
  float: left;
  width: 30px;
  height: 30px;
  margin-top: 1px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 3px 2px 4px rgba(36, 61, 107, 0.2);
}
.poster img {
  width: 100%;
  position: relative;
  top: -12%;
}
.hidden {
  display: none;
}
</style>

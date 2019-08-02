<template>
  <div>
    <div style="text-align:center;margin-top:40px;">
      <p v-html="showStatus"></p>
      <i class="el-icon-loading" :class="show" ></i>
    </div>
    <div
      class="layui-container"
      style="background:#f1efef;margin-top:20px;padding-bottom:10px"
      ref="imageWrapper"
    >
      <img :src="imgUrl" width="100%" />
      <div class="layui-row layui-col-space40" :class="hidden">
        <div class="layui-col-sm12">
          <div v-if="data" class="flash-news" style="background: #fff;">
            <div>
              <img src="@/assets/banner.png" width="100%" style="margin-bottom:20px" />
              <p class="banner-title">快讯</p>
              <!-- <p class="banner-name">{{data.user.name}}</p> -->
              <p class="banner-time">{{data.updated_at}}</p>
            </div>
            <div class="detail-cont">
              <h1
                style="font-size: 16px;color: #000;margin-bottom: 10px;line-height: 30px;text-align:center;font-weight: bold;padding:0px 30px"
              >{{data.title}}</h1>
              <div
                style="font-size: 16px;color: #333;line-height: 30px;padding:10px 30px"
                v-html="data.content"
              ></div>
            </div>
            <div style="background:#f1efef">
              <div style="text-align:center;padding-top:30px">
                <img src="@/assets/qcode.jpeg" width="100px" />
              </div>
              <div style="text-align:center;margin-top:5px;color:#4d4f8a;font-size:12px">
                <span>长按识别二维码关注公众号</span>
              </div>
            </div>
          </div>
          <div style="text-align:center" v-else>你找的快讯不存在～</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../utils/index";
import marked from "marked";
import axios from "~/plugins/axios";
import highlight from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";

highlight.registerLanguage("javascript", javascript);
highlight.registerLanguage("css", css);
highlight.registerLanguage("php", php);
highlight.registerLanguage("python", python);
highlight.registerLanguage("sql", sql);
highlight.registerLanguage("bash", bash);

import "../../assets/hybrid.css";

export default {
  async asyncData({ params, error }) {
    try {
      const { id } = params;
      const {
        data: { data }
      } = await axios.get("/api/flash/show/" + id);
      return {
        data: data
      };

      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code, lang) {
          return highlight.highlightAuto(code).value;
        }
      });
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  name: "NewsFlashdetails",
  data() {
    return {
      user: [],
      hidden: "",
      imgUrl: "",
      show: "",
      showStatus: "正在生成图片"
    };
  },
  head() {
    if (this.data) {
      return {
        title: this.data.title,
        meta: [
          {
            name: "viewport",
            content: "width=device-width,initial-scale=1.0,user-scalable=no"
          },
          {
            hid: "description",
            name: this.data.title,
            content: `${this.data.content}`
          },
          { name: "keywords", content: this.data.title }
        ]
      };
    }
    return {};
  },
  created() {},
  mounted() {
    this.getUserInfo(this.$route.params.id);
    this.toImage();
  },
  methods: {
    toImage() {
      this.hidden = "";
      this.imgUrl = "";
      this.timer = setTimeout(() => {
        //设置延迟执行
        var html2canvas = require("html2canvas");
        html2canvas(this.$refs.imageWrapper, {
          backgroundColor: null
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.imgUrl = dataURL;
          this.hidden = "hidden";
        });
      }, 1500);
      this.showStatus = "<span style='color:#24b904'>图片已生成，长按保存图片</span>";
      this.timer = setTimeout(() => {
        this.show = "hidden";
      }, 1000);
    },
    getUserInfo(id) {
      axios.get(`/api/userInfo/${id}`).then(respone => {
        if (respone.data && respone.data.code === 0) {
          this.user = respone.data.user;
        }
      });
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>



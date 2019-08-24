<template>
  <div class="layui-container news-detail">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div id="qrCode">
      <canvas
        :id="data.id"
        style="display:none;opacity: 0.9;z-index: 999;position: absolute;left:70px"
      ></canvas>
    </div>
    <div class="layui-row layui-col-space40">
      <div class="layui-col-sm8">
        <div class="detail-main">
          <ul id="detail-handel">
            <!-- <li class="weibo">
              <a href="javascript:;">
                <i class="layui-icon layui-icon-news-weibo"></i>
              </a>
            </li>-->
            <li class="wechat">
              <a href>
                <i
                  class="layui-icon layui-icon-news-wechat"
                  @mouseenter="useqrcode(data.id)"
                  @mouseleave="deleteQrcode(data.id)"
                ></i>
              </a>
            </li>
            <!-- <li class="space">
              <a href="javascript:;">
                <i class="layui-icon layui-icon-news-space"></i>
              </a>
            </li>-->
            <li class="num">
              <a @click="toComment()">
                <i class="layui-icon layui-icon-news-review2"></i>
                <span>{{author.comments}}</span>
              </a>
            </li>
            <li class="collect num">
              <a @click="like(data.id)">
                <i class="layui-icon layui-icon-news-collect" v-if="!liked"></i>
                <i class="layui-icon layui-icon-news-collect" v-else style="color:red"></i>
                <span>{{data.likes}}</span>
              </a>
            </li>
          </ul>
          <div class="detail-cont">
            <h1>{{data.title}}</h1>
            <div class="newsClass">
              <span>{{data.category.name}}</span>
              {{data.user.name}}
              <b>{{data.created_at}}</b>
              <i>浏览 {{data.views}}</i>
              <i>评论 {{author.comments}}</i>
            </div>
            <div class="detail-body" v-html="data.content"></div>
          </div>
          <div class="detail-label">
            <i class="el-icon-price-tag"></i>
            <el-tag
              v-for="item in data.tags"
              :key="item.key"
              type="info"
              effect="dark"
              class="news-tag"
            >{{ item }}</el-tag>
          </div>
          <div class="detail-comment">
            <p>
              全部评论
              <span>{{author.comments}}</span>
            </p>
            <div class="addComment layui-form">
              <div class="img" v-if="userinfo">
                <span>
                  <img :src="userinfo.avatar" />
                </span>
              </div>
              <div class="content">
                <textarea placeholder="评论前请先登陆～" v-if="!token" readonly class="layui-textarea"></textarea>
                <textarea
                  placeholder="在这里写下你的评论～最多120字"
                  v-model="content"
                  name="content"
                  v-else
                  class="layui-textarea"
                ></textarea>
                <span style="line-height:30px;letter-spacing:1px" v-if="!token">
                  去
                  <a href="/user/login" style="color:#4d4f8a">登陆</a>
                </span>
                <div class="btn">
                  <button class="layui-btn" @click="comment(data.id)">添加评论</button>
                </div>
              </div>
            </div>
            <Comment :commentList="commentList" />
            <div class="scrollbottomtip">
              <p :class="{ scrolltip: scrolltip }" style="position:relative;top:-15px;height:24px;"></p>
              <div :class="{scrollload:scrollload,scrollloadlast:scrollloadlast}">
                <p>数据加载中</p>
                <i class="el-icon-loading"></i>
              </div>
            </div>
            <p
              :class="{'hide': lastpage}"
              class="lastpagetip"
              style="color:#999"
              v-if="commentList.length"
            >没有更多评论了...</p>
          </div>
        </div>
      </div>

      <div class="layui-col-sm4">
        <div class="detail-side">
          <div class="person">
            <a :href="'/user/' + author.id" class="img">
              <img :src="author.avatar" />
            </a>
            <span class="name">
              <a :href="'/user/' + data.user.id">{{data.user.name}}</a>
            </span>
            <span class="num">{{author.newsNum}}篇文章</span>
            <span class="name">{{author.introduce}}</span>
          </div>
          <div class="news-index contentBot">
            <Sidebar
              :hotNewsList="hotNewsList"
              :title="sideBarTitle"
              style="width:100% !important"
            />
          </div>
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

import Comment from "@/components/Comment";
import Sidebar from "@/components/sidebar";
import "../../assets/hybrid.css";
import Loading from "@/components/Loading";
import QRCode from "qrcode";
import $ from "jquery";

dateFormat();
export default {
  async asyncData({ params, error }) {
    try {
      const { id } = params;
      const {
        data: { data }
      } = await axios.get("/api/articleDetails/" + id);
      const {
        data: { hotNewsList }
      } = await axios.get(`/api/news/hot/10`);
      const {
        data: { commentList }
      } = await axios.get(`/api/commentList/${id}/0`);
      return {
        data: data,
        hotNewsList: hotNewsList,
        sideBarTitle: "热门文章",
        token: "",
        commentList: commentList
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
  name: "Articledetails",
  data() {
    return {
      page: 0,
      lastpage: true,
      ScrollFirst: true,
      scrolltip: false,
      scrollload: true,
      scrollloadlast: false,
      content: "",
      liked: false,
      author: [],
      userinfo: {},
      isLoading: true
    };
  },
  head() {
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
          content: `${this.data.description}`
        },
        { name: "keywords", content: this.data.title }
      ]
    };
  },
  created() {
    //设置延迟执行
    this.isLoading = false;
  },
  beforeMount() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (window.loading) {
      window.loading.close();
    }
    this.token = this.$cookie.get("token"); // 判断是否登陆
    this.userinfo = JSON.parse(this.$cookie.get("user"));
    this.isLike(this.$route.params.id);
    this.getAuthorInfo(this.$route.params.id);
  },
  methods: {
    getAuthorInfo(id) {
      axios.get(`/api/userInfo/${id}`).then(respone => {
        if (respone.data && respone.data.code === 0) {
          this.author = respone.data.user;
        }
      });
    },
    isLike(id) {
      axios.interceptors.request.use(
        config => {
          config.headers["Authorization"] =
            "Bearer " + this.$cookie.get("token"); // 请求头带上token
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      ),
        axios.post(`/api/news/isLiked/${id}`).then(respone => {
          if (respone.data && respone.data.code === 0) {
            this.liked = respone.data.liked.liked;
            this.data.liked++;
          }
        });
    },
    comment(id) {
      if (this.content.length == 0) {
        return;
      }
      axios.interceptors.request.use(
        config => {
          config.headers["Authorization"] =
            "Bearer " + this.$cookie.get("token"); // 请求头带上token
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      ),
        axios
          .post("/api/comment/create", {
            content: this.content.substring(0, 120),
            news_id: id
          })
          .then(respone => {
            if (respone.data && respone.data.code === 0) {
              this.$message({
                message: respone.data.msg,
                type: "success",
                offset: 90,
                duration: 1000
              });
              axios.get(`/api/commentList/${id}/0`).then(respone => {
                this.commentList = respone.data.commentList;
              });
              this.author.comments++;
            } else {
              this.$message({
                message: respone.data.msg,
                type: "warning",
                offset: 90,
                duration: 1000
              });
            }
            this.content = "";
          });
    },
    nextpage() {
      const id = this.$route.params.id;
      if (this.lastpage) {
        this.isLoading = true;
        this.page++;
        const page = this.page;
        axios
          .get(`/api/commentList/${id}/${page}`)
          .then(res => {
            this.commentList = [...this.commentList, ...res.data.commentList];
            this.ScrollFirst = true;
            this.scrolltip = false;
            this.scrollload = true;
            if (res.data.commentList.length < 20) {
              this.lastpage = false;
              this.scrolltip = true;
              this.scrollloadlast = true;
            }
          })
          .catch(err => (this.ScrollFirst = true));
      }
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.isLoading = false;
      }, 300);
    },
    handleScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight - windowHeight - scrollTop < 200) {
        this.scrolltip = true;
        this.scrollload = false;
        this.ScrollFirst = false;
        this.nextpage();
      }
    },
    like(id) {
      if (this.liked) return;
      axios.interceptors.request.use(
        config => {
          config.headers["Authorization"] =
            "Bearer " + this.$cookie.get("token"); // 请求头带上token
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      ),
        axios
          .post("/api/news/like", {
            news_id: id
          })
          .then(respone => {
            if (respone.data && respone.data.code === 0) {
              this.$message({
                message: respone.data.msg,
                type: "success",
                offset: 90,
                duration: 1000
              });
              this.liked = true;
            } else {
              this.$message({
                message: respone.data.msg,
                type: "warning",
                offset: 90,
                duration: 1000
              });
            }
          });
    },
    useqrcode(id) {
      document.getElementById(id).style.display = "block";
      var canvas = document.getElementById(id);
      QRCode.toCanvas(canvas, process.env.homeUrl + `/details/${id}`, function(
        error
      ) {
        if (error) console.error(error);
        document.getElementById(id).style.display = "block";
      });
    },
    deleteQrcode(id) {
      document.getElementById(id).style.display = "none";
    },
    toComment() {
      $('html , body').animate({scrollTop: $('.detail-comment').offset().top}, 1000);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  computed: {},
  components: {
    Comment,
    Sidebar,
    Loading,
    QRCode
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.news-tag {
  background-color: #4d4f8a;
  border-color: #4d4f8a;
  color: #fff;
  margin-left: 5px;
}
</style>

<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <slide :slideList="slideList" />
    <div class="grid-content bg-purple container">
      <div class="layui-row layui-col-space20 contentBot">
        <ArticleList :articleList="articleList" />
        <Sidebar :hotNewsList="hotNewsList" :title="sideBarTitle" />
      </div>
      <div class="scrollbottomtip">
        <p :class="{ scrolltip: scrolltip }" style="position:relative;top:-15px;height:24px;"></p>
        <div :class="{scrollload:scrollload,scrollloadlast:scrollloadlast}">
          <p>数据加载中</p>
          <i class="el-icon-loading"></i>
        </div>
      </div>
      <p :class="{'hide':lastpage}" class="lastpagetip">已经到底部啦~</p>
    </div>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
import ArticleList from "../components/ArticleList";
import Sidebar from "../components/sidebar";
import slide from "../components/slide";
import Loading from "@/components/Loading";

export default {
  name: "latestArticles",
  head() {
    return {
      title: "layBlog-ui 更好的博客系统，致力于商业级新媒体网站开发",
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,user-scalable=no"
        },
        {
          hid: "description",
          name: "description",
          content: "layBlog-ui 更好的博客系统，致力于商业级新媒体网站开发"
        },
        {
          name: "keywords",
          content: "layBlog-ui|博客|新媒体"
        }
      ]
    };
  },
  async asyncData({ params, error }) {
    try {
      const {
        data: { data }
      } = await axios.get("/api/news/list/0/0");
      const {
        data: { hotNewsList }
      } = await axios.get(`/api/news/hot/10`);
      const {
        data: { slideList }
      } = await axios.get(`/api/news/slide/4/2`);
      return {
        articleList: data,
        page: 0,
        lastpage: true,
        fadetitle: true,
        ScrollFirst: true,
        scrolltip: true,
        scrollload: true,
        scrollloadlast: false,
        slideList: slideList,
        hotNewsList: hotNewsList,
        sideBarTitle: "热门文章",
        isLoading: true
      };
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  components: {
    ArticleList,
    slide,
    Sidebar,
    Loading
  },
  mounted() {
    this.isLoading = false;
    const { newArticlelist } = this.$store.state;
    window.addEventListener("scroll", this.handleScroll);
    if (window.loading) {
      window.loading.close();
    }
    if (newArticlelist.length) {
      this.articleList = newArticlelist;
      return;
    }
  },
  methods: {
    nextpage() {
      if (this.lastpage) {
        this.isLoading = true;
        const { newArticlelist } = this.$store.state;
        this.page++;
        axios.get(`/api/news/list/0/${this.page}`).then(res => {
          const Articles = res.data.data;
          this.articleList = [...this.articleList, ...Articles];
          this.ScrollFirst = true;
          this.scrolltip = false;
          this.scrollload = true;
          if (Articles.length < 20) {
            this.lastpage = false;
            this.scrollloadlast = true;
          }
          this.$store.commit("updatenewlistcon", this.articleList);
        });
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
        if (this.ScrollFirst) {
          this.scrolltip = true;
          this.scrollload = false;
          this.ScrollFirst = false;
          this.nextpage();
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
};
</script>

<style scoped>
.lastpagetip {
  font-size: 14px;
}
</style>

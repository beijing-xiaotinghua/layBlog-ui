<template>
  <div id="tag" class="container">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="layui-row layui-col-space20 contentBot">
      <ArticleList :articleList="tagList" />
      <Sidebar :hotNewsList="hotNewsList" :title="sideBarTitle" />
    </div>
    <div class="scrollbottomtip">
      <p :class="{ scrolltip: scrolltip }" style="position:relative;top:-15px;height:24px;"></p>
      <div :class="{scrollload:scrollload,scrollloadlast:scrollloadlast}">
        <p>数据加载中</p>
        <i class="el-icon-loading"></i>
      </div>
    </div>
    <p :class="{'hide': lastpage}" class="lastpagetip">没有更多数据了...</p>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import ArticleList from "@/components/ArticleList";
import FlashArticleList from "@/components/FlashArticleList";

import Sidebar from "@/components/sidebar";
import Loading from "@/components/Loading";

export default {
  name: "tag",
  head() {
    return {
      title: this.tagtitle + "layBlog-ui 更好的博客系统，致力于商业级新媒体网站开发",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.tagtitle} + layBlog-ui 更好的博客系统，致力于商业级新媒体网站开发`
        },
        { name: "keywords", content: this.tagtitle }
      ]
    };
  },
  data() {
    return {
      page: 0,
      lastpage: true,
      ScrollFirst: true,
      scrolltip: false,
      scrollload: true,
      scrollloadlast: false,
      isLoading: true
    };
  },
  async asyncData({ params }) {
    try {
      const { tag } = params;
      const {
        data: { data }
      } = await axios.get(`/api/news/list/${tag}/0`);
      const {
        data: { hotNewsList }
      } = await axios.get(`/api/news/hot/10`);
      return {
        tagList: data,
        tagtitle: "",
        fadetitle: true,
        notfound: !data.length,
        hotNewsList: hotNewsList,
        sideBarTitle: "热门文章"
      };
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  components: {
    ArticleList,
    Sidebar,
    Loading
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (window.loading) {
      window.loading.close();
    }
    this.isLoading = false;
  },
  methods: {
    nextpage() {
      const tag = this.$route.params.tag;
      if (this.lastpage) {
        this.isLoading = true;
        this.page++;
        const page = this.page;
        axios
          .get(`/api/news/list/${tag}/${page}`)
          .then(res => {
            this.tagList = [...this.tagList, ...res.data.data];
            this.ScrollFirst = true;
            this.scrolltip = false;
            this.scrollload = true;
            if (res.data.data.length < 20) {
              this.lastpage = false;
              this.scrolltip = true;
              this.scrollloadlast = true;
            }
            this.$store.commit("updatetaglistcon", this.tagList);
            this.articleList = this.$store.state.newlistcon;
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
.shownotfound {
  display: block !important;
}
.notfound {
  width: 100%;
  padding-top: 40px;
  display: none;
}
.notfound img {
  width: 60%;
  margin: 0 auto;
  display: block;
}
</style>

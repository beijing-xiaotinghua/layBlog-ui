<template>
  <div class="bgcolor">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="layui-container news-user">
      <div class="userSelf">
        <div class="img">
          <img :src="user.avatar" />
        </div>
        <p class="name">{{user.name}}</p>
        <p class="name">{{user.introduce}}</p>
        <div style="margin-top:10px">
          <ul>
            <li>
              <span class="number">{{user.newsNum}}</span>
              <span class="label">文章</span>
            </li>
            <li>
              <span class="number">{{user.likes}}</span>
              <span class="label">被点赞</span>
            </li>
            <li>
              <span class="number">{{user.views}}</span>
              <span class="label">被浏览</span>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="news-index contentBot index-list">
        <ArticleList :articleList="tagList" />
        <Sidebar :hotNewsList="hotNewsList" :title="sideBarTitle" />
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import ArticleList from "@/components/ArticleList";
import Sidebar from "@/components/sidebar";
import Loading from "@/components/Loading";
export default {
  name: "home",
  head() {
    return {
      title: this.tagtitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.tagtitle}`
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
      const { id } = params;
      const {
        data: { data }
      } = await axios.get(`/api/home/${id}/0`);
      const {
        data: { hotNewsList }
      } = await axios.get(`/api/popular/${id}/10`);
      const {
        data: { user }
      } = await axios.get(`/api/user/${id}`);
      return {
        tagList: data,
        tagtitle: user.name + "的主页",
        fadetitle: true,
        notfound: !data.length,
        hotNewsList: hotNewsList,
        sideBarTitle: "他的最热文章",
        user: user
      };
    } catch (err) {
      // error({ statusCode: 404 });
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
    this.isLoading = false
  },
  methods: {
    nextpage() {
      const id = this.$route.params.id;
      if (this.lastpage) {
        this.isLoading = true
        this.page++;
        const page = this.page;
        axios
          .get(`/api/home/${id}/${page}`)
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
      this.isLoading = false
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

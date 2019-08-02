<template>
  <div>
    <div id="searchPage" class="container">
      <div class="tagtitle">
        <p class="fadetitle">搜索有关于<span style="margin-left:10px;">"{{search}}"</span>
        </p>
      </div>
      <div class="notfound" :class="{'shownotfound':notfound}">
        <img src="http://img.binlive.cn/upload/1525014468729"
             alt="binlive个人技术博客vue、react、node">
      </div>
      <ArticleList :articleList="searchList"/>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  import ArticleList from '../../components/ArticleList';
  import {dateFormat} from '../../utils/index';

  dateFormat();
  export default {
    name: 'searchList',
    head () {
      return {
        title: `搜索${this.search}`,
        meta: [
          { hid: `搜索${this.search}`, name: `搜索${this.search}`, content: `搜索${this.search}` }
        ]
      }
    },
    components: {
      ArticleList
    },
    async asyncData ({params, error}) {
      const {search} = params;
      try {
        const {data: {Article}} = await axios.get(`/api/ArticleSearch/${search}`);
        return {
          searchList: Article,
          search,
          notfound: !Article.length
        };
      } catch (err) {
        error({ statusCode: 404})
      }

    },
    mounted() {
      if (window.loading) {
        window.loading.close();
      }
    }
  };
</script>

<style scoped>
  .shownotfound {
    display: block !important
  }
  .notfound {
    width: 100%;
    padding-top: 40px;
    display: none
  }
  .notfound img {
    width: 60%;
    margin: 0 auto;
    display: block
  }
</style>

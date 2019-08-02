<template>
  <div class="layui-col-md4 index-side">
    <div class="newsSide">
      <h2>{{title}}</h2>
      <ul>
        <li v-for="item in hotNewsList" :key="item.id">
          <a :href="'/details/'+item.id">
            <span>
              <img :src="item.cover_img_url" />
            </span>
            <p class="txt">{{item.title}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hotNewsList',
    props: {
      hotNewsList: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: () => ""
      }
    },
    data() {
      return {
      }
    },
    methods: {
      articlesDetailsFn: function(id){
        this.$router.push({ path: `/details/${id}`});
      }
    }
  }
</script>
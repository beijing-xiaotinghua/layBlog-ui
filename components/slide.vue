<template>
  <div class="layui-row layui-col-space20 contentTop" style="margin-top:10px">
    <div class="layui-col-sm8">
      <div class="layui-carousel" id="newsIndex">
        <el-carousel :interval="4000" height="400px">
          <el-carousel-item v-for="item in slideList.big" :key="item.id">
            <div>
              <a :href="/details/+item.id">
                <img :src="item.cover_img_url" />
                <p id="txt">
                  <span>{{item.title}}</span>
                </p>
              </a>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="layui-col-xs6 layui-col-sm4"  v-for="item in slideList.small" :key="item.id">
      <div class="banner-img">
        <a :href="/details/ + item.id">
          <img :src="item.cover_img_url" />
          <div>
            <p>
              <span>{{item.category.name}}</span>
              {{item.title}}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { dateFormat } from "../utils/index";
dateFormat();
export default {
  name: "ArticleList",
  props: {
    slideList: {
      type: Object,
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
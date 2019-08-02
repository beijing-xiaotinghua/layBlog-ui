<template>
  <div id="app" class="news-index">
    <el-row :gutter="0">
      <el-col class="nav">
        <el-col class="nav-bar" :sx="22" :sm="22" :md="22" :lg="16">
          <div class="nav-bar-body">
            <div class="nav-bar-inner">
              <div id="logo">
                <a href="/">
                  <img src="@/assets/logo.png" alt style="top: -8px;position: absolute;left: 0;" />
                </a>
              </div>
            </div>
            <div class="navmenu">
              <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="item in taglists"
                    :key="item.alias_name"
                    :label="item.name"
                    :name="item.alias_name"
                    data-ripple
                  ></el-tab-pane>
                </el-tabs>
                <div v-if="!userinfo">
                  <a href="/user/login">
                    <el-button
                      type="primary"
                      icon="el-icon-user"
                      id="login"
                      style="margin-right: 10px"
                    >登陆</el-button>
                  </a>
                  <a href="/user/register">
                    <el-button type="primary" icon="el-icon-edit" id="register">注册</el-button>
                  </a>
                </div>

                <div v-else class="nav-avatar">
                  <el-menu class="el-menu-demo" mode="horizontal">
                    <el-submenu index="2">
                      <template slot="title">
                        <a href="javascript:;">
                          <img :src="userinfo.avatar" class="layui-nav-img" />
                        </a>
                      </template>
                      <el-menu-item index="2-3" class="el-icon-position" @click="logout">退出</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="16" class="container_article">
        <div>
          <nuxt />
        </div>
      </el-col>
    </el-row>
    <div class="footer">京ICP备180398**号</div>
  </div>
</template>
<script>
import axios from "axios";
import marked from "marked";
import { clearLoginInfo } from "@/utils/index";
export default {
  name: "app",
  data() {
    return {
      taglists: ["推荐"],
      search: "",
      activeName: "",
      userinfo: {},
      activeIndex: 1
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.taglist();
    var winwinth = window.innerWidth;
    if (this.$route.params.tag === undefined && this.$route.fullPath === "/") {
      this.activeName = "推荐";
    } else {
      this.activeName = this.$route.params.tag || this.$route.path.slice(1);
    }
  },
  methods: {
    getUserInfo() {
      axios.interceptors.request.use(
        config => {
          config.headers["Authorization"] =
            "Bearer " + this.$cookie.get("token"); // 请求头带上token
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
      axios.get("/api/userInfo").then(respone => {
        if (respone.data.code === 0) {
          this.userinfo = respone.data.data;
        } else {
          this.userinfo = null;
        }
      });
    },
    taglist() {
      axios.get("/api/category/list").then(respone => {
        const tagList = respone.data.data;
        this.taglists = [{ name: "推荐" }, ...tagList];
      });
    },
    keyupsearch(ev) {
      if (ev.keyCode === 13) {
        this.searchArticle();
      }
    },
    handleClick(tab) {
      const { index } = tab;
      this.$router.push({ path: `/${index == 0 ? "" : tab.name}` });
    },

    searchArticle() {
      const trimSearch = this.search.trim();
      if (!trimSearch) {
        return this.$notify.info({
          title: "提示",
          message: "您还未输入搜索内容",
          offset: 100
        });
      }
      this.$router.push({ path: `/search/${this.search}` });
    },
    logout() {
      this.$cookie.delete("token");
      this.$cookie.delete("user");
      this.$router.go(0);
    }
  }
};
</script>

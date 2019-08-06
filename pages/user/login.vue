<template>
  <div class="layui-fulid news-login">
    <div class="title">
      <img src="@/assets/images/logoBig.png" />
    </div>
    <div class="layui-form">
      <div class="layui-input-block">
        <input
          type="text"
          class="layui-input"
          name="phone"
          v-model="dataForm.phone"
          placeholder="手机号"
        />
      </div>
      <div class="layui-input-block">
        <input
          type="password"
          class="layui-input"
          name="password"
          v-model="dataForm.password"
          placeholder="密码"
        />
      </div>
      <p class="terms">
        <input type="checkbox" lay-skin="primary" checked />我已阅读并同意
        <a href>用户协议</a>和
        <a href>隐私条款</a>
        <a href="/user/register" style="float:right">注册</a>
      </p>
      <button class="layui-btn" lay-submit @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import { getUUID } from "../../utils/index";
import Vue from "vue";

export default {
  name: "login",
  head() {
    return {
      title: `登陆`,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,user-scalable=no"
        }
      ]
    };
  },
  data() {
    return {
      dataForm: {
        phone: "",
        password: "",
        uuid: ""
      }
    };
  },
  components: {},
  beforeMount() {
    if (this.$cookie.get("token")) {
      this.$router.go(-1);
    }
  },
  mounted() {
    if (window.loading) {
      window.loading.close();
    }
    this.dataForm.uuid = getUUID();
  },
  methods: {
    login() {
      axios
        .post("/api/login", {
          phone: this.dataForm.phone,
          uuid: this.dataForm.uuid,
          password: this.dataForm.password
        })
        .then(respone => {
          if (respone.data && respone.data.code === 0) {
            this.$cookie.set("token", respone.data.data.token);
            this.$cookie.set("user", JSON.stringify(respone.data.data.user));
            this.$message({
              message: respone.data.msg,
              type: "success",
              offset: 90
            });
            this.go();
          } else {
            this.$message({
              message: respone.data.msg,
              type: "warning",
              offset: 90
            });
          }
        });
    },
    go() {
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.$router.go(-1);
        this.$router.go(0);
      }, 1000);
    }
  }
};
</script>
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
          placeholder="请输入手机号"
        />
      </div>
      <div class="layui-input-block">
        <input
          type="text"
          class="layui-input"
          name="code"
          v-model="dataForm.code"
          placeholder="请输入短信验证码"
        />
        <button id="getCode" class="layui-btn" @click="codeClick">{{this.codeFont}}</button>
      </div>
      <div class="layui-input-block">
        <input
          type="password"
          class="layui-input"
          name="password"
          v-model="dataForm.password"
          placeholder="请输入新密码"
        />
      </div>
      <div class="layui-input-block">
        <input
          type="password"
          class="layui-input"
          name="password"
          v-model="dataForm.repassword"
          placeholder="请再次输入新密码"
        />
      </div>
      <p class="terms">
        <input type="checkbox" lay-skin="primary" lay-ignore checked />我已阅读并同意
        <a href>用户协议</a>和
        <a href>隐私条款</a>
      </p>
      <button class="layui-btn" lay-submit @click="register">找回密码</button>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import { getUUID, isMobile } from "../../utils/index";
import Vue from "vue";

export default {
  name: "register",
  head() {
    return {
      title: `找回密码`,
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
      codeFont: "获取验证码",
      dataForm: {
        phone: "",
        code: "",
        password: "",
        repassword: "",
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
    codeClick() {
      axios
        .post("/api/msg/send", {
          phone: this.dataForm.phone,
          uuid: this.dataForm.uuid
        })
        .then(respone => {
          if (respone.data.code === 0) {
            this.$message({
              message: respone.data.msg,
              type: "success",
              offset: 90,
              duration: 1000
            });
            this.codeFont = 10;
            var si = setInterval(() => {
              this.codeFont--;
              if (this.codeFont == 0) {
                this.codeFont = "获取验证码";
                clearInterval(si);
              }
            }, 1000);
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

    register() {
      axios
        .post("/api/find-password", {
          phone: this.dataForm.phone,
          uuid: this.dataForm.uuid,
          code: this.dataForm.code,
          password: this.dataForm.password,
          repassword: this.dataForm.repassword

        })
        .then(respone => {
          if (respone.data && respone.data.code === 0) {
            this.$cookie.set("token", respone.data.data.token);
            this.$cookie.set("user", JSON.stringify(respone.data.data.user));

            this.$message({
              message: respone.data.msg,
              type: "success",
              offset: 90,
              duration: 1000
            });
            this.go();
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
    go() {
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.$router.go(-1);
      }, 1000);
    }
  }
};
</script>
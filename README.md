## 基于vue nuxt element-ui 打造，采用服务器端渲染ssr技术，更利于seo[线上预览](https://bw31d.com "线上预览")

## 效果图
![image](https://github.com/beijing-xiaotinghua/layBlog-ui/blob/master/assets/images/blog.gif)
## 安装

```
 git clone https://github.com/beijing-xiaotinghua/layBlog-ui.git 
```
安装包依赖
```
 npm install
```
使用cnpm安装包依赖更快，首先安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```
## 运行
运行发开环境
```js
npm run dev
```
**本地访问http://localhost:3000**
## 打包部署，打包部署必须在服务器端
**首先打包编译项目**
```js
npm run build
```
**运行项目**
```js
npm run start
```

**建议使用pm2管理npm进程**
#### 安装pm2
```
cnpm install -g pm2

```
#### pm2运行项目
执行时确保已经在项目根目录
```
pm2 start ./node_modules/nuxt/bin/nuxt -- start
```
#### pm2查看项目列表
```
pm2 list
```
#### pm2关闭项目
```
pm2 stop id
```
#### pm2启动项目
```
pm2 start id
```
## 在真实的服务器环境中运行项目

配置nginx反向代理

```
server {
  listen 80;
	server_name  your domain;
  root /var/www/html/layadmin-blog-ui;
  index  index.php index.html index.htm;
  location / {
	  proxy_pass http://127.0.0.1:3000;
  }
}
```
以上只是能够确保运行的简洁配置，生产环境中根据需要自行增加配置

## 功能说明

 - 使用nuxt.js做服务端渲染ssr.
 - 使用element-ui 组件库.
 - 使用axios网络请求库
 - 使用了layui前端css样式
 - 使用了短信验证码登陆、注册
 - 实现了评论、点赞功能

## 线上服务预览

See [layBlog-ui](https://bw31d.com "layBlog-ui").

## 本地后端接口配置
修改`nuxt.config.js`文件, 根据需要修改你的接口地址
```javascript
proxy: [
  ['/api', { target: 'http://api.bw31d.com' }]
]
```
修改`plugins/axios.js`文件
```javascript
if (process.server) {
  options.baseURL = 'http://api.bw31d.com'
}
```
## 后台管理系统截图
![image](https://github.com/beijing-xiaotinghua/layBlog-ui/blob/master/assets/images/WechatIMG6.jpeg)
![image](https://github.com/beijing-xiaotinghua/layBlog-ui/blob/master/assets/images/WechatIMG8.jpeg)

## 加qq群大家一起交流

![image](https://github.com/beijing-xiaotinghua/layBlog-ui/blob/master/assets/images/WechatIMG2.jpeg)

## 需要后端接口代码和后台管理系统联系作者购买（399元）

![image](https://github.com/beijing-xiaotinghua/layBlog-ui/blob/master/assets/images/weixin.jpeg)

## 授权说明
此项目仅供参考学习，商业用途，请联系作者授权

## 下一步开发计划
1. 关注功能
2. 私信功能
3. 加入es搜索引擎，提供全文检索功能

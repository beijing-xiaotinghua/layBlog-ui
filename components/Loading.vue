<template>
  <div class="lds-css ng-scope loading-position">
    <div style="width:100%;height:100%" class="lds-bars">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  data() {
    return {};
  }
};
</script>

<style scoped>
.loading-position {
  position: fixed;
  z-index: 1000;
  top: 30%;
  left: 30%;
}
@keyframes lds-bars {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes lds-bars {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.lds-bars {
  position: relative;
}
.lds-bars div {
  position: absolute;
  width: 20px;
  height: 80px;
  top: 60px;
  -webkit-animation: lds-bars 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation: lds-bars 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lds-bars div:nth-child(1) {
  left: 30px;
  background: #4b4f8c;
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.lds-bars div:nth-child(2) {
  left: 70px;
  background: #6666CC;
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.lds-bars div:nth-child(3) {
  left: 110px;
  background: #666699;
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.lds-bars div:nth-child(4) {
  left: 150px;
  background: #4b4f8c;
}
.lds-bars {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
</style>

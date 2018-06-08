<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <router-view/>
    <!--<transition name="Slide"-->
                <!--enter-active-class="slideInLeft"-->
                <!--leave-active-class="slideOutRight">-->

    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style>
  *{
    margin: 0 auto;
    padding: 0 auto;
  }

  /* 子类高度与父类相关 */
  html,body,#app{
    height: 100%;
  }

#app {
  font-family: 'Ping SC Regular','Ping SC Semi',"PingFang SC",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  flex-direction: column;
  background-color:white;
  color: black;
  width: 100%;
}

  /* 定义字体开始 */
  @font-face {
    font-family: 'Ping SC Regular';
    src: url('/static/font/PingFangSC-Regular.woff2') format('woff2'),url('/static/font/SFProIcons_regular.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }
  /* 用于标题 */
  @font-face {
    font-family: 'Ping SC Semi';
    src: url('/static/font/PingFangSC-Semibold.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
</style>

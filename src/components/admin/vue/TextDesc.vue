<!-- 文本说明组件 -->
<template>
  <div class="Text_Desc">
    <div class="General">
      <span>{{GenText}}</span>
    </div>
    <div class="detali">
      <p>
        <span>{{detaText1}}</span>
      </p>
      <p>
        <span>{{detaText2}}</span>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        props:{
          GenText:String,
          detaText1:String,
          detaText2:String
        }
    }
</script>

<style scoped lang="scss">
  *{
    overflow: hidden!important;
  }
  .Text_Desc{
    margin: 1.4ex auto;
    width: 90%;
    .General{
      font-family: 'Ping SC Semi';
      font-weight: bolder;
      margin: 0.005em auto;
      font-size: 2.6em;
      span{
        width: auto;
        float: left;
      }
    }
    .detali{
      display: block;
      span{
        color: #888888;
        width: auto;
        font-size: 1em;
        float: left;
        font-weight: lighter;
        margin: 0.01em auto;
      }
    }
  }
</style>

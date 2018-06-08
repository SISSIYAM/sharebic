<template>
    <div ref="title" id="title">
      <div ref="titleImg" class="title_img" @click="goBack">
        <icon name="chevron-left" scale="1.2" fixed-width></icon>
      </div>
      <div ref="titleTextMid" class="title_mid">
        {{ titleMid }}
      </div>
      <div ref="titleText" class="title_text" @click="turnTo" style="margin-top: 0px">
        {{ titleMes }}
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props:{
          titleMes:String,
          titleMid:String,
          toPathUrl:String
        },
        data(){
          return{
          }
        },

        mounted:function(){
          //  初始化样式
          this.getMarignTop();
        },


        methods:{

          goBack:function(){
            if(this.$props.toPathUrl == "" || this.$props.toPathUrl == null){
              this.$router.go(-1);
            }else{
              this.$router.push(this.$props.toPathUrl);
            }
          },

          turnTo:function () {
              if(this.$props.titleMes == '短信登录'){
                this.$router.push('/register');
              }else if(this.$props.titleMes == '密码登录'){
                this.$router.push('/');
              }
          },

          getMarignTop:function () {
            //  初始化样式
            let Ptitle = this.$refs.title;
            let CtitleImg = this.$refs.titleImg;
            let titleTextMid = this.$refs.titleTextMid;
            let valueHeight = Ptitle.offsetHeight - CtitleImg.offsetHeight;
            if(this.$props.titleMid == "" || this.$props.titleMid == null){
              if(this.$props.titleMes == ''){
                CtitleImg.style.marginTop = valueHeight * 0.5 + 5 +"px";
              }else{
                let CtitleText = this.$refs.titleText;
                CtitleText.style.marginTop = valueHeight * 0.5 + 5 + "px";
                CtitleImg.style.marginTop = valueHeight * 0.5 + 5 +"px";
              }
            }else{
              CtitleImg.style.marginTop = valueHeight * 0.5 + 5 +"px";
              titleTextMid.style.marginTop = valueHeight * 0.5 + 5 + "px";
            }
          }
        },
    }
</script>

<style lang="scss" scoped type="text/css">

  #title{
    width: 100%;
    background-color: #f1f1f161;
    display: inline-block;
    overflow: hidden;
    font-weight: bold;
  }

  .title_img{
    float: left;
    margin-left: 3%;
  }

  .title_mid{
    width: auto;
  }

  .title_text{
    float: right;
    height: auto;
    margin-right: 3%;
    font-weight: bold;
  }
</style>

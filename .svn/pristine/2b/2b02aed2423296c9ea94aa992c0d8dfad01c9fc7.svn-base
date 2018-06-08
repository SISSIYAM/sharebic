<template>
  <div class="checkItem">
    <div class="checkInput">
      <el-input placeholder="6位短信验证码" v-model="checkNum" clearable maxlength="6">
        <template slot="prepend">
          <div style="width: 35px;font-size: small">
            <span style="color: black;">验证码</span>
          </div>
        </template>
      </el-input>
    </div>
    <el-button type="primary" ref="sendButton" @click="doSendCheck" :disabled ="Stuas">{{ statusCheck }}</el-button>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            checkNum:'',
            statusCheck:'发送验证码',
            staus:true,
            Stuas:false
          }
        },
        // 发送验证码
        methods:{
          doSendCheck:function () {
            if(this.$parent.sendCheck()){
              var _this =this;
              var Mestime = 60;
              if(this.staus){
                this.staus = false;
                _this.Stuas = true;
                console.log("发送验证码");
                function time() {
                  if(Mestime == 0){
                    _this.staus = true;
                    _this.Stuas = false;
                    _this.statusCheck = "发送验证码";
                  }else{
                    Mestime--;
                    setTimeout(()=>{
                      _this.statusCheck = Mestime+"秒后重试";
                      time();
                    },1000)
                  }
                }
                time();
              }
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  .checkItem{
    display: inline-block;
    margin-bottom: 3%;
    width: 90%;
    .checkInput{
      font-weight: bold;
      color: black;
      font-size: 1.2em;
      margin-right: 2%;
      width: 65%;
      float: left;
    }
    .el-button--primary{
      float: right;
      width: 33%;
    }
  }
</style>

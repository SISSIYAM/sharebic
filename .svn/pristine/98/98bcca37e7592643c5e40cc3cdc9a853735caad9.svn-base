<template>
  <div>
    <div class="ButtomUse" @click.prevent="postFrom">
      <el-button type="primary">{{ statusD.DeedText }}</el-button>
    </div>
    <div v-if="resultS == 'part1'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
      <span class="span2" @click.prevent="forgetPwd">忘记密码</span>
    </div>
    <div v-else-if="resultS == 'part2'" class="Clause">
      <span>{{ statusD.ClauseText }}</span>
    </div>
    <div v-else-if="resultS == 'part3'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
    </div>
    <div v-else-if="resultS == 'part4'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
    </div>
    <div v-else-if="resultS == 'part5'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        props:{
          statusD:Object
        },
        data(){
          return{
            TextType:"password"
          }
        },
        computed:{
          resultS:function () {
            if(this.$props.statusD.status == "part1"){
              return "part1";
            }else if (this.$props.statusD.status == "part2") {
              return"part2";
            }else if (this.$props.statusD.status == "part3"){
              return "part3";
            }else if (this.$props.statusD.status == "part4") {
              return "part4";
            }else if (this.$props.statusD.status == "part5"){
              return "part5"
            }
          }
        },
        methods:{
          postFrom:function(){
            switch (this.resultS){
              case 'part1':
                //  调用传递
                this.$parent.sendPost();
                break;
              case 'part2':
                this.$parent.sendPost();
                break;
              case 'part3':
                this.$parent.sendPost();
                break;
              case 'part4':
                this.$parent.sendPost();
                break;
              case 'part5':
                this.$parent.sendPost();
                break;
            }
          },

          forgetPwd:function () {
            this.$router.push('/retPwdP1');
          },
          //  更改密码可见性
          showPwd:function () {
            if(this.TextType == "password"){
              this.TextType = "text";
            }else{
              this.TextType = "password"
            }
          }
        }
    }
</script>

<style scoped lang="scss">

  .ButtomUse{
    width: 90%;
    margin-top: 1.3ex;
    button{
      width: 100%;
      height: 3.5em;
    }
  }

  .Clause{
    margin-top: 0.8em;
    color: #888888;
    font-weight: 400;
    width: 90%;
    display: inline-block;
  .span1{
    float: left;
  }
  .span2{
    float: right;
  }
  }
</style>

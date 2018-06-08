<!-- 表单密码组件 -->
<template>
  <div class="input_text">
    <el-input v-model="value" :type="TextType" placeholder="请输入密码">
      <template slot="prepend">
        <div style="width: 35px;">
          <span style="color: black;">密码</span>
        </div>
      </template>
      <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
    </el-input>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            TextType:"password",
            value:""
          }
        },

        methods:{
            //  更改密码可见性
            showPwd:function () {
              if(this.TextType == "password"){
                this.TextType = "text";
              }else{
                this.TextType = "password"
              }
            },

        }
    }
</script>

<style scoped lang="scss">
  .input_text{
    width: 90%;
    font-weight: bold;
    color: black;
    font-size: 1.1em;
    margin: 0.57em auto;
  }
</style>

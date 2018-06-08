<template>
  <div id="wapper">
    <title-com :title-mid="titleMid" id="titleCom"></title-com>
    <div class="input_text">
      <el-input v-model="value" placeholder="请输入新的昵称" clearable>
        <template slot="prepend">
          <div style="width: 35px;">
            <span style="color: black;">昵称</span>
          </div>
        </template>
      </el-input>
    </div>
    <div class="ButtomUse" @click.prevent="crofirmName">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            value:"",
            titleMid:"修改昵称",
          }
        },
        mounted(){
          if(this.$route.params.oldName){
            this.value = this.$route.params.oldName;
          }
        },
        methods:{
          crofirmName:function () {
            this.showComfir("提示信息","确定将昵称改为"+this.value+"吗")
          },
          showComfir:function(title,content){
            let _this = this;
            //  弹出框
            this.$vux.confirm.show({
              title:title,
              content:content,
              theme:"ios",
              confirmText:"确认修改",
              // 组件除show外的属性
              onCancel () {
                console.log("已经取消") // 当前 vm
              },
              onConfirm () {
                //增加接口
                let _this = _this.value;
                this.$http.post("userLogin/updateName", {
                  name: 0,
                })
                  .then(function (response) {
                    if (response.data.code == 200) {
                      _this.VUETOOLS.totalShow("修改昵称成功", "", _this);
                    } else {
                      _this.VUETOOLS.totalShow("修改昵称失败", "", _this);
                    }

                  }).catch(function (error) {
                  _this.VUETOOLS.totalShow("修改昵称失败", "", _this);
                });

                _this.$router.push({
                  path:'/AdminInfo',
                  name:'AdminInfo',
                  params:{
                    newName:_this.value
                  }
                })
              }
            })
          },
        }
    }
</script>

<style scoped lang="scss">

  *{
    overflow: hidden;
  }

  #wapper{
    font-family: "Ping SC Regular";
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom{
      height: 8%;
    }
    .input_text{
      width: 90%;
      font-weight: bold;
      color: black;
      font-size: 1.1em;
      margin: 0.8em auto;
    }
    .ButtomUse{
      width: 90%;
      margin-top: 3ex;
      button{
        width: 100%;
        height: 3.5em;
      }
    }
  }
</style>

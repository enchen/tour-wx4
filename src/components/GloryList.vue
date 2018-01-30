<template>
  <div class="dp-register-bg" style="justify-content: space-around" >
    <img src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/fxzlryb.svg" width="100%">
    <div style="width: 90%">
    <div v-for="glory in gloryList" class="gloryItem">
    <div style="height: 30px;margin: 5px;background: #C40E28;width: 50px;line-height: 30px">{{glory.ranking}}</div>
      <div style="line-height: 40px">{{glory.teamName}}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div style="line-height: 40px">{{glory.total}}分</div>
    </div>
    </div>
    <div style="font-size: 14px">
      <div>排名有先后 成败皆英雄</div>
      <div>发现之旅漫漫 感谢并欢迎继续同行</div>
    </div>
    </div>
</template>
<style scoped>
.gloryItem
{
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
<script>

    export default{
        data(){
            return{
                gloryList:{}
            }
        },
        components:{

        },
      methods:{
          init(){
            let openId=this.$store.getters.openId
            this.$http.get('/wx/public/getGloryList.php?openId='+openId).then((response) => {
              this.gloryList=response.data
            }, (response) => {
              // error callback
            })
          }
      },
      mounted:function(){
        this.init()
      }
    }
</script>

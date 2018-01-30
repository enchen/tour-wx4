<template xmlns="http://www.w3.org/1999/html">
  <div  class="dp-random-bg">
    <div style="width: 100%"></div>
    <div style="width: 100%;">
      在你们的配合与帮助下<br>
      “一大”会议安全召开并顺利进行<br>
      清查会场任务结束！<br>
      请各位同志拿出《发现之旅》报<br>
      在盖章处盖上中共一大会址纪念章<br>
      会师凭证——<br>
      务必妥善保存！
    </div>
    <dp-image  style="height: 20%"   picUrl="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/stamp.jpg"  >
    </dp-image>

    <div style="display: flex;width:100%;height:80px;flex-direction: row;justify-content: space-around;align-items: center;">
      <div  class="dp-continue"   @click="submit">继续</div>
    </div>
  </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        },
      methods:{
        submit(){
          this.$router.push('/RunAway')
        }
      }
    }
</script>

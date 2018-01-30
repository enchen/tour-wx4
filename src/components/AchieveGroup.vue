<template>
  <div class="dp-register-bg">
    <div></div>
    <div style="font-size: 26px;font-weight: 800;font-style: italic;">发现之旅，小组成就</div>
   <div style="width: 100%">
     <div style="width: 50%;float: left" v-for="achieve in achieves">
       <img :src="achieve.achieveType" width="50%">
       <div>{{achieve.achieveName}}</div>
     </div>
   </div>
    <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
      <div class="dp-ok" @click="gocontinue">确认</div>
    </div>
  </div>
</template>
<style>

</style>
<script>

  export default{
    data(){
      return{
        achieves:{}
      }
    },
    methods:{
      initAchieve(){
        this.$http.get('/wx/public/getAchieveGroup.php?&openId='+this.$store.getters.openId).then((response) => {
          this.achieves=response.data
          this.picUrl='https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/'+achieve.achieveType+'.svg'
        }, (response) => {
          console.info('错误')
          setTimeout(() => {
            this.initAchieve()
          }, 4000);
        })
      },
      gocontinue(){
        this.$router.go(-1)
      }
    },
    mounted:function() {

      this.initAchieve()
    }
  }
</script>

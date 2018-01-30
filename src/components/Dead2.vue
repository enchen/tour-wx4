<template>
  <div class="dp-register-bg" >
    <!--<dp-notice :progressCount="progressCount" style="flex-grow: 1" :progressLabel="progressLabel" :message="message"></dp-notice>-->
    <div style="width: 100%;height: 160px;font-size: 30px;font-weight: 800;text-align: center;line-height: 160px;">您获得了</div>
   <div class="die">
     <img src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/prize2.png" style="width: 100%" @load="showText">

     <div v-show="show0" style="top: 30%;width: 100%;text-align: left"><span style="color: #d44c37;font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;{{name}}</span></div>

   </div>
    <div style="width: 100%;height: 20px"></div>
    <div class="dp-ok" @click="ok">确认</div>
    <dp-bottom></dp-bottom>

  </div>
</template>
<style>
  .die{

  width: 90%;
  position: relative;
  /*height: 100%;*/
  }
  .die div{
    position: absolute;
    font-size: 16px;
    writing-mode:horizontal-tb;
    transition: all .4s linear;
    color: black;
    font-weight: 800;
  }
</style>
<script>

    export default{
        data(){
            return{
                name:'',
              show0:false
            }
        },
        components:{

        },
      mounted:function(){
          this.init()
      },
      methods:{
        gocontinue(){
          this.$router.push('/AchieveGroup')
        },
        ok(){
          this.$router.push('/Total')
        },
        showText()
        {
         this.show0=true
        },
          init(){
            this.$http.get('/wx/public/getNameByOpenId.php?openId=' + this.$store.getters.openId).then((response) => {
             this.name = response.data
            }, (response) => {
              setTimeout(() => {
                this.init()
            },1500);
            })
          }
      }
    }
</script>

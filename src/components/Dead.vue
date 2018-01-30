<template>
  <div class="dp-register-bg" >
    <!--<dp-notice :progressCount="progressCount" style="flex-grow: 1" :progressLabel="progressLabel" :message="message"></dp-notice>-->
    <div style="width: 100%;height: 160px;font-size: 30px;font-weight: 800;text-align: center;line-height: 160px;">您获得了</div>
   <div class="die">
     <img src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/prize1.png" style="width: 100%" @load="showText">

     <div v-show="show0" style="top: 30%;width: 100%;text-align: left"><span style="color: #d44c37;font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;{{name}}</span></div>

   </div>
    <div style="width: 100%;height: 20px"></div>
    <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
      <div style="background: #C40E28;color: white;font-size: 20px;font-weight: 600;width:40%;height: 40px;line-height: 40px " @click="gocontinue">小组成就</div>
    </div>
    <!--<dp-message :messageShow.sync="messageShow" :messageText="messageText" :count.sync="timeCount"></dp-message>-->
    <!--<mt-popup v-model="popupVisible"-->
    <!--position="left" style="width: 100%;height: 100%;flex-grow: 0">-->
    <!--<dp-kill :controlShow.sync="popupVisible"></dp-kill>-->
    <!--</mt-popup>-->
    <!--<div class="dp-bottom" style="flex-grow: 1;">-->
      <!--<div class="dp-bottom-item">规则说明</div>-->
      <!--<div style="height: 35px;width: 1px;background-color: #8c8c8c"></div>-->
      <!--<div class="dp-bottom-item">发现之旅</div>-->
    <!--</div>-->
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

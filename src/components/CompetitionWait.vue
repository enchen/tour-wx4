<template xmlns="http://www.w3.org/1999/html">
  <div style="width: 100%;height: 100%">
    <transition name="fade">
  <div class="dp-register-bg" v-show="setup1">

    <div></div>
    <div style="display:flex;flex-direction: row;width: 80%;height: 60%;justify-content: space-between;">
      <!--<div style="width: 48%;height: 100%;display: flex;flex-direction:column;justify-content: flex-end">-->
        <!--<div @click="goInstruction" style="height:24%;background-image: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/gzsmbuton.svg');background-size: contain;background-position: 10px 0;background-repeat: no-repeat;"></div>-->
        <!--<div @click="goFXZL" style="margin-top:-5%;height:24%;background-image: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/fxzlbuton.svg');background-size: contain;background-position: 10px 0;background-repeat: no-repeat;"></div>-->
      <!--</div>-->
      <div style="height: 100%;width: 100%; background-image: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/competition_wait.svg');background-size: contain;background-position: 50% 50%;background-repeat: no-repeat;"></div>
    </div>
    <div class="dp-phone" style="display: flex;flex-direction: row;flex-wrap: wrap;font-size: 14px;">
      <input type="checkbox" v-model="agree" style="width: 16px;height: 16px;">我已阅读并同意<span style="color: #C40E28" @click="goSecret">《保密协议》</span><span style="color: white">内的所有条款。</span>
    </div>
    <div style="width: 100%;height: 20%;display: flex;justify-content: center;" @click="goSetup2">
      <div style="width: 14%;background-image: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/finger.svg');background-size: contain;background-position: 0px 0;background-repeat: no-repeat;"></div>
    </div>
    </div>
      </transition>
    <transition name="fade">
      <div style="width: 100%;height: 100%" v-show="setup2" :class="{ 'carAnimation': setup2 }">
        <transition name="fade">
    <div class="setupTwo1" v-show="setup21">
      <div></div>

      <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
      </div>
    </div>
          </transition>
        <transition name="fade">
          <div class="setupTwo2"  v-show="!setup21">
            <div></div>
           <div style="width: 62%;font-size: 18px;margin-top: 20%">
             法租界，望志路，李公馆<br>
             一栋普通的石库门建筑中<br>
             一场秘密的会议<br>
             召开在即
           </div>
            <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
              <div   class="dp-continue" @click="goSetup3">继续</div>
            </div>
          </div>
        </transition>
        <img class="car"  src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/car.png">
      </div>
      </transition>

    <transition name="fade">
      <div class="setupThree" v-show="setup3">
        <div></div>
        <transition name="fade">
          <div v-show="!showNote" style="width:86%;text-align: left;font-size: 18px;position: absolute;margin-top: 66%">
            身份：中共地下党上海情报组组长<br>
            姓名：不详<br>
            代号：惊蛰
            </div>
        </transition>
        <transition name="fade">
        <img v-show="showNote" style="width: 100%"  src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/setup1note.png">
          </transition>
        <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
          <div   class="dp-continue" @click="goCompetition">继续</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
  @keyframes carMove
  {
    from {left: 1800px;}
    to {left: -1800px;}
  }
  @-webkit-keyframes carMove /* Safari 和 Chrome */
  {
    from {left: 1800px;}
    to {left: -1800px;}
  }
  @keyframes carMove
  {
    from {left: 1800px;}
    to {left: -1800px;}
  }
  @-webkit-keyframes carMove /* Safari 和 Chrome */
  {
    from {left: 1800px;}
    to {left: -1800px;}
  }

  .car{
    left: 1800px;
    position: absolute;
    height: 100%;
  }
  .carAnimation .car{
    animation: carMove 4s;
    -webkit-animation: carMove 4s;	/* Safari 和 Chrome */
  }

.setupTwo1
{
  /*width: 100%;*/
  /*height: 100%;*/
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-image-repeat: no-repeat;
  background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/setup1bg1.jpg') 50% 50%;
  overflow: hidden;
  background-size:cover;
}
  .setupTwo2
  {
    /*width: 100%;*/
    /*height: 100%;*/
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image-repeat: no-repeat;
    background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/setup2bg2.jpg') 50% 50%;
    overflow: hidden;
    background-size:cover;
  }
  .setupThree
  {
    /*width: 100%;*/
    /*height: 100%;*/
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image-repeat: no-repeat;
    background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/setup1bg3.jpg') 50% 50%;
    overflow: hidden;
    background-size: cover;
  }
</style>
<script>
  import MessageBox from  'mint-ui/lib/message-box/index'
    export default{
        data(){
            return{
              agree: false,
              setup1:true,
              setup2:false,
              setup3:false,
              showNote:false,
              setup21:true
            }
        },
        components:{
        },
      methods:{
        goSecret(){
          this.$router.push('/Secret')
        },
        goSetup3(){
          this.setup2=false
          this.setup3=true
          setTimeout(() => {
           this.showNote=true
          },3000);
        },
          goSetup2(){
          if(!this.agree)
          {
            MessageBox.alert('请同意并勾选保密协议','提示')
            return
          }
            this.setup1=false
            this.setup2=true
            setTimeout(() => {
              this.setup21=false
            },1500);
          },
        goInstruction(){
          this.$router.push('/Instruction')
        },
        goFXZL(){
          this.$router.push('/FXZL')
        },
          goCompetition(){
            this.$http.get('/wx/public/goCompetition.php?openId=' + this.$store.getters.openId).then((response) => {
              let re = response.data
              if (re.flag == '0'){
                this.$router.push(re.router)
              }


            }, (response) => {
              console.info('获取验证码错误')
              // error callback
            })
          }
      }

    }
</script>

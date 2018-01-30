<template>
    <div style="width: 100%;height: 100%">
      <transition name="fade">
        <div class="run1" v-show="run1Show" >
          <div></div>
          <div>
            <div :class="{ 'showBlur': run1Words }">
            7月30日晚8点<br>
            李公馆一楼<br>
            代表们正讨论得如火如荼<br>
            </div>
            <transition name="fade">
            <div style="margin-top: 10px" v-show="run1Words">突然......</div>
              </transition>
          </div>
          <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
            <div   class="dp-continue" @click="goRun2">继续</div>
          </div>
        </div>
        </transition>

      <transition name="fade">

        <div class="run2" v-show="run2Show">
          <div style="width: 80%;margin-top: 30%">一身穿灰色外套的中年男子破门而入，而后迅速离开！</div>

          <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
            <div   class="dp-continue" @click="goRun3">继续</div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="run3" v-show="run3Show">
          <div></div>
          <transition name="fade">
            <img v-show="showNote" style="width: 100%"  src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/runnote.png">
          </transition>
          <div  style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
            <div   class="dp-continue" @click="submit">继续</div>
          </div>
        </div>
      </transition>

    </div>
</template>
<style scoped>
  .showBlur
  {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
  .run1
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
    background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/run1.jpg') 50% 50%;
    overflow: hidden;
    background-size:cover;
  }
  .run2
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
    background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/run2.jpg') 50% 50%;
    overflow: hidden;
    background-size:cover;
  }
  .run3
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
    background: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/run3.jpg') 50% 50%;
    overflow: hidden;
    background-size:cover;
  }

</style>
<script>

    export default{
        data(){
            return{
                run1Show:true,
              run1Words:false,
              run2Show:false,
              run3Show:false,
              showNote:false
            }
        },
      methods:{
        goRun2(){
          this.run1Words=true
          setTimeout(() => {
            //this.run1Words=false
            this.run1Show=false
            this.run2Show=true
          },2000);

        },
        goRun3(){
          this.run2Show=false
          this.run3Show=true
          setTimeout(() => {
            this.showNote=true
          },1000);
        },
        submit(){
          this.$router.push('/LineWait')
        }
      },
        components:{

        }
    }
</script>

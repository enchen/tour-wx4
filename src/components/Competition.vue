<template>
  <div class="backgroundBase" :class="background" >
   <dp-notice :background="background" :progressCount="progressCount" style="flex-grow: 1" :progressLabel="progressLabel" :message="message"></dp-notice>
    <transition name="fade">
      <router-view v-on:finish="finish"   :questionId="questionId" :isLeader="isLeader" :locationName="locationName"></router-view>

    </transition>
    <!--<dp-message :messageShow.sync="messageShow" :messageText="messageText" :count.sync="timeCount"></dp-message>-->
    <!--<mt-popup v-model="popupVisible"-->
              <!--position="left" style="width: 100%;height: 100%;flex-grow: 0">-->
     <!--<dp-kill :controlShow.sync="popupVisible"></dp-kill>-->
    <!--</mt-popup>-->
    <dp-bottom></dp-bottom>

    </div>
</template>
<style>

</style>
<script>
  import MessageBox from '../components/tools/MessageBox.vue'
  import Notice from  '../components/tools/DpNotice.vue'
//  import popUp from 'mint-ui/lib/popup/index'
//  import Slaughterhouse from  '../components/Slaughterhouse.vue'
//  import 'mint-ui/lib/popup/style.css'

    export default{
        data(){
            return{
//              popupVisible:false,
              timeOut:0,
              background:'background0',
              isLeader:'',
              questionId:'hello vue',
              progressCount:'0',
              progressLabel:'清查会场',
              message:'',
              locationName:''
//              timeCount:'false',
//              messageShow:'none',
//              messageText:''
            }
        },
        components:{
         'dp-notice':Notice,
          'dp-message':MessageBox
//          'mt-popup':popUp,
//          'dp-kill':Slaughterhouse
        },
      mounted:function(){
        this.getProgress()
      },
      methods:{
        finish(){
          this.getProgress()
        },
        getProgress()
        {
          this.$http.get('/wx/public/getProgress.php?&openId='+this.$store.getters.openId).then((response) => {
            let obj = response.data
            if (obj.flag == '-1') {
          this.showError(obj.msg)
        }
          if(obj.flag == '-4')
          {
            this.$router.push('/Dead')
          }
          if (obj.flag == '0') {

            // this.showError('请注意查收')progressLabel

            this.progressCount=obj.obj.progress
            if(this.progressCount<11)
            {
              this.progressLabel='清查会场'
            }
            else {
              this.progressLabel='紧急转移'
            }
            this.locationName=obj.obj.locationName
            this.questionId=obj.obj.questionId
            this.isLeader=obj.obj.isLeader
            this.background='background'+obj.obj.background
            this.$router.push(obj.router)
          }
            if(obj.flag == '10')
            {
              this.$router.push(obj.router)
            }
          if(obj.flag == '20')
          {
            this.progressLabel='紧急转移'
            this.progressCount=obj.obj.progress
            this.isLeader=obj.obj.isLeader
            this.background='background'+obj.obj.background
            this.$router.push('/Competition/Voice1')
          }
        }, (response) => {
          this.timeOut+=1
            if(this.timeOut>4)
            {
              return
            }
            setTimeout(() => {
              this.getProgress()
            },  1000);

          console.info('错误')
          // error callback
        })
        }
      }
    }
</script>

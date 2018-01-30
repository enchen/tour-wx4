<template>
  <div  class="dp-random-bg">
    <div style="width: 100%;height: 20px;"></div>
    <div style="width: 100%;"></div>
    <div>
      惊蛰已分派小组任务</br>
      请凭盖章处所获密件破解接头暗号</br>
      到思源书廊寻找接头人</br>
      扫码接收任务并领取补给
    </div>
    <div style="width: 100%;"><img :src="imgSrc" width="80%"></div>
  <!--<el-input  v-model="input" placeholder="任务名称" style="width: 80%;text-align-last: center;" maxlength="20"></el-input>-->
    <div style="display: flex;width:100%;height:80px;flex-direction: row;justify-content: space-around;align-items: center;">
      <div v-show="!choiceed" class="dp-scan"   @click="showQr">扫码</div>
      <div  v-show="choiceed" class="dp-continue"   @click="goContinue">继续</div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import MessageBox from  'mint-ui/lib/message-box/index'
    export default{
        data(){
            return{
              choiceed:false,
              imgSrc:'https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/sysl.jpg',
              input:'',
              stopAsk:false
            }
        },
        components:{

        },
      mounted:function () {
        this.ajaxRequest()
      },
      methods:{
        setInput(str){
          this.input=str
        },
        showQr(){
          let gg=this
         // alert('开始调用扫描')
         // this.input=window.location.href.split('#')[0]
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              gg.submit(res.resultStr) // 当needResult 为 1 时，扫码返回的结果
            }

          });
        },
        goContinue(){
          this.$router.push('/Competition')
        },
        ajaxRequest(){
          if(this.choiceed)
          {return}
          this.$http.get('/wx/public/getChoiceResult.php?&openId='+this.$store.getters.openId).then((response) => {
            let obj = response.data
            if(obj=='5') {

              let isWait=window.location.href.indexOf('LineWait')
              if(isWait<0)
              {
                return
              }
              this.$router.push('/Competition')
            }
            else {
              setTimeout(() => {
                this.ajaxRequest()
              }, 4000);
            }
          }, (response) => {
            console.info('初始化错误')
            setTimeout(() => {
              this.ajaxRequest()
            }, 4000);
          })

        },
        submit(qrText){
          if(qrText.length!=12)
          {
            return
          }
          this.$http.post('/wx/public/missionChoice.php',
            {
              openId: this.$store.getters.openId,
              groupId:qrText
            }).then((response) => {
            let re = response.data
            if(re.flag=='0')
            {
              this.choiceed=true
              MessageBox.alert('新任务已经分配！')
              this.imgSrc='https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/'+re.msg+'.png'

            }
          }, (response) => {
            MessageBox.alert('网络连接异常')
          })
        }
      }
    }
</script>

<template>
    <div style="display: flex;flex-direction: column;justify-content: space-between;align-items:center;color: white;width: 100%;height: 100%">
      <div v-for="judge in judges" @click="showDetail(judge)" style="width: 100%;height: 40px;font-size: 26px;color: white;background: green;line-height: 40px;">{{judge.questionId}}</div>
      <div>{{judgeDetail.describe}}</div>
      <img id="newPicture"  v-bind:src="judgeDetail.newPicture"  @load="newLoaded" v-bind:class="[newPictureShape>1 ? 'height70' : 'width90']">

      <mt-popup v-model="beforeVisible"
                position="left" style="width: 100%;height: 100%;flex-grow: 0">
        <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">
          <div style="width: 100%;height: 1%"></div>
          <img id="oldPicture"  v-bind:src="judgeDetail.oldPicture"  @load="oldLoaded" v-bind:class="[newPictureShape>1 ? 'height70' : 'width90']">
          <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content:center;align-items: center;">
            <div  class="dp-ok" @click="closePic(0)">确定</div>
          </div>
        </div>

      </mt-popup>
      <!--<mt-popup v-model="afterVisible"-->
                <!--position="right" style="width: 100%;height: 100%;flex-grow: 0">-->
        <!--<div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">-->
          <!--<div style="width: 100%;height: 1%"></div>-->

          <!--<div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content:center;align-items: center;">-->
            <!--<div  class="dp-ok" @click="closePic(1)">确定</div>-->
          <!--</div>-->
        <!--</div>-->

      <!--</mt-popup>-->
      <div style="width: 100%;height:80px;display: flex;flex-direction: row;justify-content:space-around;align-items: center;">
        <div  class="dp-ok" @click="openPic(0)">参考</div>
        <div  class="dp-ok" @click="goPass">通过</div>
        <div  class="dp-ok" @click="reject">不过</div>
        <!--<div  class="dp-ok" @click="openPic(1)">答案</div>-->
      </div>
    </div>
</template>
<style scoped>
  .height70
  {
    height: 70%;
  }
  .width90
  {
    width: 90%;
  }
</style>
<script>
  import popUp from 'mint-ui/lib/popup/index'
  import MessageBox from  'mint-ui/lib/message-box/index'
    export default{
        data(){
            return{
                judges:{},
              beforeVisible:false,
              afterVisible:false,
              selectedQuestionId:'',
              selectedJudge:{},
              judgeDetail:{},
              newPictureShape:0,
              oldPictureShape:0,
            }
        },
        components:{
          'mt-popup':popUp
        },
      mounted:function(){
      this.ajaxRequest()
      },
      methods:{
       oldLoaded(){
         let op=document.querySelector('#oldPicture')
         this.oldPictureShape=op.naturalHeight/op.naturalWidth
        },
        newLoaded(){
          let np=document.querySelector('#newPicture')
          this.newPictureShape=np.naturalHeight/np.naturalWidth
        },
        openPic(i){
          if(i==0)
          {
            this.beforeVisible=true
          }
          else {
            this.afterVisible=true
          }},
        closePic(i){
          if(i==0)
          {
            this.beforeVisible=false
          }
          else {
            this.afterVisible=false
          }

        },
        goPass(){
          let pass=GetQueryString('pass')
          MessageBox.confirm('确定此问题通过?').then(action => {
            this.$http.post('/wx/public/updateJudge.php',
              {
                questionId:this.selectedJudge.questionId,
                pictureType:this.selectedJudge.openId,
                picUrl:pass,
                status:'6'
              }).then((response) => {
              let re = response.data
              if(re!=1)
              {
                MessageBox.alert('网络连接异常')
              }
              else
              {
                this.judgeDetail={}
              }

            }, (response) => {
              MessageBox.alert('网络连接异常')
            })
          });
        },
        reject(){
          let pass=GetQueryString('pass')
          MessageBox.prompt('请输入原因').then(({ value, action }) => {
            this.$http.post('/wx/public/updateJudge.php',
              {
                questionId:this.selectedJudge.questionId,
                pictureType:this.selectedJudge.openId,
                picUrl:pass,
                status:'4',
                remark:value

              }).then((response) => {
              let re = response.data
              if(re!=1)
              {
                MessageBox.alert('网络连接异常')
              }
              else
              {
                this.judgeDetail={}
              }

            }, (response) => {
              MessageBox.alert('网络连接异常')
            })
          })

        },
        showDetail(judge)
        {
          this.selectedJudge=judge
          let pass=GetQueryString('pass')
          this.$http.get('/wx/public/getJudgeDetails.php?pass='+pass+'&questionId='+judge.questionId).then((response) => {
            this.judgeDetail= response.data

          }, (response) => {

          })
        },
        ajaxRequest(){
          let pass=GetQueryString('pass')
          this.$http.get('/wx/public/getJudges.php?&pass='+pass).then((response) => {
            let obj = response.data
            this.judges= obj
            setTimeout(() => {
              this.ajaxRequest()
            }, 4000);
          }, (response) => {
            console.info('初始化错误')
            setTimeout(() => {
              this.ajaxRequest()
            }, 4000);
          })

        }
      }
    }
</script>

<template>
  <div style="overflow-y: scroll;width: 100%;height: 80%;">
    <transition name="fade">
      <div v-show="preId.length>0"   style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
        <div v-html="preId"></div>
        <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
          <div   class="dp-continue" @click="goContinue">继续</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="preId.length==0"  style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
    <div v-html="mainDescribe.replace(/\n/g,'<br/>')" style="width: 100%;flex-grow: 1;"></div>
        <div>
          <div class="locationName">{{locationName}}</div>
          <div style="margin-top: 8px;display: flex;flex-direction: row;justify-content: space-around">
            <div class="dp-star" v-for="star in stars"></div>
          </div>
        </div>
    <!--<div v-for="picture in pictures" style="width: 100%;">-->
    <!--<img   :src="picture" style="width: 100%;flex-grow: 1;">-->
    <dp-image style="height: 20%"   :picUrl="pictureExample"  >
    </dp-image>
    <!--<img :src="pictureExample" style="height: 70%;flex-grow: 1;">-->
    <!--</div>-->
    <div style="width: 100%;height: 20px;flex-grow: 1;"></div>

    <div v-if="isLeader=='1'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <!--<div  class="dp-help" @click="help">求助</div>-->
      <div  class="dp-ok"   style="position: relative;" >选择
        <input id="file" type="file" accept="image/*" @change="imageChange" style="opacity: 0 ;position: absolute; right: 0;width: 90px;height: 30px;top: 0;" />
      </div>

    </div>
    <div v-if="isLeader=='0'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <el-button type="success"  @click="finish2">跟上队伍</el-button>
    </div>
    <mt-popup v-model="afterVisible"
              position="right" style="width: 100%;height: 100%;flex-grow: 0">
      <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">
<div style="width: 100%;height: 1%"></div>
        <img id="preView"  :src="picture" style="" v-bind:class="[imageShape>1 ? 'height70' : 'width90']">
        <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content:center;align-items: center;">
          <div v-show="countOver"   class="dp-ok" @click="showConfirm">确认</div>
          <div v-show="!countOver" style="height:30px;line-height: 30px;width:100%; ">照片审核中，请耐心等待</div>
          <dp-waiting v-show="!countOver" style="width: 90px;height: 30px"></dp-waiting>
        </div>
      </div>

    </mt-popup>
      </div>
    </transition>
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
//  import Lrz from 'lrz'
  import popUp from 'mint-ui/lib/popup/index'
  import Lrz from 'lrz'
  import MessageBox from  'mint-ui/lib/message-box/index'
  export default{
    data(){
      return{
        stars:[],
        ImgSrc:'',
        mainDescribe:'',
        picture:'',
        pictureExample:'',
        countOver:true,
        afterVisible:false,
        imageShape:0,
        preId:'载入中...',
        goon:false
      }
    },
    props:[
      'questionId',
      'isLeader',
      'background',
      'locationName'
    ],
    components:{
      'mt-popup':popUp
    },
//    watch:{
//      preId: function (val, oldVal) {
//        console.info('watch:'+val)
//      }
//    },
    mounted:function () {
      this.initQuestion()
      this.ajaxRequest()
    },
    methods:{
      goContinue(){
        this.preId=''
      },
      showConfirm(){
        MessageBox.confirm('将此照片上报组织？').then(action => {
        this.submit()
        }).catch(err => {
        this.afterVisible=false
        })
      },
      imageChange(){
       let vueObj=this

        if (typeof(document.querySelector('#file').files[0]) == "undefined")
        {
          return
        }
        let selectedPic=document.querySelector('#file').files[0]
        lrz(selectedPic)
          .then(function (rst) {

            let imgt = new Image();
            imgt.onload = function() {
              vueObj.imageShape=imgt.naturalHeight/imgt.naturalWidth
              console.info(vueObj.imageShape)
            }
            imgt.src=rst.base64
            vueObj.picture=rst.base64
            vueObj.afterVisible=true

          })
          .catch(function (err){
            console.info("失败："+err)
          })
          .always(function () {
            // 不管是成功失败，都会执行
          })


      },
      help(){
       alert('haha')
      },
      initQuestion(){

        this.$http.get('/wx/public/getWXQuestionJudge.php?&questionId='+this.questionId).then((response) => {
          let obj = response.data
          this.preId=obj.preId
          console.info('preId:'+this.preId.length)
          this.stars=[]
          if(obj.levelStar)
          {
            for(let k=0;k<obj.levelStar;k++)
            {
              this.stars[k]=k
            }
          }
          this.mainDescribe= obj.describe
          this.pictureExample=obj.picture

        }, (response) => {
          setTimeout(() => {
            this.initQuestion()
        }, 500)
          console.info('初始化错误')
          // error callback
        })
      },
      ajaxRequest(){
if(this.goon)
{return}
        this.$http.get('/wx/public/getJudgeResult.php?&questionId='+this.$store.getters.openId).then((response) => {
          let obj = response.data
          if(obj.status=='0')
          {
            this.countOver=false
            setTimeout(() => {
              this.ajaxRequest()
            }, 4000);
          }
         else if(obj.status=='6')
          {
             this.goAlert()
            return
          }
          else {
            if(obj.status=='4')
            {
              MessageBox.alert(obj.remark,'判定失败啦')
              this.countOver=true
              this.afterVisible=false
            }

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
      goAlert(){
        MessageBox.alert('确认任务完成！请同志们继续').then(action => {
          this.finish()
        })

      },
      finish(){
        this.mainDescribe=''
       this.$emit('finish')
      },
      finish2(){
        this.goon=true
        this.$emit('finish')
      },
      submit(){
       this.countOver=false
        this.$http.post('/wx/public/answerJudge.php',
          {
            questionId:this.questionId,
            pictureType: this.$store.getters.openId,
            picUrl:this.picture
          }).then((response) => {
          let re = response.data
          if(re!=1)
          {
            this.countOver=true
            MessageBox.alert('网络连接异常')
          }
          else
          {

          }

        }, (response) => {
          this.countOver=true
          MessageBox.alert('网络连接异常')
        })

      }
    }
  }
</script>

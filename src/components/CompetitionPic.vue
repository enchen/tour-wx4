<template>
  <div style="width: 100%;height: 80%;">

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
      <div style="height: 20%;position: relative;">
    <dp-image  v-for="picture in pictures"  :picUrl="picture.picUrl"  v-if="picture.pictureType=='0'" style="height: 100%;flex-grow: 1;">
      </dp-image>

        </div>

    <div  v-for="picture in pictures"  style="position: absolute;z-index: 40;"  v-show="picture.pictureType=='0'&&showOK">
      <img id="showImg" :src="picture.picUrl" v-show="showOK" style="width: 100%;flex-grow: 0">
      <div class="pinter" v-for="point in showList" :style="{left:point.width+'px',top:point.height+'px'}">
    </div>
      </div>
    <!--</div>-->
    <div style="width: 100%;height: 20px;flex-grow: 1;"></div>
    <el-input  v-if="isLeader=='1'" v-model="input" placeholder="阿拉伯数字" style="width: 80%;text-align-last: center;flex-grow: 1;" maxlength="2" value="number"></el-input>
    <div v-if="isLeader=='1'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <div  class="dp-help" @click="help">求助</div>
      <div v-show="countOver"  class="dp-ok"   @click="submit">确认</div>
      <dp-waiting v-show="!countOver" style="width: 90px;height: 30px"></dp-waiting>
    </div>
    <div v-if="isLeader=='0'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <el-button type="success" @click="finish2">跟上队伍</el-button>
    </div>
    <mt-popup v-model="popupVisible"
              position="left" style="width: 100%;height: 100%;flex-grow: 0">
      <dp-kill :controlShow.sync="popupVisible" :questionType="questionType" :questionId="questionId" :input.sync="input"></dp-kill>
    </mt-popup>
    <mt-popup v-model="afterVisible"
              position="right" style="width: 100%;height: 100%;flex-grow: 0">
      <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">

        <img v-for="picture in pictures"  :src="picture.picUrl" v-if="picture.pictureType=='1'" style="width: 90%;flex-grow: 1;">
        <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;flex-grow: 1;">
          <div   class="dp-ok" @click="finish">确认</div>
        </div>
      </div>

    </mt-popup>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.pinter{
  position: absolute;
  /*width: 6px;*/
  /*height: 6px;*/
  /*background-color: red;*/
  width: 40px;
  height:40px;
  background-image: url('https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/printer.svg');
  background-size: contain;
  background-position: 0px 0;
  background-repeat: no-repeat;
}
</style>
<script>
  import popUp from 'mint-ui/lib/popup/index'
  import Slaughterhouse from  '..//components/Slaughterhouse.vue'
  import MessageBox from  'mint-ui/lib/message-box/index'
  export default{
    data(){
      return{
        stars:[],
        timeOut:0,
        countOver:true,
        timeCount:0,
        afterVisible:false,
        popupVisible:false,
        questionType:'',
        input:'',
        mainDescribe:'',
        pictures:{},
        points:{},
        showList:[],
        varImg:null,
        showOK:false,
        okPicUrl:'',
        preId:'载入中...'
      }
    },
    props:[
      'questionId',
      'isLeader',
      'background',
      'locationName'
    ],
    components:{
      'mt-popup':popUp,
      'dp-kill':Slaughterhouse
    },
    watch: {
      questionId: function (val, oldVal) {
        if(val!=oldVal)
        {
          this.initQuestion()
        }
      }
    },
    mounted:function () {
      this.initQuestion()
    },
    methods:{
      goContinue(){
        this.preId=''
      },
      help(){
        // alert(this.questionType)
        this.popupVisible=this.popupVisible==true?false:true
      },
      initQuestion(){
        this.$http.get('/wx/public/getWXQuestionPic.php?&questionId='+this.questionId).then((response) => {
          let obj=response.data
          this.preId=obj.preId
          this.mainDescribe= obj.describe
          this.questionType=obj.questionType
          this.pictures=obj.pictures
          this.points=obj.points
          this.stars=[]
          if(obj.levelStar)
          {
            for(let k=0;k<obj.levelStar;k++)
            {
              this.stars[k]=k
            }
          }
        }, (response) => {
          this.timeOut+=1
          if(this.timeOut>4)
          {
            return
          }
          setTimeout(() => {
            this.initQuestion()
          }, 1500);
          console.info('初始化错误')
          // error callback
        })
      },
//        help()
//        {
//           this.$emit('help')
//        },
      finish(){
        this.afterVisible=false
        this.mainDescribe=''
        this.input=''
        this.pictures=''
        this.$emit('finish')
      },
      finish2(){
        this.$http.get('/wx/public/getAfterProgress.php?&openId='+this.$store.getters.openId).then((response) => {
          let obj = response.data
          if(obj.flag=='0')
          {
            if(obj.msg.length>5&&obj.msg!=this.questionId)
            {
              for(let i=0;i<this.pictures.length;i++)
              {
                let picture=this.pictures[i]
                // console.info('out'+picture.pictureType)
                if(picture.pictureType=='1')
                {
                  // console.info('in'+picture.pictureType)
                  this.afterVisible=true
                  // console.info('in'+this.afterVisible)
                  return
                }
              }
              this.$emit('finish')
            }
          }
        }, (response) => {
          console.info('错误')
          setTimeout(() => {
            this.finish2()
          }, 1500);


        })
      },
      showPoint(point){
        let mar=20
        let newPoint={width:(point.sx*this.varImg.width-mar),height:(point.sy*this.varImg.height-mar)}
        this.showList.push(newPoint)
      },
      goAlert(){
        MessageBox.alert('确认任务完成！请同志们继续').then(action => {

          // this.questionType=obj.questionType
          //console.info(this.pictures.length)
          this.showList=[]
          for(let i=0;i<this.pictures.length;i++)
          {
            let picture=this.pictures[i]
           // console.info('out'+picture.pictureType)
            if(picture.pictureType=='1')
            {
              //console.info('in'+picture.pictureType)
              this.afterVisible=true
              //console.info('in'+this.afterVisible)
              return
            }
          }
          console.info('到达finish')
          this.finish()
        })
      },
      submit(){
        if(this.input=='')
        {
          return
        }
        this.$http.post('/wx/public/answerPic.php',
          {
            questionId:this.questionId,
            openId: this.$store.getters.openId,
            answer:this.input
          }).then((response) => {
          let re = response.data
          console.info(re)
          if(re.flag==0)
          {
            this.showOK=true
            this.varImg= document.querySelector("#showImg")
            console.info('1:'+this.varImg)
            let tem=this.points.length
            for(let k=0;k<tem+1;k++)
            {
             if(k==tem)
             {
               setTimeout(() => {
                 this.goAlert()
               }, k * 500+2000);

               return
             }
             else {
               setTimeout(() => {
                 this.showPoint(this.points[k])
               }, k * 500);

             }

            }
            this.goAlert()

          }
          else if(re.flag=='-2'){
            this.input=''
            this.timeCount=60
            // MessageBox.alert('任务失败！请在'+this.timeCount+'秒后重新执行任务')
            this.countOver=false
            //console.info(this.countOver)
            MessageBox.alert('任务失败！请在'+this.timeCount+'秒后重新执行任务','失败');
            for (let i = 0; i < 60; i++) {
              setTimeout(() => {
                this.timeCount--
                if (this.timeCount == 0) {
                  this.countOver=true
                }
              }, i * 1000);
            }

          }
        }, (response) => {
          //this.showError('连接错误')
        })

      }
    }
  }
</script>

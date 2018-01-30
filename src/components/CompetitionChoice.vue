<template>
  <div style="overflow-y: scroll;width: 100%;height:80%;">
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
    <div class="options">
      <div  @click="select('1')"  v-if="option1!=''" v-bind:class="[option1Selected ? 'selected' : 'disSelected']">{{option1}}</div>
      <div  @click="select('2')"  v-if="option2!=''" v-bind:class="[option2Selected ? 'selected' : 'disSelected']">{{option2}}</div>
      <div  @click="select('3')"  v-if="option3!=''" v-bind:class="[option3Selected ? 'selected' : 'disSelected']">{{option3}}</div>
      <div  @click="select('4')"  v-if="option4!=''" v-bind:class="[option4Selected ? 'selected' : 'disSelected']">{{option4}}</div>
      <div  @click="select('5')"  v-if="option5!=''" v-bind:class="[option5Selected ? 'selected' : 'disSelected']">{{option5}}</div>
    </div>
    <div v-if="isLeader=='1'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <div  class="dp-help" @click="help">求助</div>
      <div v-show="countOver"  class="dp-ok"   @click="submit">确认</div>
      <dp-waiting v-show="!countOver" style="width: 90px;height: 30px"></dp-waiting>
    </div>
    <div v-if="isLeader=='0'" style="display: flex;width:100%;flex-direction: row;justify-content: space-around;align-items: center;flex-grow: 1;">
      <el-button type="success"  @click="finish2">跟上队伍</el-button>
    </div>
    <mt-popup v-model="popupVisible"
              position="left" style="width: 100%;height: 100%;flex-grow: 0">
      <dp-kill :controlShow.sync="popupVisible" :questionType="questionType" :questionId="questionId" :input.sync="input"></dp-kill>
    </mt-popup>
    <mt-popup v-model="afterVisible"
              position="right" style="width: 100%;height: 100%;flex-grow: 0">
      <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">

        <img   :src="afterPicture"  style="width: 90%;flex-grow: 1;">
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
.options{
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.options div{
  text-indent: 10px;
  width: 80%;
  height: 36px;
  margin-top: 8px;
  border-radius:4px;


  font-size: 20px;
  line-height: 36px;
  text-align: left;
}
  .disSelected{
    color: #959595;
    background: white;
  }
  .selected{
    color: white;
    background: #C40E28;
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
              option1:'',
              option2:'',
              option3:'',
              option4:'',
              option5:'',
              option1Selected:false,
              option2Selected:false,
              option3Selected:false,
              option4Selected:false,
              option5Selected:false,
              countOver:true,
              timeCount:0,
              afterVisible:false,
              popupVisible:false,
              questionType:'',
              input:'',
              mainDescribe:'',
              afterPicture:'',
              preId:'载入中...'

            }
        },
        components:{
          'mt-popup':popUp,
          'dp-kill':Slaughterhouse
        },
      props:[
        'questionId',
        'isLeader',
        'background',
        'locationName'
      ],
      watch:{
        questionId: function (val, oldVal) {
          if(val!=oldVal)
          {
            this.initQuestion()
          }
        },
        input: function (val, oldVal) {
          if(val!=oldVal)
          {
            this.reSelect()
          }
        }
      },
      mounted:function(){
          this.initQuestion()
      },
      methods:{
        goContinue(){
          this.preId=''
        },
        reSelect()
        {
          if(this.input=='')
          {
            return
          }
          if(this.input.indexOf("1") >-1)
          {
            this.option1Selected=true
          }
          else {
            this.option1Selected=false
          }
          if(this.input.indexOf("2") >-1)
          {
            this.option2Selected=true
          }
          else {
            this.option2Selected=false
          }
          if(this.input.indexOf("3") >-1)
          {
            this.option3Selected=true
          }
          else {
            this.option3Selected=false
          }
          if(this.input.indexOf("4") >-1)
          {
            this.option4Selected=true
          }
          else {
            this.option4Selected=false
          }
          if(this.input.indexOf("5") >-1)
          {
            this.option5Selected=true
          }
          else {
            this.option5Selected=false
          }
        },
        select(option){
       switch(option)
       {
         case '1':
           this.option1Selected=!this.option1Selected
               break
         case '2':
           this.option2Selected=!this.option2Selected
           break
         case '3':
           this.option3Selected=!this.option3Selected
           break
         case '4':
           this.option4Selected=!this.option4Selected
           break
         case '5':
           this.option5Selected=!this.option5Selected
           break
       }
        },
        help(){
          // alert(this.questionType)`
          this.popupVisible=this.popupVisible==true?false:true
        },
        initQuestion(){
          this.$http.get('/wx/public/getWXQuestionChoice.php?&questionId='+this.questionId).then((response) => {
            let obj=response.data
            this.stars=[]
            if(obj.levelStar)
            {
            for(let k=0;k<obj.levelStar;k++)
            {
              this.stars[k]=k
            }
            }
            this.preId=obj.preId
            this.mainDescribe= obj.describe
            this.questionType=obj.questionType
            this.afterPicture=obj.picUrl
            this.option1=obj.option1
            this.option2=obj.option2
            this.option3=obj.option3
            this.option4=obj.option4
            this.option5=obj.option5
            this.option1Selected=false
            this.option2Selected=false
            this.option3Selected=false
            this.option4Selected=false
            this.option5Selected=false

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
        finish(){
          this.afterVisible=false
          this.mainDescribe=''
          this.input=''
          this.afterPicture=''
          this.$emit('finish')
        },
        finish2(){

          this.$http.get('/wx/public/getAfterProgress.php?&openId='+this.$store.getters.openId).then((response) => {
            let obj = response.data
            if(obj.flag=='0')
            {
              if(obj.msg.length>5 && obj.msg!=this.questionId)
              {
                if(this.afterPicture!=null&&this.afterPicture!='null'&&this.afterPicture!='')
                {
                  this.afterVisible=true
                  return
                }
                this.$emit('finish')
              }

            }
          }, (response) => {
            console.info('错误')
            setTimeout(() => {
              this.finish2()
            }, 500);


          })

        },
        combinationAnswer(){
          let re=''
          if(this.option1Selected)
          {
            re+='1'
          }
          if(this.option2Selected)
          {
            re+='2'
          }
          if(this.option3Selected)
          {
            re+='3'
          }
          if(this.option4Selected)
          {
            re+='4'
          }
          if(this.option5Selected)
          {
            re+='5'
          }
          return re
        },
        submit(){
          this.input=this.combinationAnswer()

          if(this.input=='')
          {
            return
          }
          this.$http.post('/wx/public/answerChoice.php',
            {
              questionId:this.questionId,
              openId: this.$store.getters.openId,
              answer:this.input
            }).then((response) => {
            let re = response.data
            console.info(re)
            if(re.flag==0)
            {
              MessageBox.alert('确认任务完成！请同志们继续').then(action => {

                  if(this.afterPicture!=null&&this.afterPicture!='null'&&this.afterPicture!='')
                  {
                    this.afterVisible=true
                    return
                  }

                this.finish()
              })
            }
            else if(re.flag=='-2'){
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

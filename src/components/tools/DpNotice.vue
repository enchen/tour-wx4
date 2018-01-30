<template>
  <div style="width: 100%;height: 40px;">
    <div class="dp-top" style="color: white;padding-left: 20px">
      <vue-marquee :content="showMessage" speed="10"></vue-marquee>
    </div>
  <div class="progress">
<div class="progressBar" style="text-align: right;transition: width 1s;-webkit-transition: width 1s" :style="{width:width1+'%'}">{{width1}}%&nbsp;</div>
 <div style="text-align: left;transition: width 1s;-webkit-transition: width 1s"  :style="{width:width2+'%'}"> &nbsp;</div>
  </div>
  </div>
</template>
<style scoped>
.dp-top
{
  color:white;
  background-color: #333333;
}
.progressBar
{
  background-color: #C40E28;
}
  .progress
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    color: #959595;
    font-size: 12px;
    line-height: 20px;
    width: 100%;
    height: 20px;
    overflow: hidden;
    background: #4d4d4d;
  }
</style>
<script>
  import MarqueeTips from 'vue-marquee-tips'
    export default{
        data(){
            return{
              showMessage:'',
              messages:[],
              beginIndex:0
            }
        },
      mounted:function(){
        let initMessages=new Array()
        initMessages[0]='行动保密，小心行事！'
        initMessages[1]='情况危急，抓紧时间！'
        initMessages[2]='团结协作，共克难关！'
        initMessages[3]='应社会之急需，响时代之召唤！'
        initMessages[4]='为伟大的共产主义事业而奋斗！'
        initMessages[5]='为天地立心，为生民立命，为往事继绝学，为万世开太平。'
        this.messages=initMessages
        this.brainWash()
      },
      components:{
        'vue-marquee':MarqueeTips
      },
      props: ['progressCount','progressLabel','message'],
      computed: {
          width1(){
            return Math.round(((this.progressCount-1)/17)*100)
          },
          width2(){
            return Math.round(((18-this.progressCount)/17)*100)
          }
      },
        methods:{
          brainWash(){
            this.showMessage=this.messages[this.beginIndex]
            if(this.beginIndex==5)
            {
              this.beginIndex=0
            }
            else {
              this.beginIndex++
            }
            setTimeout(() => {
              this.brainWash()
          },30000);
          }
        }
    }
</script>

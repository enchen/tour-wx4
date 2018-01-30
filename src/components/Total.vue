<template>
  <div class="dp-register-bg" style="justify-content: space-around" >
    <div style="font-size: 34px;">成功完成会师</div>
    <div>你们是<span style="color:#C40E28 ">第{{total.ranking}}组</span>到达的队伍</div>
    <div class="rankingMain">
      <div>任务难度分<div>+{{total.difficulty}}</div></div>
      <div>完成速率值<div>+{{total.speed}}</div></div>
      <div>团队完整度<div>+{{total.team}}</div></div>

      <div style="height: 1px;background: lightgray;margin-top: 10px;margin-bottom: 10px"></div>
      <div>小组总得分<div style="background: white;color:  #C40E28;">+{{total.total}}</div></div>
      <div style="background:  #C40E28;margin-top: 16px;text-align: center" @click="goGlory">查看实时荣誉榜</div>
      <div style="background:  #C40E28;margin-top: 16px;text-align: center" @click="goAchieve">查看小组成就</div>
      <div style="font-size: 14px;text-align: center;">最终排名将在所有小组完成会师后产生</div>
      <div style="margin-top: 10px;font-size: 14px;text-align: center;">点击查看<span style="color:#C40E28 " @click="goRule">评分规则</span></div>
    </div>
    <div class="dp-ok" @click="ok">确认</div>
    </div>
</template>
<style scoped>
.rankingMain{width: 80%}
  .rankingMain div{
    width: 100%;
    text-align: left;
    position: relative;
    height: 30px;
    line-height: 30px;
  }
  .rankingMain div div{
    position: absolute;
    right: 5px;
    top: 5px;
    line-height: 20px;
    height: 20px;
    width: 40px;
    text-align: center;
    background: #C40E28;
  }
</style>
<script>

    export default{
        data(){
            return{
                total:{}
            }
        },
        components:{

        },
      methods:{
          goGlory(){
            this.$router.push('/GloryList')
          },
        goRule(){
          this.$router.push('/ScoreRole')
        },
          goAchieve(){
            this.$router.push('/AchieveGroup')
          },
        ok(){
          this.$router.push('/ThankYou')
        },
          initTotal(){
            let openId=this.$store.getters.openId
            this.$http.get('/wx/public/getTotal.php?openId='+openId).then((response) => {
             this.total=response.data
            }, (response) => {
              // error callback
            })
          }
      },
      mounted:function(){
        this.initTotal();
      }
    }
</script>

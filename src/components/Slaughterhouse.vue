<template xmlns="http://www.w3.org/1999/html">
    <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content:space-between;align-items:center;background-color:#5b1a16">
      <div style="width: 100%;height: 80px;display: flex;flex-direction: column;justify-content: flex-end;align-items: center"><div style="font-size: 30px;font-weight: 400">求助</div></div>
      <div class="members">
        <div class="member" v-for="user in users">
            <img :src="user.headimgurl" height="40" width="40" style="border-radius: 50%" @click="help(user)">
          <div class="member2" v-if="!user.alive">牺牲</div>
          <div class="isLeader" v-else-if="user.isLeader=='1'"  @click="help(user)">免费求助</div>
        </div>
      </div>
      <div style="font-size: 14px;line-height: 18px;">
        每组共有一次免费向后台求助的机会；</br>
        点击“<span style="color: #C40E28">免费求助</span>”并确认，即可获得当前题目的正确答案。</br>
        </br>
        免费求助使用完毕可以通过“牺牲”的方式获取更多求助机会；</br>
        点击<span style="color: #C40E28">组员头像</span>并确认即“牺牲”该名组员，获取当前题目答案；</br>
        牺牲组员不再接收后续任务消息；</br>
        牺牲组员仍可继续与其他组员一起完成比赛。</br>
      </div>
      <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center">
        <div class="dp-ok" @click="close">确认</div>
      </div>
    </div>
</template>
<style scoped>
.members{
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.member{
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.member2{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0.8;
  background-color: palevioletred;
  margin-top: -40px;
}
.isLeader{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: yellow;
  margin-top: -40px;
  color: black;
  font-size: 14px;
  font-weight: 900;
  line-height: 15px;

}
img{

}
</style>
<script>

  import 'mint-ui/lib/popup/style.css'
  import MessageBox from  'mint-ui/lib/message-box/index'
    export default{
        data(){
            return{
               users:{}
            }
        },
        components:{

        },
      mounted:function(){
       this.init()
      },
      props:['controlShow','questionType','questionId','input'],
      methods:{
        help(user){
          if(user.isLeader=='1')
          {
            MessageBox.confirm("组织送来一份密件","密报").then(action => {
              this.kill(user)
            })
          }
          else{
            MessageBox.confirm("是否“牺牲”"+user.realName+"，换取求助机会？").then(action => {
              this.kill(user)
            })
          }
        },
        kill(user){

            this.$http.post('/wx/public/kill.php',
              {
                questionType:this.questionType,
                questionId:this.questionId,
                leaderId: this.$store.getters.openId,
                openId:user.openId
              }).then((response) => {
              let re = response.data

              if(re.flag==0)
              {
               this.bury(user.openId)
                this.$emit('update:input','')
                MessageBox.alert(re.obj.tips,'密件内容').then(action => {

                  this.$emit('update:input', re.obj.answer)
                  this.close()
                })
                //this.$router.push(re.router)
              }
              else if(re.flag=='2')
             {
               MessageBox.alert('本题不能通过牺牲通过','无效')
             }

              else {
                console.info('error')
              }
            }, (response) => {
              console.info('error2')
            })
          // alert(this.questionType+'ok'+this.questionId)
          //alert(user.openId)
        },
        bury(openId){
          //let temUsers;
          for(var i=0;i<this.users.length;i++)
          {
            if(this.users[i].openId==openId)
            {
              let newUser=this.users[i]
              newUser.alive=false
            }
          }
        },
        close(){
          this.$emit('update:controlShow', false)
        },
        init(){
          let openId=this.$store.getters.openId
          this.$http.get('/wx/public/getTeam.php?openId='+openId).then((response) => {
            let obj=response.data
            this.users=obj.users
          }, (response) => {
            setTimeout(() => {
              this.init()
            }, 2000);

          })
        }
      }
    }
</script>

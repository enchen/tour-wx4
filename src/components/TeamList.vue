<template>
  <div class="dp-register-bg"  style="justify-content: flex-start">
    <div class="dp-top">
      完成注册，一起开启发现之旅！
    </div>
    <div style="margin-top: 15%">
      <div style="font-size: 30px;font-weight: 800"> {{teamName}}</div>
      <div v-if="option=='移除'">履行<span style="color: #C40E28">组长职责</span>，避免无关人员进组</div>
    </div>
    <div class="users">
      <div class="user-item" v-for="user in users">
      <div class="user-head">

         <img :src="user.headimgurl" height="40" width="40" style="border-radius: 50%">

        <div style="width: 80px;line-height: 40px;">{{user.realName}}</div>
      </div>
        <div style="width: 42px;height: 26px;line-height: 26px;color: #c40e28;background-color: white;" v-if="user.isLeader=='1'">组长</div>
        <div style="width: 42px;height: 26px;line-height: 26px;background-color: #c40e28" v-if="user.isLeader=='0'" @click="remove(user.openId)">{{option}}</div>
      </div>
    </div>
    <div style="width: 100%;height: 12px;">
      <transition name="fade">
        <div style="font-size: 12px;color: yellow" v-if="errorMsg.length>0">{{errorMsg}}</div>
      </transition>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="small">
      <span>确认将队友移出队伍？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goRemove">确 定</el-button>
  </span>
    </el-dialog>
    </div>

</template>
<style scoped>
  .user-head{
  display: inline-flex;
    width: 180px;
    height: 100%;
    align-items: center;
  }
  .user-item{
    align-items: center;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
  }
.users{
  margin-top: 30px;
  width: 74%;
}
</style>
<script>

    export default{
        data(){
            return{
              dialogVisible:false,
              teamName:'',
              users:{},
              option:'',
              errorMsg: '',
              selectedId:''
            }
        },
        components:{

        },
      mounted:function(){
          this.init()
      },
      methods:{
        showError(error){
          this.errorMsg = error
          setTimeout(() => {
            this.errorMsg = ''
          }, 2000);
        },
        goRemove()
        {
          if(this.option=='移除')
          {
            this.$http.post('/wx/public/removeCustomer.php',
              {
                operateId:this.selectedId,
                openId: this.$store.getters.openId
              }).then((response) => {
              let re = response.data
              if(re.flag==0)
              {
                let tem=this.users
                for(let i=0;i<tem.length;i++)
                {
                  if(tem[i].openId==this.selectedId)
                  {
                    tem.splice(i,1)
                    break
                  }
                }
                this.users=tem
                this.dialogVisible=false
                this.showError('移除成功')
              }
              else {
                this.dialogVisible=false
                this.showError('移除失败')
              }
            }, (response) => {
              this.dialogVisible=false
              this.showError('移除失败')
            })
          }
        },
        remove(openId){
          if(this.option=='组员')
          {
            //alert(this.option)
            return
          }
          this.selectedId=openId
          this.dialogVisible=true
        },
          init(){
             let openId=this.$store.getters.openId
            this.$http.get('/wx/public/getTeam.php?openId='+openId).then((response) => {
              //alert('bb')
              let obj=response.data
              this.teamName=obj.teamName
              this.users=obj.users
              if(obj.leaderId==this.$store.getters.openId)
              {
                this.option='移除'
              }
              else
              {
                this.option='组员'
              }
              //console.info(this.teamName+this.users.length)
              //alert(obj.msg)
              //this.imgUrl=obj
            }, (response) => {
              console.info('获取图片地址错误')
              // error callback
            })
          }
      }
    }
</script>

<template>
  <div class="dp-register-bg" >
    <div class="dp-top">
      完成注册，一起开启发现之旅！
    </div>
    <div>
      <div style="font-size: 30px;font-weight: 800">身份已确认</div>
      <div>请将此页截屏发送给组员，邀请入组</div>
    </div>
     <img :src="imgUrl" width="400px" style="width: 74%;margin: 0 auto;margin-top:20px;">
    <div style="width: 74%;height: 30px;font-size: 20px;font-weight: 800;background-color: #C40E28" @click="seeMyTeam">查看我的小组</div>
    <div class="dp-bottom" style="background: transparent;">
   </div>
    </div>
</template>
<style>

</style>
<script>
 //import 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
    export default{
        data(){
            return{
               imgUrl:''
            }
        },
        components:{

        },
      mounted: function (){
        setTimeout(this.initImage,2000)
      },
      methods:{
        seeMyTeam(){
          this.$router.push('TeamList')
        },
        initImage(){
         // alert(this.$store.getters.openId)
          this.$http.get('/wx/public/getQrCode.php?openId='+this.$store.getters.openId).then((response) => {
            //alert('bb')
            let obj=response.data
            //alert(obj.msg)
            this.imgUrl=obj
          }, (response) => {
            console.info('获取图片地址错误')
            // error callback
          })
        }
      }
    }
</script>

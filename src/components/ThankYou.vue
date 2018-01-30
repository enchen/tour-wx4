<template>
  <div class="dp-register-bg" style="justify-content: space-around" >
    <div style="font-size: 34px;">感谢你们</div>
    <div>
      <div>将发现之旅</div>
      <div>将上海-遵义的征途</div>
      <div>向前推进了</div>
    </div>
    <div>
    <div style="color:#C40E28;font-size: 54px ">{{distance}}<span style="font-size: 30px;color:#C40E28; ">m</span></div>
      <div style="font-size: 22px;font-weight: bold;">里程</div>
    </div>
    <div style="background:  #C40E28;width: 70%;height: 30px;line-height: 30px" @click="goSee">查看我的光荣证</div>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                distance:''
            }
        },
        components:{

        },
      methods:{
        goSee(){
          this.$router.push('/Dead2')
        },
        init(){
          let openId=this.$store.getters.openId
          this.$http.get('/wx/public/getDistance.php?openId='+openId).then((response) => {
            this.distance=response.data
          }, (response) => {
            // error callback
          })
        }
      },
      mounted:function() {
        this.init()
      }
    }
</script>

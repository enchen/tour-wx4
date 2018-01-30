<template>
    <div style="width: 100%;height: 100%;background: #501715">
    <img :src="imgUrl" width="100%">
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
              aUrl:'https://wx.detoursh.com/',
              imgUrl:'',
              achieveType:''
            }
        },
      mounted:function () {
        this.init()
      },
      methods:{
        init(){
          let achieve = GetQueryString('achieve')
          this.achieveType=achieve
          //this.shareToFriend()
          this.imgUrl=this.aUrl+'share/'+achieve+'share.jpg'
        },
        shareToFriend(){

        }
        }
    }
</script>

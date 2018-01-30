<template>
  <div id="app" style="position: absolute;
       font-size: 18px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;">

    <transition name="fade">
    <router-view></router-view>
      </transition>
  </div>
</template>
<style>
  /*@font-face {*/
    /*font-family: 'myFont';*/
    /*font-style: normal;*/
    /*font-weight: 400;*/
    /*src:*/
      /*url(assets/font.ttf) format('truetype')*/
  /*}*/

</style>
<script>
export default {
  name: 'app',
  mounted:function()
  {
    this.checkLogin()
  },
  methods:{
    checkLogin(){
      let wxcode=GetQueryString('code')
      //alert(wxcode)
      if(!wxcode)
      {
        return
      }
      this.$http.get('/wx/public/wxLogin.php?code='+wxcode+'&durl='+encodeURIComponent(window.location.href.split('#')[0])).then((response) => {
        //alert('bb')
        let path=response.data.router
        let obj=response.data.obj
        //console.info("set openId",obj.msg)
        this.$store.dispatch('openId',obj[0])

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: obj[2], // 必填，公众号的唯一标识
          timestamp: obj[3], // 必填，生成签名的时间戳
          nonceStr: obj[4], // 必填，生成签名的随机串
          signature: obj[5],// 必填，签名，见附录1
          jsApiList: ['hideMenuItems',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'getLocation',
            'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        setTimeout(() => {
          this.$router.push(path)
        },1000);
//        alert(obj[0])
//        alert(obj[1])



      }, (response) => {
        console.info('连接服务器错误')
        setTimeout(() => {
          this.checkLogin()
        }, 1000);

      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

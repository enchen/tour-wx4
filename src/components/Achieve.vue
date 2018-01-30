<template>
  <div class="dp-register-bg">
    <div></div>
<div style="width: 100%"><img src="https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/achieveTitle.svg" width="82%"></div>
    <div style="width: 100%">
      <img :src="picUrl" width="54%">
    </div>
    <div v-if='achieveType=="achieveSSQY"'>
<div></div>
      <div  style="font-size: 16px;">有组员为革命事业<span style="color:red">“牺牲”</span></div>
      <div style="font-size: 22px;font-weight: 800;">稳住，我们能赢！</div>
    </div>
    <div v-if='achieveType=="achieveGJFZ"'>
      <div  style="font-size: 16px;">组员全部<span style="color: red">“牺牲”</span></div>
      <div style="font-size: 22px;font-weight: 800;">请允悲...</div>
    </div>
    <div v-if='achieveType=="achieveLLFX"'>
      <div  style="font-size: 16px;">最快完成<span style="color: red">清查会场</span>任务</div>
      <div style="font-size: 22px;font-weight: 800;">还！有！谁！</div>
    </div>
    <div v-if='achieveType=="achieveXSND"'>
      <div style="font-size: 16px;">清查会场任务过半</div>
      <div style="font-size: 22px;font-weight: 800;">就是这个节奏!</div>
    </div>
    <div style="width: 100%;height:30px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
      <div style="background: #C40E28;color: white;font-weight: 600;height: 30px;line-height: 30px ">&nbsp;点击右上角...&nbsp;展示成就！&nbsp;</div>
    </div>
    <img :src="saveUrl" style="position: absolute;width: 100%;height:100%;margin-top: -140px;opacity: 0">
    <div style="color: #8c8c8c;font-size: 14px;z-index: 40">稍后分享？请长按上方保存图片</div>
    <div style="width: 100%;height:80px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;z-index: 50">
      <div class="dp-ok" @click="gocontinue">确认</div>
    </div>
    </div>
</template>
<style>

</style>
<script>
  import MessageBox from  'mint-ui/lib/message-box/index'
    export default{
        data(){
            return{
              timeOut:0,
              achieveName:'',
              achieveType:'',
              picUrl:'',
              bigWords:'',
              smallWords:'',
              achieveId:'',
              hostUrl:'https://wx.detoursh.com/',
              saveUrl:''
            }
        },
        methods:{
          shareToFriend(){
            //朋友
            wx.onMenuShareAppMessage({
              title: '发现之旅 成就认证', //
              desc: '获得「'+this.achieveName+'」成就', // 分享描述
              link: this.hostUrl+'?achieve='+this.achieveType+'#AchieveShow', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.hostUrl+'share/icon.png', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dathostUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
              },
              cancel: function () {
              }
            });
//朋友圈
            wx.onMenuShareTimeline({
              title: '发现之旅 成就认证', // 分享标题
              link: this.hostUrl+'?achieve='+this.achieveType+'#AchieveShow',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.hostUrl+'share/icon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //QQ
            wx.onMenuShareQQ({
              title: '发现之旅 成就认证', //
              desc: '获得「'+this.achieveName+'」成就', // 分享描述
              link: this.hostUrl+'?achieve='+this.achieveType+'#AchieveShow',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.hostUrl+'share/icon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

            //腾讯微博
            wx.onMenuShareWeibo({
              title: '发现之旅 成就认证', //
              desc:'获得「'+this.achieveName+'」成就', // 分享描述
              link:this.hostUrl+'?achieve='+this.achieveType+'#AchieveShow',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.hostUrl+'share/icon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });

            //QQ空间
            wx.onMenuShareQZone({
              title: '发现之旅 成就认证', //
              desc: '获得「'+this.achieveName+'」成就', // 分享描述
              link:this.hostUrl+'?achieve='+this.achieveType+'#AchieveShow', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.hostUrl+'share/icon.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
          },
          initAchieve(){
            this.$http.get('/wx/public/getAchieve.php?&openId='+this.$store.getters.openId).then((response) => {
              let achieve=response.data
              this.achieveId=achieve.achieveId
              this.achieveType=achieve.achieveType
              this.achieveName=achieve.achieveName
             // alert(achieve.achieveType)
              this.shareToFriend()
              this.saveUrl=this.hostUrl+'share/'+this.achieveType+'share.jpg'
              this.picUrl='https://dp-web-images.oss-cn-hangzhou.aliyuncs.com/'+achieve.achieveType+'.svg'
              //alert(this.picUrl)
               //初始化分享接口



            }, (response) => {
              this.timeOut+=1
              if(this.timeOut>4)
              {

                return
              }
              console.info('错误')
              setTimeout(() => {
                this.initAchieve()
              }, 4000);
            })
          },
          gocontinue(){
            this.$http.get('/wx/public/readAchieve.php?achieveId='+this.achieveId).then((response) => {
             if(response.data=='1')
             {
               this.$router.push('/Competition')
             }
            }, (response) => {

            })
          }
        },
      mounted:function() {

        this.initAchieve()
      }
    }
</script>

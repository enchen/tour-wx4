<template xmlns="http://www.w3.org/1999/html">
  <div class="dp-register-bg" style="justify-content:space-around;font-size: 18px">
    <div></div>
    <div></div>
    <div>

    <div style="font-size: 32px">行程专区</div>
    </div>
    <div>已完成报名注册者<br>活动当日进入此区<br>依照指示开启任务
    </div>
    <div></div>
    <div>
      <div>团建预约请移步后台留言</div>
      <div>小组注册请移步「行动准备」➡「注册专区」</div>
        <div>了解发现之旅请移步「发现更多」</div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
      mounted:function(){
//          this.init()
      },
        methods:{
          init(){
            this.$http.get('/wx/public/test.php').then((response) => {
              this.msg = response.data
            }, (response) => {
              console.info('连接错误')
              setTimeout(() => {
                this.init()
              },1500);

            })
          }
        }
    }
</script>

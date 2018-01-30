<template>
  <div class="dp-register-bg" >
    <div class="dp-top">
      完成注册，一起开启发现之旅！
    </div>
    <div class="dp-cover" v-if="full">欢迎加入</div>
    <div class="dp-phone">
      <div style="text-align: left">输入手机号：</div>
      <div style="margin-top: 5px;"><input v-model="phoneNo" @blur="goblur" @focus="gofocus" type="tel" maxlength="11"
                                           class="dp-input"
                                           placeholder="请输入手机号"></div>
    </div>
    <div class="dp-phone">
      <div style="text-align: left">验证码：</div>
      <div style="display:flex;flex-direction: row;margin-top: 2px;justify-content: space-between;width: 100%">
        <input v-model="checkCode" @blur="goblur" @focus="gofocus" type="tel" maxlength="6" style="width: 48%"
               class="dp-input"
               placeholder="验证码">

        <div style="width: 48%;line-height: 30px;background-color: #C40E28;height: 30px;font-size: 18px;border-radius:5px;"
          @click="getCode">{{msg}}
        </div>
      </div>
    </div>
    <div class="dp-phone" style="display: flex;flex-direction: row;flex-wrap: wrap;font-size: 14px;">
      <input type="checkbox" v-model="agree" style="width: 16px;height: 16px;">我已阅读并同意<span style="color: #C40E28" @click="goIntroduce">《产品协议》</span><span style="color: white">中的条款</span>，并了解<span style="color: #C40E28" @click="goSafe">《安全告知书》</span>中揭示的风险。
    </div>

    <div style="height: 100px;display: flex;align-items: center;flex-direction: column;">
      <div style="width: 100%;height: 12px;">
        <transition name="fade">
          <div style="font-size: 12px;color: yellow" v-if="errorMsg.length>0">{{errorMsg}}</div>
        </transition>
      </div>
      <div v-if="!loading" class="dp-ok" @click="submit">提交</div>
      <dp-waiting v-if="loading" style="width: 80px;height: 40px"></dp-waiting>
    </div>

    <div class="dp-bottom" style="display: none">
      <div class="dp-bottom-item">任务简介</div>
      <div style="height: 35px;width: 1px;background-color: #8c8c8c"></div>
      <div class="dp-bottom-item">行程须知</div>
      <div style="height: 35px;width: 1px;background-color: #8c8c8c"></div>
      <div class="dp-bottom-item">报名方式</div>
    </div>
  </div>
</template>
<style>

</style>
<script>
 // import Indicator from 'vue-indicator';
 //import 'element-ui/lib/theme-default/index.css'
  export default{
    data(){
      return {
        phoneNo: '',
        checkCode: '',
        msg: '获取验证码',
        errorMsg: '',
        agree: false,
        full: true,
        loading:false
      }
    },
    components: {},
    methods: {
      goIntroduce(){
        this.$router.push('/ProductIntroduce')
      },
      goSafe(){
        this.$router.push('/Safe')
      },
      submit()
      {
        //alert(this.$store.getters.openId)
        if (!this.agree) {
          this.showError('请勾选注意事项')
          return
        }
        if (this.checkCode.length == 6 && this.phoneNo.length == 11) {
          this.loading=true
          this.$http.post('/wx/public/teamLeaderRegister.php',
            {
              phoneNo:this.phoneNo,
              checkCode:this.checkCode,
              openId: this.$store.getters.openId
            }).then((response) => {
           let re = response.data
            console.info(re)
            if(re.flag==0)
            {
              this.$router.push(re.router)
            }
            else {
              this.loading=false
              this.showError(re.msg)
            }
          }, (response) => {
            this.loading=false
            this.showError('连接错误')
          })
        }
        else {
          this.showError('输入格式有误')
        }
      },
      getCode()
      {

        if (this.phoneNo.length == 11) {
          if (this.msg != '获取验证码') {
            this.showError('短信发送中')
            return//倒计时未完成
          }
          this.$http.get('/wx/public/getTeamLeaderCheckCode.php?phoneNo=' + this.phoneNo).then((response) => {
            let obj = response.data
            if (obj.flag == '-1') {
              this.showError(obj.msg)
            }
            if (obj.flag == '0') {

              this.showError('请注意查收')
              this.countSec()
            }


          }, (response) => {
            console.info('获取验证码错误')
            // error callback
          })


        }
        else {
          this.showError('手机号码有误')
        }
      },
      countSec(){
        let sec = 60;
        for (let i = 0; i < 60; i++) {
          setTimeout(() => {
            sec--
            this.msg = sec + '秒后重发'
            if (sec == 0) {
              this.msg = '获取验证码'
            }
          }, i * 1000);
        }
      },
      goblur(){
        this.full = true
      },
      gofocus(){
        this.full = false
      },
      showError(error){
        this.errorMsg = error
        setTimeout(() => {
          this.errorMsg = ''
        }, 2000);
      }
    }
  }
</script>

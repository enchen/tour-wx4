<template>
  <div class="dp-register-bg" >
    <div class="dp-top">
      完成注册，一起开启发现之旅！
    </div>
    <div>
      <div style="font-size: 30px;font-weight: 800">就差最后一步啦！</div>
      <div>填写下方信息立即进入您的小组</div>
    </div>
    <div class="dp-phone">
      <div style="text-align: left">姓名：</div>
      <div style="margin-top: 5px;"><input v-model="realName"type="text" maxlength="4"
                                           class="dp-input"
                                           placeholder="请输入您的姓名"></div>
    </div>
    <div class="dp-phone">
      <div style="text-align: left">性别：</div>
      <div style="margin-top: 5px;">
        <div style="width: 100%;height: 40px;display:flex;flex-direction:row;justify-content: space-between;">
          <div style="width: 48%;height: 40px; border-radius:2px;background: white;display: flex;justify-content: center;align-items: center;color: black;">

            <el-checkbox text-color="black" fill="#342eef" v-model="checked1" @change='setSex("1")'>男</el-checkbox></div>

          <div style="width: 48%;height: 40px; border-radius:2px;background: white;display: flex;justify-content: center;align-items: center;color: black;">

            <el-checkbox text-color="black" v-model="checked0" @change='setSex("0")'>女</el-checkbox></div>

        </div>
      </div>
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

    <div class="dp-bottom" style="background: transparent;">
    </div>
  </div>
</template>
<style>

</style>
<script>
  export default{
    data(){
      return{
        sex:'',
        checked1:false,
        checked0:false,
        realName:'',
        errorMsg: '',
        loading:false
      }
    },
    computed:{
      isMan:function(){

      }
    },
    methods:{
      checkValue(){
        if(this.sex=='')
        {
          this.errorMsg="请选择性别"
          return false
        }
        if(this.realName=='')
        {
          this.errorMsg="请填写姓名"
          return false
        }
        return true
      },
      submit()
      {
        if(this.checkValue)
        {
          this.loading=true
          this.$http.post('/wx/public/customerRegister2.php',
            {
              realName:this.realName,
              sex:this.sex,
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
      },
      setSex(sex)
      {
        this.sex=sex
        if(sex=='1')
        {
          this.checked1=true
          this.checked0=false
        }
        if(sex=='0')
        {
          this.checked1=false
          this.checked0=true
        }
      }
    },
    components:{

    }
  }
</script>

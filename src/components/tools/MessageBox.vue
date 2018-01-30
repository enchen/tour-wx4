<template>
  <div :style="{display:messageShow}">
    <div class="dp-msg"   style="z-index: 2029;display: flex;flex-direction: column;justify-content: space-between">
     <div style="width: 100%;height: 50%;color: black;">{{messageText}}</div>
      <el-button @click="ok" :disabled="buttonDisabled" size="small" type="primary">确定</el-button>
    </div>
    <div class="v-modal" style="z-index: 2028;"></div>
  </div>
</template>
<style>
.dp-msg{
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s;
  transition: .2s;
}
.v-modal-enter {
  -webkit-animation: v-modal-in .2s ease;
  animation: v-modal-in .2s ease;
}
.v-modal-leave {
  -webkit-animation: v-modal-out .2s ease forwards;
  animation: v-modal-out .2s ease forwards;
}
@-webkit-keyframes v-modal-in {
  0% {
    opacity: 0;
  }
  100% {
  }
}
@keyframes v-modal-in {
  0% {
    opacity: 0;
  }
  100% {
  }
}
@-webkit-keyframes v-modal-out {
  0% {
  }
  100% {
    opacity: 0;
  }
}
@keyframes v-modal-out {
  0% {
  }
  100% {
    opacity: 0;
  }
}
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
</style>
<script>

    export default{
        data(){
            return{
              buttonDisabled:false,
                count60:6,
                sec:0
            }
        },
      watch:{
        count: function (val, oldVal) {
          if(val=='true')
          {
            this.buttonDisabled=true
            this.sec=this.count60
            for (let i = 0; i < this.count60; i++) {
              setTimeout(() => {
                this.sec--
                this.messageText='任务失败！请在'+this.sec+'秒后重新执行任务'
                if(this.sec<1)
                {
                  this.$emit('update:count', 'false')
                  //this.count='false'
                  this.buttonDisabled=false
                  //this.ok()
                }
              }, i * 1000);
            }
          }
        }
      },
       props:['messageShow','messageText','count'],
      methods:{
          ok(){

           // this.show='none'
            if(this.count=='true')
            {
                return
            }
            if(this.messageText=='确认任务完成！请同志们继续')
            {
              this.$router.push('/Competition')
            }
            this.$emit('update:messageShow', 'none')
          }
      }
    }
</script>

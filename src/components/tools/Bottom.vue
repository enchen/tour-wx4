<template>
  <div class="dp-bottom" style="flex-grow: 1;">
    <div class="dp-bottom-item" @click="goInstruction">规则说明</div>
    <div style="height: 35px;width: 1px;background-color: #8c8c8c"></div>
    <div class="dp-bottom-item" @click="goFXZL">发现之旅</div>
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
        components:{

        },
      methods:{
          goInstruction(){
            this.$router.push('/Instruction')
          },
        goFXZL(){
          this.$router.push('/FXZL')
        }
      }
    }
</script>

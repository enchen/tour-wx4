<template>
    <div style="width: 100%;">
      <img  :src="picUrl"  style="height:100%;flex-grow: 1;" @click="showPic">
      <div style=";font-size: 12px;text-align: center;width: 100%;height: 14px">(点击查看大图)</div>

      <mt-popup v-model="bigShow" popup-transition="popup-fade" closeOnClickModal="false">

        <img  :src="picUrl" @click="closePic" style="width: 100%;flex-grow: 1;">
      </mt-popup>
    </div>
</template>
<style>

</style>
<script>
  import popUp from 'mint-ui/lib/popup/index'
    export default{
    name:'DpImage',
        data(){
            return{
              bigShow:false
            }
        },
      props: ['picUrl'],
      components:{
        'mt-popup':popUp
      },
      methods:{
        closePic(){
          console.info(this.bigShow+this.picUrl)
          //this.showpic=false
         this.bigShow=false
        },
        showPic()
        {
         this.bigShow=true
        }
      }
    }
</script>

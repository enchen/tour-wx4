<template>

<div>
  <img :src="picture" height="90%">

  <div class="">
    <input id="file" type="file" accept="image/*" @change="imageChange()" />
  </div>
</div>
</template>
<style scoped>

</style>
<script>
import Lrz from 'lrz'
    export default{
        data(){
            return{
              picture:'',
              test:'333'
            }
        },
      props: ['pictures'],
      methods:{
          imageChange()
        {
          let vueObj=this
         // console.info(vueObj)
         // console.info('in'+vueObj.test)
            if (typeof(document.querySelector('#file').files[0]) == "undefined")
          {
              return
          }
           lrz(document.querySelector('#file').files[0])
              .then(function (rst) {
                // 处理成功会执行
               // console.info(this.$parent.test)
                //console.info('in2')
                var sss=rst.base64
               // console.info(sss.length+'length')
                vueObj.picture=sss
                  //vueObj.pictures.push(sss)
              // console.info(vueObj.length+'@@')
                //return sss
              })
              .catch(function (err){
              })
              .always(function () {
                // 不管是成功失败，都会执行
              })



          }
      }
    }
</script>

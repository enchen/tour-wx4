<template>
    <div style="width: 100%;height: 100%">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
</template>
<style scoped>
  .loading{
    width: 100%;
    height: 50%;
    margin: 0 auto;
  }
  .loading span{
    display: inline-block;
    width: 4px;
    height: 100%;
    border-radius: 2px;
    background: lightgreen;
    -webkit-animation: load 1s ease infinite;
  }
  @-webkit-keyframes load{
    0%,100%{
      height: 50%;
      background: lightgreen;
    }
    50%{
      height: 100%;
      margin: -15px 0;
      background: lightblue;
    }
  }
  .loading span:nth-child(2){
    -webkit-animation-delay:0.2s;
  }
  .loading span:nth-child(3){
    -webkit-animation-delay:0.4s;
  }
  .loading span:nth-child(4){
    -webkit-animation-delay:0.6s;
  }
  .loading span:nth-child(5){
    -webkit-animation-delay:0.8s;
  }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>

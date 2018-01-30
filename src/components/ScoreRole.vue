<template>
  <div class="dp-register-bg" style="justify-content: space-around" >
    <div style="font-size: 34px;">评分规则</div>
    <div>
      <div style="font-weight: bold;font-size: 18px;">任务难度分</div>
      <div>所有任务题目按难易程度分为1-5星，1星=1分，累加所有得分</div>
    </div>

    <div>
      <div style="font-weight: bold;font-size: 18px;">完成速率值</div>
      <div>线路距离（单位m）／完成时间（单位min）</div>
    </div>

    <div>
      <div style="font-weight: bold;font-size: 18px;">团队完整度</div>
      <div>共计60分，每牺牲一名队员扣除15分</div>
    </div>

    <div>
      总得分为各项相加的四舍五入值。例：A小组耗时90分钟完成了1.8公里的线路任务，牺牲了一名队员，并获得50颗难度星，则该小组的最终得分为：任务难度值 50+完成速率分 20＋团队完整度 50=120分
    </div>

    </div>
</template>
<style scoped>
  .dp-register-bg div div{
    width: 100%;
  }
.dp-register-bg div
{
  font-size: 16px;
  width: 80%;
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

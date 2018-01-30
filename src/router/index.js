import Vue from 'vue'
import Router from 'vue-router'
// import { Indicator  } from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.component(Indicator.name, Indicator)
Vue.use(Router)
const Secret = r => require.ensure([], () => r(require('@/components/Secret.vue')), 'wx-register-secret-instruction')
const Safe = r => require.ensure([], () => r(require('@/components/Safe.vue')), 'wx-register-safe-instruction')
const ProductIntroduce = r => require.ensure([], () => r(require('@/components/ProductIntroduce.vue')), 'wx-register-product-instruction')
const FXZL = r => require.ensure([], () => r(require('@/components/FXZL.vue')), 'wx-register-instruction')
const Instruction = r => require.ensure([], () => r(require('@/components/Instruction.vue')), 'wx-register-instruction')
const TeamRegister1 = r => require.ensure([], () => r(require('@/components/TeamRegister1.vue')), 'wx-register-team1')
const TeamRegister2 = r => require.ensure([], () => r(require('@/components/TeamRegister2.vue')), 'wx-register-team2')
const LeaderWait = r => require.ensure([], () => r(require('@/components/LeaderWait.vue')), 'wx-register-team3')
const TeamList = r => require.ensure([], () => r(require('@/components/TeamList.vue')), 'wx-register-team4')
const Customer = r => require.ensure([], () => r(require('@/components/Customer.vue')), 'wx-customer')
const Customer_Register1 = r => require.ensure([], () => r(require('@/components/Customer_Register1.vue')), 'wx-register-customer1')
const Customer_Register2 = r => require.ensure([], () => r(require('@/components/Customer_Register2.vue')), 'wx-register-customer1')
const CompetitionWait = r => require.ensure([], () => r(require('@/components/CompetitionWait.vue')), 'wx-competition-wait')
const Competition = r => require.ensure([], () => r(require('@/components/Competition.vue')), 'wx-competition-wait')
const CompetitionFill = r => require.ensure([], () => r(require('@/components/CompetitionFill.vue')), 'wx-competition-question')
const CompetitionChoice = r => require.ensure([], () => r(require('@/components/CompetitionChoice.vue')), 'wx-competition-choice')
const CompetitionPic = r => require.ensure([], () => r(require('@/components/CompetitionPic.vue')), 'wx-competition-question')
const CompetitionJudge = r => require.ensure([], () => r(require('@/components/CompetitionJudge.vue')), 'wx-competition-question2')
const Dead = r => require.ensure([], () => r(require('@/components/Dead.vue')), 'wx-competition-die')
const Dead2 = r => require.ensure([], () => r(require('@/components/Dead2.vue')), 'wx-competition-die2')
const GloryList = r => require.ensure([], () => r(require('@/components/GloryList.vue')), 'wx-competition-die2')
const ThankYou = r => require.ensure([], () => r(require('@/components/ThankYou.vue')), 'wx-competition-die23')
const Total = r => require.ensure([], () => r(require('@/components/Total.vue')), 'wx-competition-die2')
const ScoreRole = r => require.ensure([], () => r(require('@/components/ScoreRole.vue')), 'wx-competition-die21')
const Welcome = r => require.ensure([], () => r(require('@/components/Welcome.vue')), 'wx-competition-welcome')
const Manage = r => require.ensure([], () => r(require('@/components/Manage.vue')), 'wx-competition-manage')
const LineWait = r => require.ensure([], () => r(require('@/components/LineWait.vue')), 'wx-competition-line')
const RandomFinish = r => require.ensure([], () => r(require('@/components/RandomFinish.vue')), 'wx-competition-line')
const RunAway = r => require.ensure([], () => r(require('@/components/RunAway.vue')), 'wx-competition-line')
const Voice1 = r => require.ensure([], () => r(require('@/components/Voice1.vue')), 'wx-competition-voice1')
const Achieve = r => require.ensure([], () => r(require('@/components/Achieve.vue')), 'wx-competition-achieve')
const AchieveGroup = r => require.ensure([], () => r(require('@/components/AchieveGroup.vue')), 'wx-competition-achieve')
const AchieveShow = r => require.ensure([], () => r(require('@/components/AchieveShow.vue')), 'wx-competition-achieveshow')
export default new Router({
  routes: [
    {
      path: '/Secret',
      name: 'Secret',
      component: Secret
    },
    {
      path: '/Safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/ProductIntroduce',
      name: 'ProductIntroduce',
      component: ProductIntroduce
    },
    {
      path: '/FXZL',
      name: 'FXZL',
      component: FXZL
    },
    {
      path: '/Instruction',
      name: 'Instruction',
      component: Instruction
    },
    {
      path: '/RandomFinish',
      name: 'RandomFinish',
      component: RandomFinish
    },
    {
      path: '/RunAway',
      name: 'RunAway',
      component: RunAway
    },
    {
      path: '/LineWait',
      name: 'LineWait',
      component: LineWait
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/Customer_Register2',
      name: 'Customer_Register2',
      component: Customer_Register2
    },
    {
      path: '/Customer_Register1',
      name: 'Customer_Register1',
      component: Customer_Register1
    },
    {
      path: '/TeamRegister1',
      name: 'TeamRegister1',
      component: TeamRegister1
    },
    {
      path: '/TeamRegister2',
      name: 'TeamRegister2',
      component: TeamRegister2
    },
    {
      path: '/LeaderWait',
      name: 'LeaderWait',
      component: LeaderWait
    },
    {
      path: '/TeamList',
      name: 'TeamList',
      component: TeamList
    },
    {
      path: '/Customer',
      name: 'Customer',
      component: Customer
    }
    ,
    {
      path: '/CompetitionWait',
      name: 'CompetitionWait',
      component: CompetitionWait
    }
    ,
    {
      path: '/Dead',
      name: 'Dead',
      component: Dead
    }
    ,
    {
      path: '/GloryList',
      name: 'GloryList',
      component: GloryList
    }
    ,
    {
      path: '/ThankYou',
      name: 'ThankYou',
      component: ThankYou
    }
    ,
    {
      path: '/ScoreRole',
      name: 'ScoreRole',
      component: ScoreRole
    }
    ,
    {
      path: '/Dead2',
      name: 'Dead2',
      component: Dead2
    }
    ,
    {
      path: '/Total',
      name: 'Total',
      component: Total
    }
    ,
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Achieve',
      component: Achieve
    },
    {
      path: '/AchieveGroup',
      component: AchieveGroup
    }
    ,
    {
      path: '/AchieveShow',
      component: AchieveShow
    }
    ,

    {
      path: '/Competition',
      name: 'Competition',
      component: Competition,
      children: [
        {
          path: 'Fill',
          component: CompetitionFill
        },
        {
          path: 'Pic',
          component: CompetitionPic
        },
        {
          path: 'Choice',
          component: CompetitionChoice
        },
        {
          path: 'Judge',
          component: CompetitionJudge
        },
        {
          path: 'Voice1',
          component: Voice1
        }
      ]
    }
  ]
})

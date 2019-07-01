import Vue from 'vue'
import Router from 'vue-router'
import ArticleDetails from '@/components/ArticleDetails'
import WriteArticle from '@/components/WriteArticle'
import Home from '@/components/Home'
import LoginUser from '@/components/LoginUser'
import RegisterUser from '@/components/RegisterUser'
import Userinfo from '@/components/Userinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/ArticleDetails',
      name: 'ArticleDetails',
      component: ArticleDetails
    }
    ,{
      path: '/WriteArticle',
      name: 'WriteArticle',
      component: WriteArticle
    } ,{
      path: '/LoginUser',
      name: 'LoginUser',
      component: LoginUser
    },{
      path: '/RegisterUser',
      name: 'RegisterUser',
      component: RegisterUser
    },{
      path: '/Userinfo',
      name: 'Userinfo',
      component: Userinfo
    }
  ]
})

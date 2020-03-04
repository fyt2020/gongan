import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "exactActive",
  linkActivesClass: "active",
  routes: [
    {
      path: '/newLayout',
      name: 'newLayout',
      component:  () => import("@/pages/newLayout"),
      redirect: "/newLayout/newShootC",
      children:[
        {
          path: 'newShootC',
          name: 'newShootC',
          component: () => import("@/pages/portraitCollection/newShootC"),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/pages/login/login"),
    },
    
    {
      path: '/home',
      name: 'home',
      component: () => import("@/pages/home/home"),
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import("@/pages/layout"),
      // redirect: rolename == '超级管理员' ? '/layout/data' : '/layout/shootC',
      children: [
        {
          path: 'data',
          name: 'data',  //数据统计
          component: () => import("@/pages/data/dataStatistics"),
        },
        {
          path: 'shootC',
          name: 'shootC',//拍摄采集
          component: () => import("@/pages/portraitCollection/shootCollection2"),
        },
        {
          path: 'shootList',
          name: 'shootList',//采集列表
          component: () => import("@/pages/portraitCollection/shootList"),
        },
        {
          path: 'shootD',
          name: 'shootD',//拍摄设备
          component: () => import("@/pages/portraitCollection/shootDevice"),
        },
        {
          path: 'addDec',
          name: 'addDec',//添加设备
          component: () => import("@/pages/addDec/addDec"),
        },
        {
          path: 'wactchDev',
          name: 'wactchDev',//查看设备
          component: () => import("@/pages/addDec/wactchDev"),
        },
        {
          path: 'editDec',
          name: 'editDec',//编辑设备
          component: () => import("@/pages/addDec/editDec"),
        },
        {
          path: 'modelList',
          name: 'modelList',//建模列表
          component: () => import("@/pages/modelList/modelList"),
        },
        {
          path: 'syncMan',
          name: 'syncMan',//同步管理
          component: () => import("@/pages/modelList/syncMan"),
        },
        {
          path: 'faceM',
          name: 'faceM',//人像模型库
          component: () => import("@/pages/3dHumDB/faceModel"),
        },
        {
          path: 'faceDetalis',
          name: 'faceDetalis',//模型详情
          component: () => import("@/pages/3dHumDB/faceDetalis"),
          redirect:'/layout/faceDetalis/cenLeftRight',
          children:[
            {
              path: 'cenLeftRight',
              name: 'cenLeftRight',//一正两侧
              component: () => import("@/pages/3dHumDB/cenLeftRight"),
            },
            {
              path: 'modelShow',
              name: 'modelShow',//模型详情
              component: () => import("@/pages/3dHumDB/modelShow"),
            },
            {
              path: 'photoes',
              name: 'photoes',//43张图片
              component: () => import("@/pages/3dHumDB/photoes"),
            },
          ]
        },
        {
          path: 'imgRec',
          name: 'imgRec',//图像识别
          component: () => import("@/pages/3dHumUse/imgRec"),
        },
        {
          path: 'acc',
          name: 'acc',//账户管理
          component: () => import("@/pages/sysSet/accountMange"),
        },
        {
          path: 'labelM',
          name: 'labelM',//标签管理
          component: () => import("@/pages/sysSet/laberMan"),
        },
        {
          path: 'intellRec',
          name: 'intellRec',//智能识别
          component: () => import("@/pages/3dHumUse/intellRec"),
        },
        {
          path: 'video',
          name: 'video',//监控设备
          component: () => import("@/pages/3dHumUse/monitorDec"),
        },
        // {
        //   path: 'videoDetail',
        //   name: 'videoDetail',//视频识别详情
        //   component: () => import("@/pages/3dHumUse/videoDetail"),
        // },
        {
          path: 'faceChar',
          name: 'faceChar',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceChar"),
        },
        {
          path: 'faceDB',
          name: 'faceDB',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceDB"),
        },
        {
          path: 'faceDBdetail',
          name: 'faceDBdetail',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceDBdetail"),
        },
        {
          path: 'userList',
          name: 'userList',//用户列表
          component: () => import("@/pages/userMange/userList"),
        },
        {
          path: 'organizational',
          name: 'organizational',//组织机构
          component: () => import("@/pages/userMange/organizational"),
        },
        {
          path: 'userm',
          name: 'userm',//用户管理
          component: () => import("@/pages/userMange/roleMange"),
        },
      ]
    },
    {
      path: '/faceShow',
      name: 'faceShow',
      component: () => import("@/pages/faceShow/faceShow"),
    },
    {
      path: '/faceShow2',
      name: 'faceShow2',//智能识别
      component: () => import("@/pages/faceShow/faceShow2"),
    },
    {
      path: '/faceShow3',
      name: 'faceShow3',//智能识别
      component: () => import("@/pages/faceShow/faceShow3"),
    },
    {
      path: '/notFound',
      name: 'notFound',//404页面
      component: () => import("@/pages/404"),
    },
    {
      path: '*',
      redirect(to) {
        if (to.path == '/') {
          return '/login'
        } 
        if(to.path == 'newShootC'){
          return '/newLayout'
        }else{
          return '/notFound' 
        }
      }
    }
  ]
})

import bgMainBack from '@/view/bgMainBack';
import bgMain from '@/view/bgMain';

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/choosePlatform',
    name: 'choosePlatform',
    meta: {
      title: '选择平台',
      hideInMenu: true
    },
    component: () => import('@/view/choosePlatform/choosePlatform')
  },
  {
    path: '/background',
    name: '_department',
    redirect: '/background/department',
    component: bgMainBack,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          hideInMenu: true,
          title: '用户管理',
          notCache: true,
          icon: 'ios-contacts-outline'
        },
        component: () => import('@/view/single-page/bg-manage/user')
      },
      {
        path: 'department',
        name: 'department',
        meta: {
          icon: 'ios-construct-outline',
          title: '部门管理'
        },
        component: () => import('@/view/single-page/bg-manage/department')
      },
      {
        path: 'station',
        name: 'station',
        meta: {
          icon: 'ios-stats-outline',
          title: '岗位管理'
        },
        component: () => import('@/view/single-page/bg-manage/station')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          icon: 'ios-cog-outline',
          title: '角色管理'
        },
        component: () => import('@/view/single-page/bg-manage/role')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          icon: 'ios-cog-outline',
          title: '系统菜单管理'
        },
        component: () => import('@/view/single-page/bg-manage/menu')
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        meta: {
          icon: 'ios-cog-outline',
          title: '数据字典'
        },
        component: () => import('@/view/single-page/bg-manage/dictionary')
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          icon: 'ios-cog-outline',
          title: '新增子系统'
        },
        component: () => import('@/view/single-page/bg-manage/system')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          icon: 'ios-cog-outline',
          title: '操作日志'
        },
        component: () => import('@/view/single-page/bg-manage/log')
      },
      {
        path: 'runlog',
        name: 'runlog',
        meta: {
          icon: 'ios-cog-outline',
          title: '运行日志'
        },
        component: () => import('@/view/single-page/bg-manage/runlog')
      }
    ]
  },
  {
    path: '/',
    name: '_audit',
    redirect: '/meetRegister',
    component: bgMain,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      /* {
        path: '/audit',
        name: 'audit',
        meta: {
          hideInMenu: true,
          title: '预约审核'
        },
        component: () => import('@/view/audit')
      }, */
      {
        path: '/meetRegister',
        name: 'meetRegister',
        meta: {
          hideInMenu: true,
          title: '会见审核'
        },
        component: () => import('@/view/meetRegister')
      },
      {
        path: '/meetMonitor',
        name: 'meetMonitor',
        meta: {
          hideInMenu: true,
          title: '会见监控'
        },
        component: () => import('@/view/meetMonitor')
      },
      {
        path: '/meetingNotes',
        name: 'meetingNotes',
        meta: {
          hideInMenu: true,
          title: '历史会见'
        },
        component: () => import('@/view/meetingNotes')
      },
      {
        path: '/roomManage',
        name: 'roomManage',
        meta: {
          hideInMenu: true,
          title: '房间管理'
        },
        component: () => import('@/view/roomManage')
      },
      {
        path: '/statistics',
        name: 'statistics',
        meta: {
          hideInMenu: true,
          title: '统计分析'
        },
        component: () => import('@/view/statistics')
      },
      {
        path: '/dataSync',
        name: 'dataSync',
        meta: {
          hideInMenu: true,
          title: '数据订阅'
        },
        component: () => import('@/view/dataSync')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
];

/** * 多级菜单示例
 * 1. import parentView from '@/components/parent-view';
 * 2.{
      path: '/multilevel',
      name: 'multilevel',
      meta: {
        icon: 'md-menu',
        title: '多级菜单示例'
      },
      component: Main,
      children: [
        {
          path: 'level_2_1',
          name: 'level_2_1',
          meta: {
            icon: 'md-funnel',
            title: '二级-1'
          },
          component: () => import('@/view/multilevel/level-2-1.vue')
        },
        {
          path: 'level_2_2',
          name: 'level_2_2',
          meta: {
            access: ['super_admin'],
            icon: 'md-funnel',
            showAlways: true,
            title: '二级-2'
          },
          component: parentView,
          children: [
            {
              path: 'level_2_2_1',
              name: 'level_2_2_1',
              meta: {
                icon: 'md-funnel',
                title: '三级'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
            },
            {
              path: 'level_2_2_2',
              name: 'level_2_2_2',
              meta: {
                icon: 'md-funnel',
                title: '三级'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
            }
          ]
        },
        {
          path: 'level_2_3',
          name: 'level_2_3',
          meta: {
            icon: 'md-funnel',
            title: '二级-3'
          },
          component: () => import('@/view/multilevel/level-2-3.vue')
        }
      ]
    }
 */

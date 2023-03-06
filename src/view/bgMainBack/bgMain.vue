<template>
  <Layout class="bgMain">
    <Header class="header-con">
      <!-- 律师会见管理系统 -->
      <img src="../../assets/images/common/bigTitle.png">
      <div class="bottom-con">
        <router-link to="/meetRegister">会见审核</router-link>
        <router-link to="/roomManage">房间管理</router-link>
        <router-link to="/meetMonitor">会见监控</router-link>
        <router-link to="/meetingNotes">历史会见</router-link>
        <router-link to="/statistics">统计分析</router-link>
        <router-link to="/background">系统管理</router-link>
      </div>
      <div class="info">
        <div class="nowDate">
          <div>
            <span>{{time2}}</span>
            <span>{{time3}}</span>
          </div>
          <div>{{time1}}</div>
        </div>
        <user :user-avator="userAvator"/>
      </div>
    </Header>
    <Layout>
      <Sider hide-trigger collapsible :width="192" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList"></side-menu>
      </Sider>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view style="height: 100%;padding-left: 10px;padding-top: 10px;"/>
            <div v-show="lockEnable" class="lockBox">
              <div class="lockForm">
                <p>{{userName}}</p>
                <i-form ref="user" :model="user" :rules="ruleValidate">
                  <i-form-item label="" prop="password">
                    <i-input type="password" @keydown.native.enter.prevent ="handleSubmit('user')" ref="lockInput" v-model="user.password" placeholder="密码"></i-input>
                  </i-form-item>
                </i-form>
                <span @click="handleSubmit('user')"></span>
              </div>
            </div>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from '_c/main/components/side-menu';
import HeaderBar from '_c/main/components/header-bar';
import User from '_c/main/components/user';
import TagsNav from '_c/main/components/tags-nav';
import ABackTop from '_c/main/components/a-back-top';
import { getNewTagList } from '@/libs/util';
import { getNowDate } from '@/libs/tools';
import { mapMutations, mapActions } from 'vuex';
import routers from '@/router/routers';
import './main.less';
import Cookies from 'js-cookie';
import axios from '@/libs/api.request';
import config from '@/config';
import md5 from 'js-md5';
export const login = ({ accountName, password }) => {
  password = md5(password);
  return axios.request({
    url: '/sysmgr/loginStatus',
    data: {
      accountName,
      password
    },
    method: 'post'
  });
};
export default {
  name: 'bgMain',
  components: {
    SideMenu,
    HeaderBar,
    User,
    ABackTop,
    TagsNav
  },
  data () {
    return {
      collapsed: false,
      countDown: false,
      activeMenu: '',
      lockEnable: Cookies.get('lock') === 'true',
      timeEnable: '',
      user: {
        password: ''
      },
      ruleValidate: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      timer: '',
      time1: '',
      time2: '',
      time3: ''
    };
  },
  computed: {
    userAvator () {
      return this.$store.state.user.avatorImgPath;
    },
    menuList () {
      // #188需求屏蔽系统菜单、数据字典、子系统管理
      return this.$store.state.app.menuList.filter(item => {
        let name = item.name;
        return name !== 'menu' && name !== 'dictionary' && name !== 'system';
      });
    },
    tagNavList () {
      return this.$store.state.app.tagNavList;
    },
    accountName () {
      return this.$store.state.user.accountName;
    },
    userName () {
      return this.$store.state.user.userName;
    }
  },
  methods: {
    ...mapMutations([
      'setHomeRoute',
      'setTagNavList',
      'addTag',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getMenuList',
      'getPermissionList',
      'handleLogOut'
    ]),
    turnToPage (route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    handleClick (item) {
      this.turnToPage(item);
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    // 处理没有Menu的情况
    handleNoMenu () {
      config.homeName = '';
      // 跳转至401无权限页面
      this.$router.push('401');
      // 提示无权限指引的操作
      this.$Message.error({
        render: h => {
          return h('div', [
            '用户管理尚未获取到相关权限，请分配后',
            h('div', {
              slot: 'content',
              style: {
                whiteSpace: 'normal',
                display: 'inline-block',
                color: '#2d8cf0'
              },
              on: {
                click: () => {
                  this.$Message.destroy();
                  this.logout();
                }
              }
            }, '重新登陆')
          ]);
        },
        duration: 0
      });
    },
    // 登出 清空token
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        });
      });
    },
    // 提交密码成功后
    handleSubmit (name) {
      // 登录超时时跳回登录页
      if (this.$store.state.user.accountName.length === 0) {
        this.$Message.error('登录超时');
        setTimeout(() => {
          location.href = config.monitoringBaseURL + '/login';
        }, 1000);
        return;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          login({
            accountName: this.$store.state.user.accountName,
            password: this.user.password
          }).then(res => {
            let status = res.data.data.status;
            if (status === 1) {
              this.lockEnable = false;
              Cookies.set('lock', this.lockEnable);
              this.$refs[name].resetFields();
            } else {
              this.$Message.error('密码错误');
            }
          });
        }
      });
    },
    nowTime () {
      this.time1 = getNowDate().year + '-' + getNowDate().month + '-' + getNowDate().day;
      if (getNowDate().date === 0) {
        this.time2 = '星期日';
      } else {
        this.time2 = '星期' + getNowDate().date;
      }
      this.time3 = getNowDate().hour + ':' + getNowDate().minutes + ':' + getNowDate().second;
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute;
      this.activeMenu = newRoute.name;
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    }
  },
  mounted () {
    this.getPermissionList();
    // Menu组件菜单项动态生成后再更新activeMenu
    this.getMenuList().then((menuList) => {
      // 如果菜单列表为空的话 就跳转到401
      if (!menuList || menuList.length === 0) {
        this.handleNoMenu();
      } else {
        // 否则将菜单第一项设置为主菜单
        config.homeName = menuList[0].name;
        this.$router.push(config.homeName);
      }
      this.activeMenu = this.$route.name;
    });
    this.setTagNavList();
    this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, query, params, meta },
      type: 'push'
    });
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      });
    }
    window.onresize = () => {
      return (() => {
        this.$store.state.app.tableHeight = document.documentElement.clientHeight - 380;
      })();
    };
    let that = this;
    // 多个页面时实时监控是否锁屏
    setInterval(() => {
      that.lockEnable = Cookies.get('lock') === 'true';
    }, 200);
    this.timer = setInterval(() => {
      this.nowTime();
    }, 1000);
  },
  beforeDestory () {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less">
  .ivu-message{
    z-index:999999999!important;
  }
  #app{
    .lockBox{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:url(../../assets/images/common/lockIcon.png) no-repeat 49% 44%, url(../../assets/images/common/lock.png) no-repeat;
      background-size: 10% 20%,100% 100%;
      z-index:99999999;
      .lockForm{
        position: absolute;
        left:38.5%;
        top:72%;
        p{
          text-align: center;
          font-size: 36px;
          line-height: 72px;
          color: #fff;
          width: 410px;
        }
        .ivu-form{
          .ivu-form-item-content{
            margin-left: 0!important;
            .ivu-input{
              width: 410px!important;
              height: 52px;
              font-size: 18px;
              background: rgba(0,0,0,0.3);
              border: 2px solid #0895c1;
              color:#fff;
            }
          }
        }
        span{
          display: inline-block;
          width: 60px;
          height: 46px;
          background:url(../../assets/images/common/unlockIcon.png) no-repeat;
          background-size:contain;
          position: absolute;
          right: -76px;
          bottom:26px;
          cursor: pointer;
        }
      }
    }
  }
</style>

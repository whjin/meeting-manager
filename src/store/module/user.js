import {
  login,
  getUserInfo
} from '@/api/login';
import { setToken, getToken } from '@/libs/util';
import { Message } from 'iview';

export default {
  state: {
    accountName: '',
    userName: '',
    userId: '',
    avatorImgPath: './public/favicon.ico',
    token: getToken(),
    hasGetInfo: false,
    theme: 'blackTheme',
    organizeCode: 0,
    isPoliceRole: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath;
    },
    setUserId (state, id) {
      state.userId = id;
    },
    setAccountName (state, name) {
      state.accountName = name;
    },
    setUserName (state, name) {
      state.userName = name;
    },
    setToken (state, token) {
      state.token = token;
      setToken(token);
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status;
    },
    changeTheme (state, theme) {
      state.theme = theme;
    },
    setOrganizeCode (state, code) {
      state.organizeCode = code;
    },
    setIsPoliceRole (state, auth) {
      state.isPoliceRole = Number(auth) === 1 ? Number(auth) : false;
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, { accountName, password }) {
      accountName = accountName.trim();
      return new Promise((resolve, reject) => {
        login({
          accountName,
          password
        }).then(res => {
          const data = res.data.data;
          if (data !== null && res.data.state.code === 200) {
            commit('setToken', data.token);
          }
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '');
        resolve();
      });
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            const data = res.data;
            if (data.state.code !== 200) {
              handleLogOut({ state, commit });
              Message.error({
                content: '由于您长时间未进行操作,请重新登录',
                duration: 2
              });
            } else {
              commit('setAvator', data.data.avator);
              commit('setAccountName', data.data.accountName);
              commit('setUserName', data.data.userName);
              commit('setUserId', data.data.id);
              commit('setHasGetInfo', true);
              commit('changeTheme', data.data.theme);
              commit('setOrganizeCode', data.data.organizeCode);
              commit('setIsPoliceRole', data.data.dataAuth);
            }
            resolve(data);
          }).catch(err => {
            reject(err);
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  }
};

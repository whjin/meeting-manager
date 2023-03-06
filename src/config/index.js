export default {
  // 配置显示在浏览器标签的title
  title: '律师远程会见系统',
  // token在Cookie中存储的天数，默认1天
  cookieExpires: 1,
  // 是否需要国际化
  useI18n: false,
  // api请求基础路径
  baseUrl: {
    dev: '',
    pro: ''
  },
  // 实战平台baseURL
  superVersionBaseURL: 'http://' + window.location.hostname + ':8084',
  monitoringBaseURL: 'http://' + window.location.hostname + ':8083',
  // 律师会见前端地址
  meetSystemURL: 'http://192.168.1.57:3000',
  // superVersionBaseURL: 'http://localhost:8084',
  // monitoringBaseURL: 'http://localhost:8083',
  // 恒高电子地图baseURL
  uwbElecMapBaseURL: 'http://192.168.1.158/EHCommon/MenuRealTime/RealTime2D/realTime2D',
  // nmsURL: 'https://10.0.0.21/nms/views/home/charts',
  // 默认打开的首页的路由name值，默认为home
  homeName: 'user',
  // 锁屏时间s
  lockTime: 60 * 10,
  // h5ss 配置
  h5ss: {
    protocol: 'http:', // 'http:' or 'https:'
    host: '192.168.1.57:8070',
    rootpath: '/',
    hlsver: 'v1', // v1 is for ts, v2 is for fmp4
    session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
  }
};

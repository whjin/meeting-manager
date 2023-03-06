<template>
  <i-layout class="main-content-con monitor">
    <i-sider hide-trigger>
      <div class="videoMonitor">
        视频监控树
        &nbsp;<span>打开：<span style="color: rgba(53, 255, 250, 1)">{{ roomStatusCount.open }}间</span>&nbsp;&nbsp;空闲：<span style="color: rgba(53, 255, 250, 1)">{{ roomStatusCount.free }}间</span></span>
      </div>
      <div style="height: calc(100% - 180px);overflow-y: auto;overflow-x: hidden;padding: 0 15px;">
        <!-- 律师会见监控节点树 -->
        <Tree :data="roomList" :render="renderContent"></Tree>
      </div>
    </i-sider>
    <i-layout>
      <i-tabs @on-click="changeOption" :style="{border: '1px solid #164170', borderTop: '0', height: '100%', backgroundColor: '#0C203D'}">
        <i-tab-pane label="实时监控" name="realTimeMonitor" class="realTimeMonitor">
          <div class="content">
            <div class="monitorList" v-show="resourceView">
              <div class="monitor" v-for="(item, idx) in monitorList" :key="item.id">
                <monitor-player v-if="monitorList[idx].src" :ref="`monitor${idx}`"></monitor-player>
                <div v-else class="video-mask">请选择会见室监控</div>
                <p class="bottom">
                  <span class="control">
                    <i-icon type="md-close" @click="closeMonitor(idx)" />
                    <i-icon type="md-qr-scanner" @click="openFullScreen(idx)" />
                  </span>
                </p>
              </div>
              <div class="clearBoth"></div>
            </div>
          </div>
        </i-tab-pane>
        <!-- 录像回放监控控件 -->
        <!-- <i-tab-pane label="录像回放" name="replayTheater" class="replayTheater">
          <div class="content">
            <div class="header">
              <div class="func">
              </div>
              <div class="clearBoth"></div>
            </div>
            <div class="replayList" v-show="!resourceView">
              <div class="replay" style="width: 100%; height: calc(100% - 11px);">
                <video ref="replayRef" id="replay" webkit-playsinline playsinline style="background: #000; width: 100%; height: 100%;"></video>
              </div>
              <canvas id="timeline" width="1064" height="62" style="cursor: pointer;background-color: #2b2f33;" ondragstart="return false;" @click="getMouseupTime"></canvas>
            </div>
          </div>
        </i-tab-pane> -->
      </i-tabs>
    </i-layout>
    <i-sider hide-trigger>
      <!-- 动态消息 -->
      <div class="dynamicInformation">
        <div class="title">
          动态信息
        </div>
        <div style="height: calc(100% - 180px);padding: 0 15px;overflow: hidden auto;">
          <div class="content" v-for="(item,idx) in meetVideoMessageList" :key="idx">
            <div class="meetInfo">
              <span class="index">{{ idx + 1 }}</span>{{ item.message }}
            </div>
            <div class="time">
              <img src="../../assets/images/common/time.png" width=14 height=14 />&nbsp;&nbsp;&nbsp;<span>{{ getDate(item.gmtCreate, 'monthDay') }}</span><span> {{ getDate(item.gmtCreate, 'hoursMinutesSecond') }}</span>
            </div>
          </div>
        </div>
      </div>
    </i-sider>
  </i-layout>
</template>
<script>
import axios from 'axios';
import {
  disConnect,
  initPlugin,
  startPreview,
  startPlayback,
  resizePlugin,
  hasPlugin
} from '@/api/bg-manage/video';
import {
  getArtemisConfig
} from '@/api/bg-manage/patrol';
import { getDate, formatDate } from '@/libs/tools';
import videoPlayer from '_c/video-player/video-player.vue';
import monitorPlayer from '_c/monitorPlayer/monitorPlayer.vue';
import { getRoomStatus, getRoomList, getMonitorSrc, stopMonitor } from '@/api/bg-manage/meetMonitor/meetMonitor';
import config from '@/config';
export const loadTableData = (tableName, expressions, pageParam) => {
  return axios.request({
    url: '/sysmgr/table/loadData',
    data: {
      tableName: tableName,
      emptyPage: true,
      expressions: expressions,
      pageParam: Object.assign({
        pageIndex: 1,
        pageSize: 10,
        order: '',
        sortType: 'ASC'
      }, pageParam)
    },
    method: 'post'
  });
};
export default {
  name: 'meetMonitor',
  components: {
    videoPlayer,
    monitorPlayer
  },
  data () {
    return {
      roomList: [],
      meetVideoMessageList: [],
      meetVideoMessageListLength: [],
      monitorList: [
        {
          id: 'monitor0',
          src: '',
          jkip: '',
          jkId: ''
        },
        {
          id: 'monitor1',
          src: '',
          jkip: '',
          jkId: ''
        },
        {
          id: 'monitor2',
          src: '',
          jkip: '',
          jkId: ''
        },
        {
          id: 'monitor3',
          src: '',
          jkip: '',
          jkId: ''
        }
      ],
      isInit: false,
      flushTime: 5000,
      timer: '',
      isLoading: true,
      resourceView: true,
      path: 'ws://127.0.0.1:8089/videoCommunity',
      websocket: '',
      fullHeight: document.documentElement.clientHeight,
      fullWidth: document.documentElement.clientWidth,
      roomStatusCount: {},
      monitor: {},
      monitorConfig: {
        videoid: 'monitor1',
        protocol: config.h5ss.protocol, // 'http:' or 'https:'
        host: config.h5ss.host,
        rootpath: config.h5ss.rootpath,
        hlsver: config.h5ss.hlsver, // v1 is for ts, v2 is for fmp4
        session: config.h5ss.session // session got from login
      },
      pbconf: {
        begintime: '2019-07-13T112259+08',
        endtime: '2019-07-13T232001+08',
        showposter: 'true', // 'true' or 'false' show poster
        serverpb: 'true', // 'true' or 'false' playback from h5stream record, default false
        callback: '',
        userdata: '2019-03-23T120101+0' // user data
      },
      isFullScreen: false,
      replay: {},
      isReplay: false,
      videoStartTime: new Date(2020, 4, 22, 0, 0, 0),
      videoEndTime: new Date(2020, 4, 26, 0, 5, 0),
      initStream: true
    };
  },
  computed: {
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return [
        h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            color: node.node.selected ? '#35fffa' : 'rgba(255, 255, 255, 1)',
            fontSize: '16px'
          },
          on: {
            click: (obj) => {
              if (!data.jkip) return;
              if (this.monitorList.some(item => item.jkip === data.jkip)) return this.$Message.error('已存在该监控视频');
              if (this.monitorList.every(item => item.src)) return this.$Message.error('请关闭一个监控画面后重试');
              this.getMonitorSrcInfo(data.jkip, data.id);
            }
          }
        }, [
          h('span', [
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px',
              color: 'red'
            }
          }, (data.roomStatus && data.roomStatus === 1) ? '正在会见' : '')
        ])];
    },
    getMeetVideoMessage () { // 获取动态消息
      loadTableData('videoMessage').then(res => {
        if (res.data.state.code === 200) {
          this.meetVideoMessageList = res.data.data;
          this.meetVideoMessageListLength = res.data.page.total;
        }
      });
    },
    getDate (date, type) { // 毫秒时间戳转常用时间格式
      return getDate(date, type);
    },
    getArtemisConfig (playWnd) { // 获取hik配置
      getArtemisConfig().then(res => {
        if (res.status === 200) {
          let option = res.data.data;
          option.layout = '2x2';
          if (playWnd === 'playWnd1') {
            option.showSmart = 0;
            option.playMode = 1;
          }
          let width = this.$refs.monitorRef.clientWidth;
          let height = this.$refs.monitorRef.clientHeight;
          initPlugin(res.data.data, playWnd, (width), (height), oData => { // 初始化插件
          });
          setTimeout(() => {
            this.isLoading = hasPlugin();
          }, 7000);
        } else {
          this.$Message.error('请求错误');
        }
      });
    },
    changeOption (event) { // 切换tabs（实时视频、录像回放）
      if (event === 'realTimeMonitor') {
        this.resourceView = true;
        this.monitorList = [
          {
            id: 'monitor0',
            src: '',
            jkip: '',
            jkId: ''
          },
          {
            id: 'monitor1',
            src: '',
            jkip: '',
            jkId: ''
          },
          {
            id: 'monitor2',
            src: '',
            jkip: '',
            jkId: ''
          },
          {
            id: 'monitor3',
            src: '',
            jkip: '',
            jkId: ''
          }
        ];
      } else if (event === 'replayTheater') {
        this.resourceView = false;
      }
    },
    startPlay (params, windowId) { // 开始播放
      startPreview(params, windowId);
    },
    startPlayback (params, startTime = formatDate(this.dataFormat(new Date(), 'yyyy/MM/dd 00:00:00')) / 1000, endTime = formatDate(new Date()) / 1000) { // 开始录像回放
      startPlayback(params, startTime, endTime);
    },
    getRoomStatusInfo () { // 获取监室状态
      getRoomStatus().then(res => {
        if (res.data.state.code === 200) {
          this.roomStatusCount = res.data.data;
        }
      });
    },
    // 获取房间列表
    getRoomInfo () {
      getRoomList().then(res => {
        if (res.data.state.code === 200) {
          let data = res.data.data;
          this.roomList = this.processRoomListData(data);
        }
      });
    },
    // 获取监控流地址
    getMonitorSrcInfo (jkip, id) {
      getMonitorSrc(jkip, id).then(res => {
        if (res.data.state.code === 200) {
          let monitorUrl = (res.data && res.data.data) || '';
          if (!monitorUrl) return this.$Message.error('获取监控视频失败');
          for (let i = 0; i < this.monitorList.length; i++) {
            if (!this.monitorList[i].src) {
              this.monitorList[i].src = monitorUrl;
              this.monitorList[i].jkip = jkip;
              this.monitorList[i].jkId = id;
              this.$nextTick(() => {
                this.$refs[`monitor${i}`][0] && this.$refs[`monitor${i}`][0].switchSources(monitorUrl);
                setTimeout(() => {
                  this.$refs[`monitor${i}`][0] && this.$refs[`monitor${i}`][0].playerPlay();
                }, 500);
              });
              break;
            }
          }
        }
      });
    },
    // 解析房间列表数据
    processRoomListData (data) {
      let dataArr = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let child1 = {
            title: key,
            expand: false,
            children: []
          };
          const element = data[key];
          if (element.length) {
            element.forEach(item => {
              for (const key in item) {
                if (item.hasOwnProperty(key)) {
                  const ele = item[key];
                  let child2 = {
                    title: key,
                    expand: false,
                    children: []
                  };
                  if (ele.length) {
                    ele.forEach(item => {
                      child2.children.push(Object.assign({}, item, {
                        title: item.roomName
                      }));
                    });
                  }
                  child1.children.push(child2);
                }
              }
            });
          }
          dataArr.push(child1);
        }
      }
      return dataArr;
    },
    dataFormat (oDate, fmt) { // 格式化日期
      const o = {
        'M+': oDate.getMonth() + 1, // 月份
        'd+': oDate.getDate(), // 日
        'h+': oDate.getHours(), // 小时
        'm+': oDate.getMinutes(), // 分
        's+': oDate.getSeconds(), // 秒
        'q+': Math.floor((oDate.getMonth() + 3) / 3), // 季度
        'S': oDate.getMilliseconds()// 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    },
    closeMonitor (idx) {
      if (!this.monitorList[idx].src) return;
      stopMonitor(this.monitorList[idx].jkip, this.monitorList[idx].jkId);
      this.monitorList[idx].src = '';
      this.monitorList[idx].jkip = '';
      this.$refs[`monitor${idx}`][0] && this.$refs[`monitor${idx}`][0].playerPause();
      this.$refs[`monitor${idx}`][0] && this.$refs[`monitor${idx}`][0].switchSources('');
    },
    mutedMonitor (idx) { },
    snapshot (idx, token) {
      if (this.monitorList[idx].isPlay) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://' + config.h5ss.host + '/api/v1/Snapshot?token=' + token + '&session=' + config.h5ss.session);
        xhr.send();
        let scope = this;
        xhr.onreadystatechange = async function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            await scope.downloadUrlFile('http://' + config.h5ss.host + result.strUrl, result.strFileName);
          }
        };
      }
    },
    downloadUrlFile (url, fileName) {
      url = url.replace(/\\/g, '/');
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      // xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取文件blob数据并保存
          this.saveAs(xhr.response, fileName);
        }
      };

      alert('下载成功');
      xhr.send();
    },
    saveAs (data, name) {
      let urlObject = window.URL || window.webkitURL || window;
      let export_blob = new Blob([data]);
      let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      save_link.click();
    },
    manualRecord (idx, token) {
      if (this.monitorList[idx].isPlay) {
        let api = '';
        if (!this.monitorList[idx].isManualRecord) {
          api = 'ManualRecordStart';
          this.monitorList[idx].isManualRecord = true;
          alert('开始录像');
        } else {
          api = 'ManualRecordStop';
          this.monitorList[idx].isManualRecord = false;
          alert('结束录像');
        }
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://' + config.h5ss.host + '/api/v1/' + api + '?token=' + token + '&session=' + config.h5ss.session);
        xhr.send();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
          }
        };
      }
    },
    // 进入全屏
    fullScreen (id) {
      let ele = document.getElementById(id);
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
      }

      this.isFullScreen = true;
    },
    // 退出全屏
    exitFullScreen () {
      let de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }

      this.isFullScreen = false;
    },
    // 全屏
    openFullScreen (idx) {
      if (!this.monitorList[idx].src) return;
      // 全屏
      this.$refs[`monitor${idx}`][0] && this.$refs[`monitor${idx}`][0].handleDBLclick();
      // if (!this.isFullscreenForNoScroll()) {
      //   this.fullScreen(id);
      // } else {
      //   this.exitFullScreen(id);
      // }
    },
    isFullscreenForNoScroll () {
      return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
    },
    openReplay (params) {
      this.isReplay = true;
      this.$refs.replayRef.src = 'http://192.168.1.57:8070/mediastore/record/video-35/2020-08-14TZ08/11-25-24/video-35-3747973b-5582-480f-b004-a88da3f7a868.mp4';
      this.$refs.replayRef.play();
    },
    getMouseupTime () {
      let a = new Date(returnMouseupTime());
    }
  },
  mounted () {
    this.getMeetVideoMessage();
    this.timer = setInterval(this.getMeetVideoMessage, this.flushTime); // 定时获取动态消息，间隔五秒（flushTime）
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.fullHeight = window.fullHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.fullWidth = window.fullWidth;
        resizePlugin((this.fullWidth - 822), (this.fullHeight - this.fullWidth * 0.1983));
      })();
    };
    this.getRoomStatusInfo();
    this.getRoomInfo();
    // 隐藏录像回放监控控件（同步处理）
    // cav(document.getElementById('timeline'));
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      let jkip = this.$route.params.jkip;
      this.getMonitorSrcInfo(jkip, id);
    }
  },
  destroyed () {
    disConnect(); // 关闭所有视频连接
    clearInterval(this.timer); // 清除动态消息定时器
  }
};
</script>
<style lang="less" scoped>
.ivu-message {
  z-index: 999999999 !important;
}
#app {
  .lockBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/common/lockIcon.png) no-repeat 49% 44%,
      url(../../assets/images/common/lock.png) no-repeat;
    background-size: 10% 20%, 100% 100%;
    z-index: 99999999;
    .lockForm {
      position: absolute;
      left: 38.5%;
      top: 72%;
      p {
        text-align: center;
        font-size: 36px;
        line-height: 72px;
        color: #fff;
        width: 410px;
      }
      .ivu-form {
        .ivu-form-item-content {
          margin-left: 0 !important;
          .ivu-input {
            width: 410px !important;
            height: 52px;
            font-size: 18px;
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid #0895c1;
            color: #fff;
          }
        }
      }
      span {
        display: inline-block;
        width: 60px;
        height: 46px;
        background: url(../../assets/images/common/unlockIcon.png) no-repeat;
        background-size: contain;
        position: absolute;
        right: -76px;
        bottom: 26px;
        cursor: pointer;
      }
    }
  }
}
.bgMain {
  .menuList {
    a {
      margin-left: 100px;
      font-size: 20px;
      color: #ffffff;
    }
  }

  div {
    color: rgba(255, 255, 255, 1);
  }

  .videoMonitor {
    height: 78px;
    font-size: 30px;
    font-weight: bold;
    padding-top: 23px;
    padding-left: 11px;
    padding-right: 11px;
    color: rgba(53, 255, 250, 1);

    span {
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
    }
  }

  .realTimeMonitor,
  .replayTheater {
    width: 100%;
    height: 100%;
    padding: 0 24px 0 24px;
    .content {
      width: 100%;
      height: 100%;

      .header {
        .func {
          font-size: 14px;
          float: right;
          div {
            float: left;
            margin-left: 10px;
          }
        }
      }
    }
  }

  .dynamicInformation {
    height: 100%;
    .title {
      height: 78px;
      color: rgba(53, 255, 250, 1);
      line-height: 79px;
      background-color: inherit;
      font-size: 30px;
    }

    .content {
      font-weight: bold;

      span {
        margin-right: 10px;
      }

      div {
        margin: 9px auto;
        line-height: 32px;
      }
    }

    .time {
      border-bottom: 1px solid rgba(0, 111, 233, 0.48);
      padding: 5px 0 10px 33px;
      font-size: 16px;
      img {
        position: relative;
        top: 1px;
      }
    }

    .meetInfo {
      color: #35fffa;
      font-size: 20px;
    }

    .body {
      height: 91%;
      overflow: scroll;
    }

    .index {
      border: 1px solid rgba(27, 107, 147, 1);
      border-radius: 20em;
      background-color: #041934;
      margin-right: 0;
      color: rgba(53, 255, 250, 1);
      display: inline-block;
      text-align: center;
      width: 30px;
      height: 30px;
      font-size: 18px;
      color: #1a9ac7;
    }
  }

  .ivu-layout-sider {
    min-width: 396px !important;
    background-color: transparent;
  }

  .clearBoth {
    clear: both;
  }

  .ivu-layout-sider-children {
    overflow: scroll;
  }

  .monitorList,
  .replayList {
    height: 84%;
    padding: 15px 5px;
    .monitor,
    .replay {
      float: left;
      width: 50%;
      height: 50%;
      background: url(../../assets/images/common/bj-video.png) no-repeat;
      background-size: 100% 100%;
      padding: 2%;

      video {
        width: 100%;
        height: calc(100% - 11px);
      }

      .video-mask {
        width: 100%;
        height: calc(100% - 11px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        user-select: none;
      }

      .bottom {
        font-size: 18px;
        margin-top: 10px;

        .control {
          float: right;

          .ivu-icon {
            font-size: 24px;
            margin-left: 5px;
          }
        }
      }
    }

    .control {
      span {
        font-size: 26px;
        margin-left: 59px;
        cursor: pointer;
      }
    }
  }

  .VideoPlayer {
    width: 100% !important;
    height: 100% !important;
    video {
      width: 100% !important;
      height: 100% !important;
      border: 1px solid #cccccc;
    }
  }
}
</style>

<style lang="less">
.monitor {
  .ivu-tabs-nav .ivu-tabs-tab-active,
  .ivu-tabs-nav .ivu-tabs-tab {
    font-size: 30px !important;
    color: rgba(53, 255, 250, 1);
  }

  .ivu-tabs-ink-bar {
    background-color: rgba(53, 255, 250, 1) !important;
  }

  .ivu-tabs-content {
    height: 91%;
  }

  .ivu-tabs-nav {
    margin-left: 26px;
  }

  .ivu-icon {
    color: #ffffff;
    cursor: pointer;
  }
}
</style>

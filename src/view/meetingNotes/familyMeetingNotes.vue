<template>
  <i-layout class="main-content-con">
    <i-layout>
      <i-content class="main-content-con">
        <i-layout class="main-layout-con">
          <i-content class="content-wrapper">
            <div class="searchTitleInput" style="height: 60px">
              <span class="searchItemText">在押人员姓名:</span>
              <input class="searchItemInput" v-model="searchCon.personnelName" placeholder="请输入姓名">
              <span class="searchItemText">会见开始时间:</span>
              <i-date-picker class="searchItemDate" v-model="searchCon.meetTime" type="daterange" format="yyyy-MM-dd" placeholder="请选择会见开始时间"></i-date-picker>
              <span class="searchItemText">登记时间:</span>
              <i-date-picker class="searchItemDate" v-model="searchCon.registerTime" type="daterange" format="yyyy-MM-dd" placeholder="请选择登记开始时间"></i-date-picker>
              <span class="searchItemText">家属姓名:</span>
              <input class="searchItemInput" v-model="searchCon.familyName" placeholder="请输入家属姓名">
              <i-button ghost style="display: inline-block; margin-left: 25px;" @click="searchLawyerMeetings(searchCon)" class="searchButton">查询</i-button>
            </div>
            <i-table border :columns="meetingNotesColumns" :data="meetingNotesList" ref="table" style="height:660px;margin:0 10px;">
            </i-table>
            <div class="tablePage">
              <i-page style="text-align: right" show-total show-elevator show-sizer :total="meetingNotesListLength" :page-size="searchCon.pageSize" :page-size-opts="pageSizeOpts" @on-change="changeMeetingNotesPageIndex" @on-page-size-change="changeMeetingNotesPageSize">
              </i-page>
            </div>
          </i-content>
        </i-layout>
      </i-content>
    </i-layout>
    <i-modal width="700" v-model="isOpenDetail" @on-ok="isOpenDetail = false">
      <p slot="header">
        <span class="title">查看会见详情</span>
      </p>
      <div class="objInfoModal" style="height:350px;">
        <i-tooltip :content="meetingNotes.personnelName" placement="top-start" v-show="meetingNotes.personnelName">
          姓名：{{meetingNotes.personnelName}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.personnelName">
          姓名：{{meetingNotes.personnelName}}
        </div>
        <i-tooltip :content="meetingNotes.familyId" placement="top-start" v-show="meetingNotes.familyId">
          家属身份证号：{{meetingNotes.familyId}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.familyId">
          家属身份证号：{{meetingNotes.familyId}}
        </div>
        <i-tooltip :content="meetingNotes.familyName" placement="top-start" v-show="meetingNotes.familyName">
          家属姓名：{{meetingNotes.familyName}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.familyName">
          家属姓名：{{meetingNotes.familyName}}
        </div>
        <i-tooltip :content="meetingNotes.meetStartTime" placement="top-start" v-show="meetingNotes.meetStartTime">
          会见开始时间：{{getDate(meetingNotes.meetStartTime, 'year')}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.meetStartTime">
          会见开始时间：{{getDate(meetingNotes.meetStartTime, 'year')}}
        </div>
        <i-tooltip :content="meetingNotes.meetEndTime" placement="top-start" v-show="meetingNotes.meetEndTime">
          会见结束时间：{{getDate(meetingNotes.meetEndTime, 'year')}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.meetEndTime">
          会见结束时间：{{getDate(meetingNotes.meetEndTime, 'year')}}
        </div>
        <i-tooltip :content="meetingNotes.meetPlaceName" placement="top-start" v-show="meetingNotes.meetPlaceName">
          会见地点：{{meetingNotes.meetPlaceName}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.meetPlaceName">
          会见地点：{{meetingNotes.meetPlaceName}}
        </div>
        <i-tooltip :content="meetingNotes.entryTime" placement="top-start" v-show="meetingNotes.entryTime">
          入所时间：{{getDate(meetingNotes.entryTime, 'year')}}
        </i-tooltip>
        <div class="unToolTip" v-show="!meetingNotes.entryTime">
          入所时间：{{getDate(meetingNotes.entryTime, 'year')}}
        </div>
      </div>
      <div slot="footer">
        <i-button type="primary" class="confirmBtn" @click="isOpenDetail = false">确定</i-button>
      </div>
    </i-modal>
    <i-modal width="700" v-model="isOpenVideo" @on-ok="closeVideo" @on-cancel="closeVideo" :mask-closable="false">
      <p slot="header">
        <span class="title">查看会见录像</span>
      </p>
      <i-table :columns="videoColumns" :data="videoList" @on-selection-change="getSelectedVideo">
        <template slot-scope="{row}" slot="progress">
          <i-progress :percent="row.progress" :status="row.downloadStatus">
            <template v-if="row.progress === 100">
              <i-icon type="checkmark-circled"></i-icon>
              <span>成功</span>
            </template>
          </i-progress>
        </template>
      </i-table>
      <div slot="footer">
        <i-button type="primary" class="confirmBtn" @click="downloadVideo">下载</i-button>
        <i-button type="primary" class="confirmBtn" @click="closeVideo">取消</i-button>
      </div>
    </i-modal>
  </i-layout>
</template>
<script>
import NormalButton from '_c/normal-button';
import { formatDate, getDate, getDateAddOneDay } from '@/libs/tools';
import { screenDownload } from '@/api/bg-manage/patrol';
import { listMeetingsRoom } from '@/api/bg-manage/manage/manage';

export default {
  name: 'familyMeetingNotes',
  components: {
    NormalButton
  },
  data () {
    return {
      meetingNotesList: [],
      meetingNotesListLength: 3,
      pageSizeOpts: [10, 15, 20],
      meetingNotesColumns: [
        {
          title: '序号',
          type: 'index',
          width: 90,
          align: 'center'
        },
        {
          title: '在押人员姓名',
          key: 'personnelName',
          width: 150
        },
        {
          title: '家属身份证号',
          key: 'familyId',
          width: 200
        },
        {
          title: '家属姓名',
          key: 'familyName',
          width: 120
        },
        {
          title: '会见开始时间',
          key: 'meetStartTime',
          render: (h, params) => {
            return h('span', this.getDate(params.row.meetStartTime, 'year'));
          }
        },
        {
          title: '会见结束时间',
          key: 'meetEndTime',
          render: (h, params) => {
            return h('span', this.getDate(params.row.meetEndTime, 'year'));
          }
        },
        {
          title: '会见地点',
          key: 'meetPlaceName',
          width: 150
        },
        {
          title: '登记时间',
          key: 'registerTime',
          render: (h, params) => {
            return h('span', this.getDate(params.row.registerTime, 'year'));
          }
        },
        {
          title: '会见状态',
          key: 'meetStatus',
          render: (h, params) => {
            switch (params.row.meetStatus) {
              case '0':
                return h('span', '未开始');
              case '1':
                return h('span', '正在会见');
              case '2':
                return h('span', '会见结束');
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '会见详情',
                  perms: 'audit:pass'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.detail(params.row);
                  }
                }
              }),
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '会见录像',
                  perms: 'audit:fail'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.video(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      videoColumns: [
        {
          type: 'selection',
          align: 'center',
          width: 50
        },
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '视频文件名',
          key: 'name',
          width: 250,
          align: 'center'
        },
        {
          title: '下载进度',
          slot: 'progress',
          width: 250,
          align: 'center'
        }
      ],
      videoList: [],
      selectedVideoList: [],
      // 查询家属会见历史
      searchCon: {
        meetType: "2",
        personnelName: '',
        roomName: '',
        meetTime: [],
        entryTime: [],
        iphone: '',
        registerTime: [],
        meetingRoom: '',
        familyId: '',
        familyName: '',
        idCard: '',
        xm: '',
        meetTimeStart: '',
        meetTimeEnd: '',
        registerTimeStart: '',
        registerTimeEnd: '',
        pageIndex: 1,
        pageSize: 10
      },
      isOpenDetail: false,
      isOpenVideo: false,
      meetingNotes: {
        meetStartTime: '',
        meetEndTime: '',
        meetPlaceName: '',
        entryTime: '',
        deviceCode: '',
        idCard: '',
        iphone: '',
        personnelName: '',
        personnelIdCard: '',
        meetCount: '',
        cause: '',
        registerTime: '',
        meetingRoom: ''
      },
      isLoading: true,
      isInit: false,
      videoUrl: '',
      fullHeight: document.documentElement.clientHeight,
      fullWidth: document.documentElement.clientWidth,
      tableHeight: 0
    };
  },
  methods: {
    getSelectedVideo (selected) {
      this.selectedVideoList = selected;
    },
    downloadVideo () {
      if (!this.selectedVideoList.length) {
        return this.$Message.error('请勾选需要下载的文件');
      }
      this.selectedVideoList.forEach(item => {
        this.videoList[item.index].downloadStatus = 'active';
        this.videoList[item.index].progress = 0;
        this.screenDownload(item);
      });
    },
    screenDownload (videoInfo) {
      screenDownload({
        filePath: videoInfo.filePath,
        fileName: videoInfo.name,
        cb: (e) => {
          if (e.currentTarget && e.currentTarget.status !== 200) {
            return this.$Message.error(`文件（${videoInfo.index + 1}）下载失败`);
          }
          let progress = parseInt(e.loaded * 100 / e.total);
          this.videoList[videoInfo.index].progress = progress;
        }
      }).then(res => {
        let url = window.URL.createObjectURL(new Blob([res.data], {
          type: 'video/avi'
        }));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = videoInfo.name.split('.')[0];
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
    },
    searchLawyerMeetings () {
      this.searchCon.pageIndex = 1;
      this.listLawyerMeetingsRoom();
    },
    listLawyerMeetingsRoom () {
      if (this.searchCon.meetTime[0] && this.searchCon.meetTime[1]) {
        this.searchCon.meetTimeStart = getDate(formatDate(this.searchCon.meetTime[0]), 'year');
        this.searchCon.meetTimeEnd = getDateAddOneDay(formatDate(this.searchCon.meetTime[1]), 'year');
      }
      if (this.searchCon.registerTime[0] && this.searchCon.registerTime[1]) {
        this.searchCon.registerTimeStart = getDate(formatDate(this.searchCon.registerTime[0]), 'year');
        this.searchCon.registerTimeEnd = getDateAddOneDay(formatDate(this.searchCon.registerTime[1]), 'year');
      }
      listMeetingsRoom(this.searchCon).then(res => {
        this.meetingNotesList = res.data.data;
        this.meetingNotesListLength = res.data.page.total;
      });
    },
    detail (params) {
      this.meetingNotes = params;
      this.isOpenDetail = true;
    },
    video (params) {
      if (params.filePath && params.filePath.length) {
        this.videoList = [];
        params.filePath.forEach((item, index) => {
          let name = item.split('/').reverse()[0];
          this.videoList.push({
            name,
            progress: 0,
            downloadStatus: 'normal',
            filePath: item,
            index
          });
        });
      }
      this.meetingNotes = params;
      this.isOpenVideo = true;
    },
    dataFormat (oDate, fmt) {
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
    closeVideo () {
      this.isOpenVideo = false;
      this.isInit = false;
      this.videoList = [];
    },
    getDate (time, format) {
      if (time === undefined) {
        return '';
      } else {
        return getDate(time, format);
      }
    },
    isNull (value) {
      if (value === '' || value === undefined || value === null) {
        return true;
      }
      return false;
    },
    isNullArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isNull(arr[i])) {
          return true;
        }
      }
      return false;
    },
    changeMeetingNotesPageIndex (index) {
      this.searchCon.pageIndex = index;
      this.listLawyerMeetingsRoom();
    },
    changeMeetingNotesPageSize (pageSize) {
      this.searchCon.pageSize = pageSize;
      this.listLawyerMeetingsRoom();
    }
  },
  watch: {},
  mounted () {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop;
    this.listLawyerMeetingsRoom();
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
  .top {
    margin: 0 50px 0 210px;
  }
  .bottom {
    margin-top: 6px;
  }
  .clear {
    clear: both;
  }
}
.menuInfoBox {
  width: 15%;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(52, 108, 234, 0.27);
  margin: 0 10px 4px 20px;
  float: left;
  .infoBox {
    width: 95%;
    height: 118px;
    background: rgba(227, 234, 254, 1);
    border-radius: 4px;
    margin: 6px 9px;
    overflow: auto;
    font: 14px Microsoft YaHei;
    color: rgba(85, 85, 85, 1);
    .areaName {
      display: block;
      height: 16px;
      width: 100px;
      margin: 5px auto;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .menuInfo {
      display: block;
      width: 100px;
      margin: 0 auto;
      line-height: 35px;
      text-align: center;
    }
    .roomInfoBox {
      width: 50%;
      float: left;
    }
  }
}
</style>

<template>
  <div>
    <div class="title">运行日志</div>
    <i-row>
        <i-col  class="tableCol">
          <span class="searchItemText">模块</span>
          <i-select class="selectionIcon" v-model="searchCon.data.logModule">
            <i-option v-for="(item, index) in logModuleList" :value="item.id" :key="index">{{ item.name }}</i-option>
          </i-select>
          <span  class="searchItemText">操作级别</span>
          <i-select class="selectionIcon" v-model="searchCon.data.logLevel">
            <i-option v-for="(item, index) in logLevelList" :value="item.id" :key="index">{{ item.name }}</i-option>
          </i-select>
          <span class="searchItemText">内容</span>
          <input v-model="searchCon.data.logContent" class="searchItemInput" type="text">
          <div style="height: 10px;"></div>
          <span class="searchItemText">时间</span>
          <i-date-picker type="datetime"
                         @on-change="setLogDateStart"
                         format="yyyy-MM-dd HH:mm:ss"
                         v-model="logDateStart"
                         placeholder="请输入日期">
          </i-date-picker>
          <span class="searchItemText" style="width: 100px;">至</span>
          <i-date-picker type="datetime"
                         v-model="logDateEnd"
                         @on-change="setLogDateEnd"
                         format="yyyy-MM-dd HH:mm:ss"
                         placeholder="请输入日期">
          </i-date-picker>
          <i-button type="primary" style="display: inline-block;margin-left:20px;" @click="searchByCon">查询</i-button>
          <form class="export-form" enctype="application/x-www-form-urlencoded" :action="exportUrl" method="GET">
            <input class="export-param" type="text" name="logType" :value="searchCon.data.logType">
            <input class="export-param" type="text" name="logModule" :value="searchCon.data.logModule">
            <input class="export-param" type="text" name="logLevel" :value="searchCon.data.logLevel">
            <input class="export-param" type="text" name="logDateStart" :value="searchCon.data.logDateStart">
            <input class="export-param" type="text" name="logSateEnd" :value="searchCon.data.logSateEnd">
            <input class="export-btn" type="submit" value="导出日志">
          </form>
          <div style="height: 10px;"></div>
          <i-table border ref="table" :columns="columns" :data="logList"
                   style="height:calc(100% - 11vw);position:absolute;">
          </i-table>
          <div class="tablePage">
            <i-page style="text-align: right"
                    show-total
                    show-elevator
                    show-sizer
                    :current="searchCon.pageParam.pageIndex"
                    :total="total"
                    :page-size="pageSize"
                    :page-size-opts="pageSizeOpts"
                    @on-change="changePageIndex"
                    @on-page-size-change="changePageSize">
            </i-page>
          </div>
        </i-col>
    </i-row>
  </div>
</template>

<script>
import {
  findLogByCon
} from '@/api/bg-manage/log';
import Border from '_c/border/borderWithTitle.vue';
import PermissionButton from '_c/permission-button';
import { tableTip } from '@/libs/tableTip';

export default {
  name: 'log',
  components: {
    Border,
    PermissionButton,
    tableTip
  },
  data () {
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '操作级别',
          key: 'level',
          width: 100
        },
        {
          title: '时间',
          key: 'time',
          width: 200
        },
        {
          title: '内容',
          key: 'message'
          /*
          render: tableTip
*/
        }
      ],
      logList: [],
      logDateStart: '',
      logDateEnd: '',
      logTypeList: [
        {
          name: '操作日志',
          id: 'OPERATION'
        },
        {
          name: '运行日志',
          id: 'RUNTIME'
        }
      ],
      logModuleList: [
        {
          name: '律师会见',
          id: 'lawyer_meet'
        }],
      logLevelList: [
        {
          name: 'ERROR',
          id: 'ERROR'
        }
      ],
      total: 0,
      pageSize: 10,
      pageSizeOpts: [10, 15, 20],
      searchCon: {
        needPage: true,
        pageParam: {
          pageIndex: 1,
          pageSize: 10
        },
        data: {
          logType: 'RUNTIME',
          logModule: 'lawyer_meet',
          logContent: '',
          logLevel: 'ERROR',
          logDateStart: '',
          logDateEnd: '',
          logUser: ''
        }
      },
      exportUrl: ''
    };
  },
  mounted () {
    this.searchByCon();
    this.exportUrl = location.origin + '/sysmgr/sysLog/excelDownloadLog';
  },
  methods: {
    searchByPage () {
      if (this.searchCon.pageParam.pageSize * this.searchCon.pageParam.pageIndex > 10000) {
        this.$Message.error('最多查询前10000条数据,请缩小查询范围');
        return;
      }
      findLogByCon(this.searchCon).then(res => {
        this.logList = res.data.data;
        this.total = res.data.page.total;
      });
    },
    searchByCon () {
      if (this.searchCon.pageParam.pageSize * this.searchCon.pageParam.pageIndex > 10000) {
        this.$Message.error('最多查询前10000条数据,请缩小查询范围');
        return;
      }
      this.searchCon.pageParam.pageIndex = 1;
      findLogByCon(this.searchCon).then(res => {
        this.logList = res.data.data;
        this.total = res.data.page.total;
      });
    },
    changePageIndex (index) {
      this.searchCon.pageParam.pageIndex = index;
      this.searchByPage();
    },
    changePageSize (pageSize) {
      this.searchCon.pageParam.pageSize = pageSize;
      this.searchByPage();
    },
    setLogDateStart (date) {
      this.searchCon.data.logDateStart = date;
    },
    setLogDateEnd (date) {
      this.searchCon.data.logDateEnd = date;
    }
  }

};
</script>
<style lang="less">
  .export-form {
    display: inline-block;
    margin-left: 20px;
  }
  .export-param {
    display: none;
  }
  .export-btn {
    padding: 5px 15px 6px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #2d8cf0;
    border: 1px solid #2d8cf0;
    cursor: pointer;
    &:hover {
      background-color: #57a3f3;
      border-color: #57a3f3;
    }
  }
  .tableCol /deep/ .ivu-btn-text,
  .tableCol /deep/ .ivu-time-picker-cells-cell {
    color: #fff;

    &:hover {
      color: #2d8cf0;
    }
  }
  .tableCol /deep/ .ivu-time-picker-cells-cell-selected {
    color: #2d8cf0;

    &:hover {
      color: #2d8cf0;
    }
  }
</style>

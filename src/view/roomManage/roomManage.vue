<template>
  <i-content class="main-content-con manage">
    <LawyerScreencast ref="lawyerScreencast" :roomId="currentRoomNo" :roomName="currentRoomName" :title="lawyerscreenTitle" @handleSuspend="handleSuspend" @handleChipIn="handleChipIn"></LawyerScreencast>
    <i-layout class="main-layout-con">
      <i-content class="content-wrapper">
        <NormalButton type="primary" label="新增" size="small" style="margin-left: 69%; margin-top: 10px; margin-bottom: 10px;" class="searchButton" @click="openRoomModal('add')"></NormalButton>
        <NormalButton type="primary" label="查看" size="small" style="margin-left: 0.5%" class="searchButton" @click="openRoomModal('detail')"></NormalButton>
        <NormalButton type="primary" label="修改" size="small" style="margin-left: 0.5%" class="searchButton" @click="openRoomModal('update')"></NormalButton>
        <NormalButton type="primary" label="删除" size="small" style="margin-left: 0.5%" class="searchButton" @click="deleteRoomModal()"></NormalButton>
        <NormalButton type="primary" label="上传通用模板" size="small" style="margin-left: 0.5%" class="searchButton" @click="openUploadModel()"></NormalButton>
        <i-table border ref="table" :columns="columns2" :data="data2" @on-selection-change="selectChange" style="height:calc(100% - 12vw);margin:0 10px;">
        </i-table>
        <div class="tablePage">
          <i-page style="text-align: right" :current="searchCon2.pageParam.pageIndex" :total="total2" :page-size="pageSize" :page-size-opts="pageSizeOpts" show-total @on-change="changePageIndex2" @on-page-size-change="changePageSize2" show-elevator show-sizer>
          </i-page>
        </div>
        <!--确认框-->
        <confirm-box :confirmModel="confirmModel" :confirmActive="confirmActive" @passModel="updateConfirmModel($event)" @confirmValue="confirmValue()"></confirm-box>
        <confirm-box :confirmModel="confirmModel2" :confirmActive="confirmActive" @passModel="updateConfirmModel2($event)" @confirmValue="confirmValue2()"></confirm-box>
        <i-modal v-model="uploadDefaultTempModel" width="55%" height="80%">
          <p slot="header">
            <span class="title">上传通用模板</span>
          </p>
          <div style="width:100%">
            <i-upload action="" style="margin-left: 80%" type="select" :before-upload="uploadDefaultTemp" :format="['doc', 'docx', 'DOC', 'DOCX']" accept=".doc,.docx,.DOC,.DOCX">
              <NormalButton type="primary" label="新增" size="small" class="searchButton" @click="defaultTempId = ''"></NormalButton>
            </i-upload>
          </div>
          <i-table border ref="table" :columns="defaultTempColumns" :data="defaultTempData" style="height:calc(100% - 12vw);margin:0 10px;">
          </i-table>
          <div class="tablePage">
            <i-page style="text-align: right" :current="defaultTempCon.pageParam.pageIndex" :total="defaultTempTotal" :page-size="defaultTempSize" :page-size-opts="pageSizeOpts" show-total @on-change="changeDefaultTempIndex" @on-page-size-change="changeDefaultTempSize" show-elevator show-sizer>
            </i-page>
          </div>
          <div class="confirmButton" slot="footer">
          </div>
        </i-modal>
        <i-modal v-model="uploadDefaultTempModel1" width="55%" height="80%" @on-cancel="closeUploadModal1">
          <p slot="header">
            <span class="title">查看模板</span>
          </p>
          <i-table border ref="table1" :columns="defaultTempColumns1" :data="defaultTempData1">
          </i-table>
          <div class="confirmButton" slot="footer">
          </div>
        </i-modal>

        <i-modal v-model="roomModal" width="423" @on-visible-change="closeRoomModal1" @on-cancel="closeRoomModal">
          <p slot="header">
            <span class="title">会见室{{this.operateName === 'detail' ?'详情': this.operateName === 'add' ? '新增': '修改'}}</span>
          </p>
          <div class="caseInfo" style="height: 333px;overflow: auto;">
            <i-form ref="roomModel" :model="roomModel" :rules="roomRuleValidate" :label-width="86" label-position="right">
              <span class="v-transfer-title">会见室信息</span>
              <span style="margin-left: 16px;"><span style="color:#ed4014">*</span>项为必填项</span>
              <i-row style="margin-top: 16px;">
                <i-col span="8">
                  <i-form-item label="房间类型:" prop="roomType" :label-width="120">
                    <i-select class="selectionIcon" v-model="roomModel.roomType" ref="roomType" :key="timer" :disabled="operateName === 'detail'">
                      <i-option v-for="(item, index) in roomTypeList" :value="item.id" :key="index">{{ item.value }}
                      </i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="所属组织机构:" prop="unitCode" :label-width="120">
                    <i-select class="selectionIcon" v-model="roomModel.unitCode" :disabled="operateName === 'detail'">
                      <i-option v-for="(item, index) in organizeList" :value="item.organizeCode" :key="index">{{
                        item.organizeName }}
                      </i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="会见室名称:" prop="roomName" :label-width="120">
                    <i-input v-model="roomModel.roomName" :disabled="operateName === 'detail'"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="会见室ip:" prop="ip" :label-width="120">
                    <i-input v-model="roomModel.ip" :disabled="operateName === 'detail'"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="监控ip:" prop="jkip" :label-width="120">
                    <i-input v-model="roomModel.jkip" :disabled="operateName === 'detail'"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="监控账号:" prop="jkUserName" :label-width="120">
                    <i-input v-model="roomModel.jkUserName" :disabled="operateName === 'detail'"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="监控密码:" prop="jkPassword" :label-width="120">
                    <i-input v-model="roomModel.jkPassword" :disabled="operateName === 'detail'"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div slot="footer" style="text-align: center">
            <Button ghost v-show="!isDetail" class="searchButton" @click="saveRoom">确认</Button>
            <Button ghost class="searchButton" @click="closeRoomModal">取消</Button>
          </div>
        </i-modal>
        <!--删除确认框-->
        <confirm-box :confirmModel="roomConfirmModel" :confirmActive="roomConfirmActive" @passModel="updateConfirmModel1($event)" @confirmValue="roomDelete($event)">
        </confirm-box>
        <!--挂断确认框-->
        <confirm-box :confirmModel="hangUpConfirmModel" :confirmActive="hangUpConfirmActive" @passModel="cancelHangUp($event)" @confirmValue="hangUp($event)">
        </confirm-box>
      </i-content>
    </i-layout>
  </i-content>
</template>
<script>
import NormalButton from '_c/normal-button';
import LawyerScreencast from '_c/lawyerScreencast';
import {
  listRoom,
  updateRoomStatus,
  uploadTranscriptTemplate,
  deleteTranscriptTemplate,
  uploadDefaultTemplate,
  searchDefaultTemp,
  deleteDefaultTemplate,
  orderDefaultTemp,
  findOrganizeByType,
  save,
  roomDelete
} from '@/api/bg-manage/manage/manage';
import confirmBox from '_c/confirmBox';
import { validateIp } from '@/libs/verification';

const getHandledValue = num => {
  return num < 10 ? '0' + num : num;
};
export default {
  name: 'manage',
  components: {
    NormalButton,
    confirmBox,
    LawyerScreencast
  },
  data: function () {
    return {
      uploadDefaultTempModel: false,
      uploadDefaultTempModel1: false,
      data2: [],
      pageSize: 10,
      defaultTempSize: 10,
      pageSizeOpts: [10, 15, 20], // 每页显示条数的配置
      total2: 0,
      defaultTempTotal: 0,
      defaultTempTotal1: 0,
      pageCurrent: 1, // 当前页
      searchCon2: {
        needPage: true,
        pageParam: {
          pageIndex: 1,
          pageSize: 10
        }
      },
      defaultTempCon: {
        needPage: true,
        pageParam: {
          pageIndex: 1,
          pageSize: 10
        }
      },
      uploadRowId: '',
      columns2: [
        {
          title: '序号',
          type: 'index',
          width: 90,
          align: 'center'
        }, {
          title: '选择',
          key: 'id',
          width: 70,
          align: 'center',
          render: (h, params) => {
            let id = params.row.id;
            let currentObject = params.row;
            let flag = this.currentChoose === id;
            let self = this;
            return h('div', [
              h('Checkbox', {
                props: {
                  value: flag
                },
                on: {
                  'on-change': () => {
                    if (!flag) {
                      self.currentChoose = id;
                      self.roomModel = JSON.parse(JSON.stringify(currentObject));
                    } else {
                      self.currentChoose = '';
                    }
                  }
                }
              })
            ]);
          }
        },
        {
          title: '律师会见室',
          align: 'center',
          filters: [
            {
              label: '律师',
              value: 1
            },
            {
              label: '在押',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.roomType === '1';
            } else {
              return row.roomType === '2';
            }
          },
          render: (h, params) => {
            return h('span', params.row.roomName);
          }
        },
        {
          title: '所属组织',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.organizeName);
          }
        },
        {
          title: '房间状态',
          align: 'center',
          filters: [
            {
              label: '开启',
              value: 1
            },
            {
              label: '空闲',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.roomStatus === 1;
            } else if (value === 2) {
              return row.roomStatus === 2;
            } else if (value === 3) {
              return row.roomStatus === 3;
            }
          },
          render: (h, params) => {
            if (params.row.roomStatus) {
              if (params.row.roomStatus === 1) {
                if (Number(params.row.meetStatus) === 1) {
                  return h('span', '开启');
                } else {
                  return h('span', '空闲');
                }
              } else if (params.row.roomStatus === 2) {
                return h('span', '关闭');
              } else if (params.row.roomStatus === 3) {
                return h('span', '空闲');
              }
            }
          }
        },
        {
          title: '房间使用人',
          align: 'center',
          render: (h, params) => {
            if (params.row.roomStatus === 3) {
              return h('span', '无');
            } else {
              if (params.row.name === undefined || params.row.lawyerName === undefined) {
                return h('span', '无');
              }
              return h('span', '在押：' + params.row.name + '，律师：' + params.row.lawyerName);
            }
          }
        },
        {
          title: '笔录模板',
          key: 'templateLists',
          align: 'center',
          render: (h, params) => {
            if (params.row.roomStatus === 1) {
              return h('span', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.defaultTempData1 = params.row.templateList;
                    this.uploadDefaultTempModel1 = true;
                  }
                }
              }, params.row.templateLists);
            }
          }
        },
        {
          title: '会见管理',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '插话',
                  perms: 'manage:insert',
                  disabled: !this.isPoliceRole || (Number(params.row.roomType) === 1)
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (Number(params.row.roomStatus) === 1 && Number(params.row.meetStatus) === 1) {
                      this.currentRoomNo = Number(params.row.roomType) === 1 ? params.row.videoRoom : params.row.roomNo;
                      this.$root.$emit('showChatDialog', {
                        title: params.row.roomName,
                        roomNo: params.row.roomNo
                      });
                    } else {
                      return this.$Message.error('当前房间未开启，无法插话');
                    }
                  }
                }
              }),
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '视频',
                  perms: 'manage:video',
                  disabled: !this.isPoliceRole || (Number(params.row.roomType) === 1)
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (Number(params.row.roomStatus) === 1 && Number(params.row.meetStatus) === 1) {
                      this.currentRoomNo = Number(params.row.roomType) === 1 ? params.row.videoRoom : params.row.roomNo;
                      this.currentRoomName = params.row.roomName;
                      this.lawyerscreenTitle = `${params.row.name || ''}在押人员与${params.row.lawyerName || ''}律师会见画面`;
                      this.$nextTick(() => {
                        this.$refs.lawyerScreencast.handleShowLawyerScreencast();
                      });
                    } else {
                      return this.$Message.error('当前房间未开启，无法视频');
                    }
                  }
                }
              }),
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '中止',
                  perms: 'manage:stop',
                  disabled: !this.isPoliceRole || (Number(params.row.roomType) === 1) // 管理员账号 或 律师房间无法操作
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (Number(params.row.roomStatus) === 1 && Number(params.row.meetStatus) === 1) {
                      this.currentRoomNo = Number(params.row.roomType) === 1 ? params.row.videoRoom : params.row.roomNo;
                      this.hangUpConfirmModel = true;
                    } else {
                      this.$Message.error('当前房间未开启，无需中止');
                    }
                  }
                }
              })
            ]);
          }
        }
      ],
      tableHeight: 0,
      confirmModel: false,
      confirmModel2: false,
      confirmActive: '删除',
      deleteTempId: '',
      defaultTempData: [],
      defaultTempData1: [],
      defaultTempId: '',
      deleteDefaultTempId: '',
      defaultTempColumns: [
        {
          title: '模板名称',
          align: 'center',
          key: 'encName'
        },
        {
          title: '排序',
          align: 'center',
          render: (h, params) => {
            let elementArray = [];
            let tempType = params.row.tempType;
            let maxTempType = params.row.maxTempType;
            let minTempType = params.row.minTempType;
            if (tempType !== minTempType) {
              elementArray.push(h('span', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    transfer: true
                  }
                }, [h('Icon', {
                  props: {
                    type: 'md-arrow-dropup',
                    size: '20'
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#2BABFF'
                  },
                  on: {
                    click: () => {
                      this.orderTemp('up', params.row.id);
                    }
                  }
                }),
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal'
                  }
                }, '上移')])
              ]));
            }
            if (tempType !== maxTempType) {
              elementArray.push(h('span', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    transfer: true
                  }
                }, [h('Icon', {
                  props: {
                    type: 'md-arrow-dropdown',
                    size: '20'
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#2BABFF'
                  },
                  on: {
                    click: () => {
                      this.orderTemp('down', params.row.id);
                    }
                  }
                }),
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal'
                  }
                }, '下移')])
              ]));
            }
            return h('div', elementArray);
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Upload', {
                props: {
                  type: 'select',
                  action: '',
                  format: ['doc', 'docx', 'DOC', 'DOCX'],
                  accept: '.doc,.docx,.DOC,.DOCX',
                  'before-upload': this.uploadDefaultTemp
                },
                style: {
                  display: 'inline',
                  marginLeft: '35%',
                  float: 'left'
                }
              },
                [
                  h(NormalButton, {
                    props: {
                      type: 'primary',
                      size: 'small',
                      label: '修改',
                      perms: 'manage:upload'
                    },
                    style: {},
                    on: {
                      click: () => {
                        this.defaultTempId = params.row.id; // 赋值当前行参数，用于编写业务逻辑时使用
                      }
                    }
                  })
                ]),
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '删除',
                  perms: 'manage:delete'
                },
                style: {
                  marginLeft: '1%',
                  marginTop: '6px',
                  float: 'left'
                },
                on: {
                  click: () => {
                    this.deleteDefaultTemp(params.row.id);
                  }
                }
              })
            ]);
          }
        }
      ],
      defaultTempColumns1: [
        {
          title: '模板名称',
          align: 'center',
          key: 'encName'
        }
      ],
      roomModal: false,
      operateName: '',
      roomModel: {
        id: '',
        roomType: '1',
        roomStatus: '3',
        ip: '',
        jkip: '',
        jkUserName: '',
        jkPassword: ''
      },
      roomRuleValidate: {
        roomType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        unitCode: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        roomName: [
          { required: true, message: '不能为空', trigger: 'blur' }, { max: 50, message: '最多输入50字' }
        ],
        ip: [
          { required: true, validator: validateIp, trigger: 'blur' }
        ],
        jkip: [
          { required: true, validator: validateIp, trigger: 'blur' }
        ],
        jkUserName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        jkPassword: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      isDetail: false,
      organizeList: [],
      roomTypeList: [{
        id: '1',
        value: '律师远程'
      }, {
        id: '2',
        value: '在押远程'
      }],
      selectedIds: [],
      roomConfirmModel: false,
      roomConfirmActive: '删除',
      currentChoose: '',
      socket: '',
      id: '',
      hangUpConfirmModel: false,
      hangUpConfirmActive: '中止',
      currentRoomNo: '',
      currentRoomName: '',
      lawyerscreenTitle: '',
      timer: ''
    };
  },
  computed: {
    isPoliceRole () {
      return this.$store.state.user.isPoliceRole;
    }
  },
  methods: {
    closeModal () {
    },
    searchByPage2 () {
      listRoom(this.searchCon2).then(res => {
        this.data2 = res.data.data;
        this.total2 = res.data.page.total;
        this.searchCon2.pageParam.pageIndex = res.data.page.pageIndex;
      });
    },
    searchByCon2 () {
      listRoom(this.searchCon2).then(res => {
        this.data2 = res.data.data;
        this.total2 = res.data.page.total;
      });
    },
    searchDefaultTemp () {
      this.defaultTempCon.pageParam.pageIndex = 1;
      searchDefaultTemp(this.defaultTempCon).then(res => {
        this.defaultTempData = res.data.data;
        this.defaultTempTotal = res.data.page.total;
      });
    },
    searchDefaultTempByPage () {
      searchDefaultTemp(this.defaultTempCon).then(res => {
        this.defaultTempData = res.data.data;
        this.defaultTempTotal = res.data.page.total;
      });
    },
    getDate (timeStamp) {
      const d = new Date(timeStamp);
      const year = d.getFullYear();
      const month = getHandledValue(d.getMonth() + 1);
      const date = getHandledValue(d.getDate());
      return year + '-' + month + '-' + date;
    },
    changePageIndex2 (index) {
      this.searchCon2.pageParam.pageIndex = index;
      this.searchByPage2();
    },
    changePageSize2 (pageSize) {
      this.searchCon2.pageParam.pageSize = pageSize;
      this.searchByPage2();
    },
    changeDefaultTempIndex (index) {
      this.defaultTempCon.pageParam.pageIndex = index;
      this.searchDefaultTempByPage();
    },
    changeDefaultTempSize (pageSize) {
      this.defaultTempCon.pageParam.pageSize = pageSize;
      this.searchDefaultTempByPage();
    },
    updateRoomStatus (id, status) {
      let params = {};
      params.id = id;
      params.roomStatus = status;
      updateRoomStatus(params).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('修改成功！');
          this.searchByCon2();
        }
      });
    },
    uploadTempFile (file) {
      const formData = new window.FormData();
      formData.append('file', file);
      formData.append('roomId', this.uploadRowId);
      uploadTranscriptTemplate(formData).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('上传成功');
          this.searchByPage2();
        }
      });
      return false;
    },
    deleteTempFile (id) {
      this.confirmModel = true;
      this.deleteTempId = id;
    },
    deleteDefaultTemp (id) {
      this.confirmModel2 = true;
      this.deleteDefaultTempId = id;
    },
    updateConfirmModel (el) {
      this.confirmModel = el;
      this.deleteTempId = '';
      this.searchByPage2();
    },
    updateConfirmModel2 (el) {
      this.confirmModel2 = el;
      this.deleteDefaultTempId = '';
    },
    confirmValue () {
      deleteTranscriptTemplate(this.deleteTempId).then(res => {
        if (res.data.state.code === 200) {
          this.confirmModel = false;
          this.$Message.success('删除成功');
          this.deleteTempId = '';
          this.searchByPage2();
        }
      });
    },
    confirmValue2 () {
      deleteDefaultTemplate(this.deleteDefaultTempId).then(res => {
        if (res.data.state.code === 200) {
          this.confirmModel2 = false;
          this.$Message.success('删除成功');
          this.deleteDefaultTempId = '';
          this.searchDefaultTemp();
        }
      });
    },
    uploadDefaultTemp (file) {
      const formData = new window.FormData();
      formData.append('file', file);
      formData.append('tempType', this.defaultTempId);
      uploadDefaultTemplate(formData).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('上传成功');
          this.searchDefaultTemp();
        }
      });
      return false;
    },
    closeUploadModal () {
      this.uploadDefaultTempModel = false;
    },
    openUploadModel () {
      this.searchDefaultTemp();
      this.uploadDefaultTempModel = true;
    },
    closeUploadModal1 () {
      this.uploadDefaultTempModel1 = false;
      this.defaultTempData1 = [];
    },
    orderTemp (action, tempId) {
      orderDefaultTemp(action, tempId).then(res => {
        if (res.data.state.code === 200) {
          this.searchDefaultTemp();
        }
      });
    },
    openRoomModal (operation) {
      this.operateName = operation;
      this.isDetail = operation === 'detail';
      if (operation !== 'add' && this.currentChoose === '') {
        this.$Message.error('未选中会见室');
        return;
      }
      this.findOrganizeByType(this.roomModel.roomType);
      this.roomModal = true;
    },
    closeRoomModal () {
      this.roomModal = false;
      this.$refs.roomModel.resetFields();
      this.currentChoose = '';
      this.roomModel.id = '';
      this.timer = new Date().getTime(); // 刷新子组件
    },
    closeRoomModal1 () {
    },
    saveRoom () {
      this.$refs.roomModel.validate(valid => {
        if (valid) {
          save(this.roomModel).then(res => {
            if (res.data.state.code === 200) {
              this.$Message.success('保存成功');
              this.searchByCon2();
              this.closeRoomModal();
            }
          });
        }
      });
    },
    findOrganizeByType (type) {
      findOrganizeByType(type).then(res => {
        if (res.data.state.code === 200) {
          this.organizeList = res.data.data;
        }
      });
    },
    selectChange (selection) {
      this.selectedIds = [];
      selection.forEach(item => {
        this.selectedIds.push(item.id);
      });
    },
    deleteRoomModal () {
      if (this.currentChoose === '') {
        this.$Message.error('未选中会见室');
        return;
      }
      this.roomConfirmModel = true;
    },
    roomDelete () {
      roomDelete(this.currentChoose).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('删除成功');
          this.searchByCon2();
        }
        this.roomConfirmModel = false;
        this.closeRoomModal();
      });
    },
    updateConfirmModel1 () {
      this.searchByCon2();
      this.roomConfirmModel = false;
      this.closeRoomModal();
    },
    hangUp () {
      this.$socket.emit('sendHangUp', this.currentRoomNo);
      this.hangUpConfirmModel = false;
      this.$refs.lawyerScreencast && this.$refs.lawyerScreencast.handleHideLawyerScreencast();
      let that = this;
      setTimeout(function () {
        that.searchByCon2();
      }, 1000);
    },
    cancelHangUp () {
      this.hangUpConfirmModel = false;
    },
    handleSuspend (roomId) {
      this.currentRoomNo = roomId;
      this.hangUpConfirmModel = true;
    },
    handleChipIn (roomId, roomName) {
      this.currentRoomNo = roomId;
      this.$root.$emit('showChatDialog', {
        title: roomName,
        roomNo: roomId
      });
    }
  },
  watch: {},
  mounted () {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60;
    this.searchByCon2(this.searchCon);
    this.findOrganizeByType(1);
  }
};
</script>
<style lang="less" scoped>
.ivu-upload {
  display: inline-block;
  margin: 13px;
}

.ivu-message {
  z-index: 999999999 !important;
}

#sfz {
  width: 760px;

  input {
    width: 610px !important;
  }
}

.upload-content {
  .ivu-upload-drag {
    background: transparent;
  }
}
</style>

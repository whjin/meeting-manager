<template>
  <div class="dialog">
    <Modal
      v-model="dialogShow"
      draggable
      scrollable
      footer-hide
      class="normal-dialog"
      @on-cancel="handleClose"
      width="600"
      >
      <div slot="header" class="title">
        {{ title }}
        <Icon type="ios-remove" size="36" @click="minimize" />
      </div>
      <ul class="chat-content"
          v-if="messageList[currentRoomNo] && messageList[currentRoomNo].length"
          ref="chatContent">
        <li
          v-for="item in messageList[currentRoomNo]"
          :key="item.noticeId"
          :class="{ right: item.roleType }"
        >
          <span class="name">{{ item.roleName }}</span>
          <p class="message">{{ item.message }}</p>
        </li>
      </ul>
      <div class="no-message" v-else>暂无消息</div>
      <footer class="chat-footer">
        <Input
          v-model="message"
          placeholder="请输入..."
          style="flex: 1; width: 100%; height: 100%;"
        />
        <span class="post-btn"
              @click="handleSendMessage">发送</span>
      </footer>
    </Modal>
    <Modal
      v-model="miniDialogShow"
      footer-hide
      :mask="false"
      :mask-closable="false"
      class="mini-dialog"
      @on-cancel="handleClose"
    >
      <div slot="header" class="title">
        {{ title }}
        <Icon type="ios-square-outline" size="22" @click="showDialog" />
      </div>
    </Modal>
    <div class="notification">
      <div class="notification-icon-wrapper">
        <mark class="length-tips">{{ noticeList.length }}</mark>
        <Icon class="notification-icon"
              :type="notificationShow ? 'ios-arrow-down' : 'md-mail'"
              size="50"
              color="#fff"
              @click="handleNotificationShow" />
      </div>
      <transition name="slide">
        <ul class="notification-list" v-show="noticeList.length && notificationShow">
          <li class="notice"
              v-for="item in noticeList"
              :key="item.id"
              v-show="!Number(item.status)">
            <div class="header">消息提醒</div>
            <div class="center">
              <div class="content">{{ item.roomName }}{{ item.messageType === 1 ? '存在异常人脸，请及时处理！' : '律师发来消息，请及时查阅处理！'}}</div>
              <div class="check-box">
                <Button type="primary"
                        style="font-size: 20px; padding: 1px 10px;"
                        @click="checkMeetStatus(item)">{{ item.messageType === 1 ? '查看监控' : '查看回复' }}</Button>
                <div class="notice-time">{{ getDate(Number(item.saveTime)) }}</div>
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
import { getNoticeList, updateNoticeStatus, checkMeetStatus } from '@/api/bg-manage/chatDialog/notice.js';
import { getDate } from '@/libs/tools';
export default {
  name: 'ChatDialog',
  data () {
    return {
      dialogShow: false,
      miniDialogShow: false,
      notificationShow: true,
      messageList: {}, // 各房间聊天数据
      message: '', // 当前准备发送的消息
      currentRoomNo: '',
      title: '消息提醒',
      noticeList: []
    };
  },
  computed: {
    userName () {
      return this.$store.state.user.userName;
    },
    organizeCode () {
      return this.$store.state.user.organizeCode;
    }
  },
  methods: {
    minimize () {
      this.dialogShow = false;
      this.miniDialogShow = true;
    },
    showDialog () {
      this.dialogShow = true;
      this.miniDialogShow = false;
    },
    expandMessageList (msg) {
      if (!(this.currentRoomNo in this.messageList)) {
        this.$set(this.messageList, this.currentRoomNo, []);
      }
      this.messageList[this.currentRoomNo].push(msg);
      // 自动定位到最新消息
      this.$nextTick(() => {
        if (this.$refs.chatContent && this.$refs.chatContent.lastElementChild) {
          this.$refs.chatContent.lastElementChild.scrollIntoView();
        }
      });
    },
    handleClose () {
      this.$root.$emit('chatDialogClose');
    },
    handleSendMessage () {
      if (!this.message) return this.$Message.error('发送内容不能为空');
      const messageInfo = {
        message: this.message,
        roleName: `民警：${this.userName}` || '民警端',
        roleType: 1,
        time: Date.now()
      };
      this.expandMessageList(messageInfo);
      // 发信息给对方
      this.$socket.emit('sendMessage', JSON.stringify({
        roomId: this.currentRoomNo,
        manageId: this.organizeCode,
        messageInfo
      }));
      this.message = '';
    },
    checkMeetStatus (roomInfo) {
      checkMeetStatus(roomInfo.code).then(res => {
        if (res.data.state.code === 200) {
          if (roomInfo.messageType === 1) {
            this.$router.push({
              name: 'meetMonitor',
              params: {
                jkip: roomInfo.jkip,
                id: roomInfo.id
              }
            });
          } else {
            if (Number(res.data.data.status) === 0) {
              this.currentRoomNo = res.data.data.meetingRoom;
              this.title = roomInfo.roomName;
              const messageInfo = {
                message: roomInfo.message,
                roleName: `律师：${res.data.data.lawyerName}` || '律师端',
                roleType: 0,
                time: Date.now()
              };
              this.expandMessageList(messageInfo);
              this.showDialog();
            } else {
              this.$Message.error('该会见已结束');
            }
          }
          this.updateNoticeStatus(roomInfo.id, () => {
            this.getNoticeList();
          });
        } else {
          this.$Message.error('查询会见房间状态失败');
        }
      });
    },
    updateNoticeStatus (noticeId, cb) {
      updateNoticeStatus(noticeId).then(res => {
        if (res.data.state.code === 200) {
          cb && cb();
        }
      });
    },
    getNoticeList () {
      getNoticeList({
        organizeCode: this.organizeCode,
        messageType: ''
      }).then(res => {
        if (res.data.state.code === 200) {
          this.noticeList = res.data.data;
        } else {
          this.$Message.error('获取消息列表失败');
        }
      });
    },
    getDate (time) {
      return getDate(time, 'year');
    },
    handleNotificationShow () {
      this.notificationShow = !this.notificationShow;
    }
  },
  sockets: {
    sendToManage (res) {
      let curRoomNo = this.currentRoomNo.toString();
      let noticeRoomNo = (res.roomId && res.roomId.toString()) || '';
      if (this.dialogShow && curRoomNo === noticeRoomNo) {
        this.expandMessageList(res.messageInfo);
        this.updateNoticeStatus(res.messageInfo.noticeId);
      } else {
        this.getNoticeList();
      }
    }
  },
  mounted () {
    this.$socket.emit('connection', '1');
    this.$socket.emit('manageJoin', this.organizeCode);

    this.$root.$on('showChatDialog', roomInfo => {
      this.title = roomInfo.title;
      this.currentRoomNo = roomInfo.roomNo;
      this.showDialog();
    });

    this.getNoticeList();
  }
};
</script>
<style lang="less" scoped>
.slide-enter-active {
  transition: all .3s ease;
}

.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, .5, .8, 1.0);
}

.slide-enter, .slide-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.normal-dialog /deep/ .ivu-modal-wrap /deep/ .ivu-modal-content {
  // background: #fff;
  background-clip: padding-box;
  border-radius: 6px;
  border: 1px solid #03407E;
}

.normal-dialog /deep/ .ivu-modal-content /deep/ .ivu-modal-body {
  padding: 0 !important;
}

.title {
  position: relative;
  font: bold 20px/22px Adobe Heiti Std R;
  color: #35FFFA;
}

.ivu-icon-ios-remove,
.ivu-icon-ios-square-outline {
  z-index: 3;
  position: absolute;
  right: 25px;
  top: -5px;
  color: #fff;
  cursor: pointer;
}

.ivu-icon-ios-square-outline {
  right: 30px;
  top: 2px;
}

.mini-dialog /deep/ .ivu-modal-header {
  border-radius: 6px;
  border: 1px solid #03407E;
}

.mini-dialog /deep/ .ivu-modal-wrap /deep/ .ivu-modal-content {
  // background: #fff;
  background-clip: padding-box;
  border-radius: 6px;
}

.mini-dialog /deep/ .ivu-modal-content /deep/ .ivu-modal-body {
  padding: 0 !important;
}

.mini-dialog /deep/ .ivu-modal {
  position: fixed;
  left: 0;
  top: auto;
  bottom: 0;
}

.chat-content {
  margin-bottom: 10px;
  padding: 30px;
  height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  li {
    margin-bottom: 20px;
    cursor: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .message {
      margin-top: 10px;
      padding: 15px;
      background: #ccc;
      border-radius: 6px;
      background: rgba(42, 66, 115, 0);
      border: 1px solid #46C5E9;
      border-radius: 0px 8px 8px 8px;
    }
  }

  .right {
    justify-content: flex-end;
    align-items: flex-end;

    .message {
      border: 1px solid #1273DA;
      border-radius: 8px 0px 8px 8px;
    }
  }
}

.no-message {
  margin-top: 30px;
  height: 500px;
  text-align: center;
}

.chat-footer {
  position: relative;
  width: 100%;
  height: 150px;
  background-image: url('../../assets/images/common/stasticBdBox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .post-btn {
    position: absolute;
    right: 28px;
    bottom: 15px;

    display: inline-block;
    width: 120px;
    height: 50px;
    background-image: url("../../assets/images/common/searchButton.png");
    background-size: cover;
    background-repeat: no-repeat;

    font-size: 20px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
}

@deep: ~'>>>';
.chat-footer @{deep} .ivu-input {
  width: 100% !important;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff !important;
  background-color: #fff;
  background-image: none;
  box-shadow: none;
}

.notification {
  z-index: 4;
  position: fixed;
  bottom: 50px;
  right: 10px;

  .notification-icon-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .notification-icon {
      cursor: pointer;
    }

    .length-tips {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      color: white;
      text-align: center;
      line-height: 20px;
      font-size: 18px;
    }
  }

  .notification-list {
    width: 400px;
    max-height: 520px;
    overflow-y: auto;

    list-style: none;
    color: #fff;
  }

  .notice {
    margin-bottom: 10px;
    width: 100%;

    border: 1px solid #03407E;

    background-image: url('../../assets/images/common/background.png');
    background-repeat: no-repeat;
    background-position: center center;

    .header {
      padding: 0 30px;
      width: 100%;
      height: 50px;
      border-bottom: 2px solid #006FE9;

      line-height: 50px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #FFB853;
    }

    .center {
      padding: 20px 30px;
      width: 100%;

      .content {
        margin-bottom: 15px;

        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }

      .check-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .notice-time {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>

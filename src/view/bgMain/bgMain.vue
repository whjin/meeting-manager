<template>
  <div class="bgMain">
    <div class="header-con">
      <img src="../../assets/images/common/bigTitle.png">
      <div class="bottom-con">
        <router-link to="/meetRegister">会见审核</router-link>
        <router-link to="/roomManage">房间管理</router-link>
        <router-link to="/meetMonitor">会见监控</router-link>
        <router-link to="/meetingNotes">历史会见</router-link>
        <router-link to="/statistics">统计分析</router-link>
        <router-link v-if="!isPoliceRole" to="/background">系统管理</router-link>
      </div>
      <div class="info">
        <div class="nowDate">
          <div>
            <span>{{time2}}</span>
            <span>{{time3}}</span>
          </div>
          <div>{{time1}}</div>
        </div>
        <user :user-avator="userAvator" />
      </div>
    </div>
    <router-view />
    <!-- 插话窗口 -->
    <chat-dialog></chat-dialog>
  </div>
</template>
<script>
import './main.less';
import User from '_c/main/components/user';
import chatDialog from '_c/chatDialog';
import { getNowDate } from '@/libs/tools';
export default {
  name: 'bgMain',
  components: {
    User,
    chatDialog
  },
  computed: {
    userAvator () {
      return this.$store.state.user.avatorImgPath;
    },
    isPoliceRole () {
      return this.$store.state.user.isPoliceRole;
    }
  },
  data () {
    return {
      time1: '',
      time2: '',
      time3: '',
      timer: ''
    };
  },
  beforeDestory () {
    clearInterval(this.timer);
  },
  mounted () {
    this.time = setInterval(() => {
      this.nowTime();
    }, 1000);
  },
  methods: {
    nowTime () {
      this.time1 = getNowDate().year + '-' + getNowDate().month + '-' + getNowDate().day;
      if (getNowDate().date === 0) {
        this.time2 = '星期日';
      } else {
        this.time2 = '星期' + getNowDate().date;
      }
      this.time3 = getNowDate().hour + ':' + getNowDate().minutes + ':' + getNowDate().second;
    }
  }
};
</script>

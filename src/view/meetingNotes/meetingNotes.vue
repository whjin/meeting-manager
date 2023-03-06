<template>
  <i-layout class="main-content-con">
    <i-layout>
      <i-content class="main-content-con">
        <i-layout class="main-layout-con">
          <i-content class="content-wrapper">
            <i-tabs @on-click="changeTabs">
              <i-tab-pane label="律师会见" name="lawyer" style="position:relative;">
                <lawyer-meetingNotes v-if="meetingRole==='lawyer'"></lawyer-meetingNotes>
              </i-tab-pane>
              <i-tab-pane label="家属会见" name="family" style="position:relative;">
                <family-meetingNotes v-if="meetingRole==='family'"></family-meetingNotes>
              </i-tab-pane>
            </i-tabs>
          </i-content>
        </i-layout>
      </i-content>
    </i-layout>
  </i-layout>
</template>

<script>
import lawyerMeetingNotes from "./lawyerMeetingNotes";
import familyMeetingNotes from "./familyMeetingNotes";

export default {
  name: 'meetingNotes',
  components: {
    lawyerMeetingNotes,
    familyMeetingNotes,
  },
  data () {
    return {
      // 会见类型
      meetingRole: "lawyer",
    };
  },
  computed: {},
  methods: {
    // 切换会见类型
    changeTabs (name) {
      this.meetingRole = name;
    },
  },
};
</script>

<style lang="less" scoped>
</style>

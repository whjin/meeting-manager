import axios from '@/libs/api.request';

export const getNoticeList = (data) => {
  return axios.request({
    url: '/sysmgr/meetTalk/findMessageByOrganizeCode',
    method: 'post',
    data
  });
};

export const updateNoticeStatus = (noticeId) => {
  return axios.request({
    url: '/sysmgr/meetTalk/updateStatus',
    method: 'post',
    data: {
      id: noticeId
    }
  });
};

export const checkMeetStatus = (code) => {
  return axios.request({
    url: '/sysmgr/meetTalk/findMeetingTime',
    method: 'post',
    data: {
      code
    }
  });
};

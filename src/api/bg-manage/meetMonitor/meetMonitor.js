import axios from '@/libs/api.request';

export const getMeetVideoMessage = () => {
  return axios.request({
    url: '/sysmgr/meetVideoMessage/all',
    method: 'get'
  });
};

export const getRoomStatus = () => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/getRoomStatus',
    method: 'get'
  });
};

export const getRoomList = () => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/monitor',
    method: 'get'
  });
};

export const getMonitorSrc = (jkip, id) => {
  return axios.request({
    url: '/sysmgr/ffmpeg/start',
    method: 'post',
    data: {
      jkip,
      id
    }
  });
};

export const stopMonitor = (jkip, id) => {
  return axios.request({
    url: '/sysmgr/ffmpeg/stop',
    method: 'post',
    data: {
      jkip,
      id
    }
  });
};

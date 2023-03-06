import axios from '@/libs/api.request';

export const getAppointTrendData = (data) => {
  return axios.request({
    url: '/sysmgr/odsYyLshj/getAppointmentTrendData',
    data: data,
    method: 'post'
  });
};

export const getMeetStatisticsData = () => {
  return axios.request({
    url: '/sysmgr/odsYyLshj/getMeetStatisticsData',
    method: 'post'
  });
};

export const getAppointmentStatistics = () => {
  return axios.request({
    url: '/sysmgr/odsYyLshj/getAppointmentStatistics',
    method: 'post'
  });
};

export const getLawyerRoomDetail = (data) => {
  return axios.request({
    url: '/sysmgr/meetInformation/getRoomDetail',
    data: data,
    method: 'post'
  });
};

import axios from '@/libs/api.request';

export const findLogByCon = (searchCon) => {
  return axios.request({
    url: '/sysmgr/sysLog/findLogByCon',
    data: searchCon,
    method: 'post'
  });
};

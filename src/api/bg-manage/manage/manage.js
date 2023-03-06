import axios from '@/libs/api.request';

export const searchByCon = (params) => {
  return axios.request({
    url: '/sysmgr/meetInformation/findByCon',
    data: params,
    method: 'post'
  });
};
export const getAuditDetailById = (id) => {
  return axios.request({
    url: '/sysmgr/meetInformation/getMeetDetailById',
    params: {
      id: id
    },
    method: 'get'
  });
};
export const getCurUserInfo = () => {
  return axios.request({
    url: '/sysmgr/sysUser/info',
    method: 'post'
  });
};

export const listRoomByType = (type) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/listByType',
    params: {
      type: type
    },
    method: 'get'
  });
};

export const submitAuditModel = (params) => {
  return axios.request({
    url: '/sysmgr/meetInformation/approval',
    data: params,
    method: 'post'
  });
};

export const uploadImage = (formData) => {
  return axios.request({
    url: '/sysmgr/meetInformation/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post'
  });
};
export const listRoom = (params) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/searchRoomInfo',
    data: params,
    method: 'post'
  });
};
// 查询律师|家属历史会见信息
export const listMeetingsRoom = (params) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/searchMeetingsInfo',
    data: params,
    method: 'post'
  });
};


export const updateRoomStatus = (params) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/updateRoomStatus',
    data: params,
    method: 'post'
  });
};

export const searchRybhName = (model, value, typeCode = '', pageParam = '') => {
  return axios.request({
    url: '/sysmgr/meetInformation/searchRybhName',
    data: {
      data: {
        model,
        typeCode,
        value
      },
      pageParam
    },
    method: 'post'
  });
};

export const searchBoxDataUrl = (model, value, typeCode = '', pageParam = '') => {
  return axios.request({
    url: '/sysmgr/sysDictionaryField/selectionBoxData',
    data: {
      data: {
        model,
        typeCode,
        value
      },
      pageParam
    },
    method: 'post'
  });
};
export const getByTypeCodeAndFieldValue = (typeCode, fieldValue) => {
  return axios.request({
    url: '/sysmgr/sysDictionaryField/getByTypeCodeAndFieldValue',
    params: {
      typeCode: typeCode,
      fieldValue: fieldValue
    },
    method: 'get'
  });
};
export const getRoomStatus = (typeCode, fieldValue) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/getRoomUsedStatus',
    method: 'get'
  });
};

export const uploadTranscriptTemplate = (formData) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/uploadTranscriptTemp',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post'
  });
};

export const updateTranscriptTemplate = (formData) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/updateTranscriptTemp',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post'
  });
};

export const validateLawyerRule = (params) => {
  return axios.request({
    url: '/sysmgr/meetInformation/validateLawyerRule',
    data: params,
    method: 'post'
  });
};

export const getPopulationBankInfo = (idCard) => {
  return axios.request({
    url: '/sysmgr/meetInformation/getPopulationBankInfo',
    data: { idCard: idCard },
    method: 'post'
  });
};

export const getFugitiveInfo = (idCard) => {
  return axios.request({
    url: '/sysmgr/meetInformation/getFugitiveInfo',
    data: { idCard: idCard },
    method: 'post'
  });
};

export const getLawyerInfo = (rybh, config) => {
  return axios.request({
    url: '/sysmgr/meetInformation/queryLawyerInfo',
    data: {
      config: config,
      rybh: rybh
    },
    method: 'post'
  });
};

export const deleteTranscriptTemplate = (id, fid) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/deleteTranscriptTemp',
    data: {
      id: id,
      fileId: fid
    },
    method: 'post'
  });
};

export const uploadDefaultTemplate = (formData) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/uploadDefaultTemplate',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post'
  });
};

export const searchDefaultTemp = (params) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/searchDefaultTempName',
    data: params,
    method: 'post'
  });
};

export const searchCustomTemp = (id) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/getTranscriptTemp',
    data: {
      id: id
    },
    method: 'post'
  });
};

export const deleteDefaultTemplate = (roomId) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/deleteDefaultTemplate',
    data: { fileId: roomId },
    method: 'post'
  });
};

export const orderDefaultTemp = (action, tempId) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/orderDefaultTemp',
    params: {
      action: action,
      tempId: tempId
    },
    method: 'post'
  });
};

export const save = (data) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/save',
    data: data,
    method: 'post'
  });
};

export const findOrganizeByType = (type) => {
  return axios.request({
    url: '/sysmgr/sysOrganize/findByType?type=' + type,
    method: 'get'
  });
};

export const roomDelete = (id) => {
  return axios.request({
    url: '/sysmgr/meetRoomInfo/delete/' + id,
    method: 'post'
  });
};

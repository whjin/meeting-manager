import axios from '@/libs/api.request';

export const loadTreeData = (node, callback) => {
  axios.request({
    url: '/sysmgr/tree/loadData',
    data: node,
    method: 'post'
  }).then(res => {
    if (res && res.data.state.code === 200) {
      const children = res.data.data;
      if (children.length) {
        node.children = children;

        if (callback) callback(node.children);
      }
    }
  });
};

export const filterNode = (node) => {
  return axios.request({
    url: '/sysmgr/tree/query',
    data: node,
    method: 'post'
  });
};

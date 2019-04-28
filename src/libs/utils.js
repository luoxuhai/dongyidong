import store from '../store';
export const request = (
  method,
  url,
  data,
  header = {
    'content-type': 'application/x-www-form-urlencoded',
    token: store.state.token,
  },
) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success: res => {
        if (res.statusCode === 200) resolve(res.data);
        else reject(res.data);
      },
      fail: err => {
        reject(err);
      },
    });
  });
};

export const wx_login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res);
      },
    });
  });
};

export const networkError = () => {
  wx.showModal({
    title: '提示',
    content: '网络连接错误',
    showCancel: false,
    confirmText: '返回',
    success: res => {
      if (res.confirm) {
        wx.navigateBack({
          delta: 1,
        });
      }
    },
  });
};

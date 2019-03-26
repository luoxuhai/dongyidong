export const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200) resolve(res.data);
        else reject(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

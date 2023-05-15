const app = getApp();
const baseURL = app.globalData.baseURL;
const header = {
  'content-type': "application/json"
}

export function request(options: any) {
  if (options.loading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
 
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseURL}${options.url}` || ``,
      data: options.data || {},
      method: options.method || 'POST',
      header,
      responseType: options.responseType || "",
      timeout:15000,
      success (res: any) {
        if (options.loading) {
          wx.hideLoading()
        }
        //根据自己的接口返回值进行判断
        if (res.data.code != 20000) {
          // 重新登陆
          return false;
        }
        //把请求到的数据发到引用请求的地方
        resolve(res.data);
      },
      fail (res: any) {
        if (options.loading) {
          wx.hideLoading()
        }
        wx.showToast({
          title: "网络连接超时",
          icon: 'none',
          duration: 3000,
        })
        reject(res);
      }
    })
  })
};
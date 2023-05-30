const { HOST } = require('./constant')
const header = {
  'content-type': "application/json",
  t: wx.getStorageSync('token')
}
console.log(wx.getStorageSync('token'), '2----')

export async function request(options: any) {
  if (options.loading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
 
  return await new Promise((resolve, reject) => {
    wx.request({
      url: `${HOST}${options.url}` || ``,
      data: options.data || {},
      method: options.method || 'POST',
      header,
      responseType: options.responseType || "",
      timeout: 20000,
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
          icon: 'error',
          duration: 3000,
        })
        reject(res);
      }
    })
  })
};
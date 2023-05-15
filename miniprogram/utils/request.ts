const app = getApp();
const baseURL = app.globalData.baseURL;

const Request = (options: any) =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url || '',
      data: options.data || {},
      method: options.method || 'POST',
      header:{'content-type': "application/x-www-form-urlencoded"},
      responseType:options.responseType || "",
      timeout:15000,
      success (res: any) {
        if(res.statusCode === 200){
          if(res.data.status === "y"){
            resolve(res.data);
          }else{
          };
        }else{
        };
      },
      fail (res) {
        reject(res);
      }
    })
  })
};

module.exports = {
  Request
};

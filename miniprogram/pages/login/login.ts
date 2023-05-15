// login.ts
const wxRequest = require('../../utils/request')
console.log(wxRequest)
Page({
  data: {
    
  },
  // 事件处理函数
  handleLogin() {
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://tools-test-03/user/v1/login',
            method: 'POST',
            data: {
              token: res.code
            },
            success(res: any) {
              const {data} = res
              if(data.success) {
                wx.switchTab({
                  url: '/pages/chat/chat',
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
})

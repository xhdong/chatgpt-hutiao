// app.ts
const { HOST } = require('utils/constant')

App({
  globalData: {
    isAuthSetting: false,
    version: '1.0',
    appName: '虎跳智能聊天机器人',
    userInfo: {},
    token: ''
  },
  onLaunch() {
    this.getSetting()
  },

  // 获取用户信息
  getSetting(cb?: any) {
    const that = this
    if (!this.globalData.isAuthSetting) {
      typeof cb == "function" && cb(this.globalData.isAuthSetting)
    } else {
      wx.getSetting({
        withSubscriptions: true,
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success (resInfo) {
                const {signature, rawData, encryptedData, iv} = resInfo
                wx.setStorageSync('signature', signature)
                wx.setStorageSync('rawData', rawData)
                wx.setStorageSync('encryptedData', encryptedData)
                wx.setStorageSync('iv', iv)
                wx.setStorageSync('userInfo', rawData)
                wx.switchTab({
                  url: '/pages/chat/chat'
                })
              },
              fail: () => {
                that.globalData.isAuthSetting = true
                typeof cb == "function" && cb(that.globalData.isAuthSetting)
              }
            })
          } else {
            that.globalData.isAuthSetting = true
            typeof cb == "function" && cb(that.globalData.isAuthSetting)
          }
        },
        fail() {
          that.globalData.isAuthSetting = true
          typeof cb == "function" && cb(that.globalData.isAuthSetting)
        }
      })
    }
  },

  // 登录
  login() {
    const that = this
    return new Promise(function(resolve, reject) {
      wx.login({
        success(res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: `${HOST}user/v1/login`, //This value for demonstration purposes only is not a real API URL.
              data: {
                token: res.code
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // Default value
              },
              success (res: any) {
                const { token } = res.data.data || ''
                wx.setStorageSync('token', token)
                //获取用户信息成功
                that.globalData.token = res.data;
                resolve(res.data);
              }
            })
          }
        },
        fail: err => {
          console.log(err);
          reject(err);
        }
      })
    })
  },
})
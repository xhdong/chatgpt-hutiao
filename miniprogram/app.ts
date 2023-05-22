// app.ts
const { login } = require('api/login')

App({
  globalData: {
    isAuthSetting: false,
    version: '1.0',
    appName: '虎跳智能聊天机器人',
    userInfo: {}
  },
  onLaunch() {
    this.login()
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
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success (resInfo) {
                console.log(resInfo)
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
    wx.login({
      async success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          try {
            const { token } = (await login({token: res.code})).data || {}
            wx.setStorageSync('token', token)
          } catch (error) {
            console.log(error)
          }
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})
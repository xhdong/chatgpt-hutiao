// app.ts
const { login } = require('api/login')

App({
  globalData: {
    version: '1.0',
    appName: '虎跳智能聊天机器人',
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.auth()
    this.login()
  },

  // 授权
  auth() {
    const that = this
    wx.getSetting({
      async success(res) {
        console.log("授权：" + res.authSetting['scope.userInfo']);
        try {
          const params = {}
          // const data = (await auth(params)).data || {}
          // console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    })
  },

  // 登录
  login() {
    wx.login({
      async success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          try {
            const { token } = (await login({token: res.code})).data || {}
            console.log(token)
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
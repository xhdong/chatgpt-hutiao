// login.ts
// const { login } = require('../../api/login')
Page({
  data: {
  },
  // 事件处理函数
  handleLogin() {
    wx.login({
      async success (res: any) {
        if (res.code) {
          try {
            const params = {
              token: res.code
            }
            const { token } = (await login(params)).data || {}
            if(token && token !== '') {
              wx.switchTab({
                url: '/pages/chat/chat',
              })
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
})

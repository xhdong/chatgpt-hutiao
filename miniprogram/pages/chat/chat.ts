// chat.ts

Page({
  data: {
    apiurl: '只需要配置此处url',
    apisucc: !1,
    apibut: '需要先进行API配置才能使用',
    sentext: '先配置api',
    apiadj: '在此输入你的APIKEY',
    api: '',
    msgLoading: !0,
    anData: {},
    animationData: {},
    showTow: !1,
    // 聊天记录
    msgList: [
      {
        my: !1,
        msg: '你好呀，想问什么就问吧'
      },{
        my: !0,
        msg: '你是机器人吗'
      }
    ] as any,
    inputValue: '',  // 输入框的值
    scrollIntoView: '',  // 滚动到指定位置
    socketOpen: false,  // WebSocket连接状态
    socketMsgQueue: [] as any,  // WebSocket消息队列
    url: 'wss://example.com/ws'  // WebSocket服务器地址
  },
  onInputValue(e: any){
    const name = e.detail.value;
    this.setData({
      inputValue: name
    })
  },
  handleSend() {
    let regex = /^\s*$/g;
    if (regex.test(this.data.inputValue)) {
      return false
    }
    this.setData({
      msgLoading: true
    })
    const msg = this.data.inputValue
    const content = {
      my: !0,
      msg
    }
    this.data.msgList.push(content)
    this.setData({
      msgList: this.data.msgList,
      inputValue: '',
      msgLoading: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.connectWebSocket()  // 连接WebSocket服务器
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket()  // 关闭WebSocket连接
  },
  /**
   * 连接WebSocket服务器
   */
  connectWebSocket: function () {
    const that = this
    wx.connectSocket({
      url: that.data.url,
      success: function (res) {
        console.log('WebSocket连接成功')
      },
      fail: function (res) {
        console.log('WebSocket连接失败:', res)
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开')
      that.setData({
        socketOpen: true
      })
      for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
        that.sendSocketMessage(that.data.socketMsgQueue[i])
      }
      that.setData({
        socketMsgQueue: []
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败:', res)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭:', res)
      that.setData({
        socketOpen: false
      })
    })
    wx.onSocketMessage(function (res: any) {
      console.log('接收到服务器发送的数据:', res.data)
      var messages = that.data.msgList
      messages.push(res.data)
      that.setData({
        messages: messages,
        scrollIntoView: 'message-' + messages.length
      })
    })
  },
  /**
   * 发送消息
   */
  sendMessage: function () {
    if (!this.data.socketOpen) {
      wx.showToast({
        title: 'WebSocket未连接',
        icon: 'none'
      })
      return
    }
    const message: any = this.data.inputValue
    if (message == '') {
      wx.showToast({
        title: '消息不能为空',
        icon: 'none'
      })
      return
    }
    this.sendSocketMessage(message)
    this.setData({
      inputValue: ''
    })
  },
  /**
   * 发送WebSocket消息
   */
  sendSocketMessage: function (message: any) {
    if (this.data.socketOpen) {
      wx.sendSocketMessage({
        data: message
      })
    } else {
      this.data.socketMsgQueue.push(message)
    }
  },
  /**
   * 监听输入框变化
   */
  onInput: function (e: any) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})
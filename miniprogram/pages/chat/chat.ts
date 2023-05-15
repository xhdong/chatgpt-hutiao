// chat.ts

Page({
  data: {
    apiUrl: 'https://tools-test-03/chat/v1/completions',
    msgLoading: !0,
    // 聊天记录
    msgList: [
      {
        role: 'assistant',
        content: '你好呀，想问什么就问吧'
      }
    ] as any,
    inputValue: '',  // 输入框的值
    scrollIntoView: '',  // 滚动到指定位置
    socketOpen: false,  // WebSocket连接状态
    socketMsgQueue: [] as any,  // WebSocket消息队列
    wsUrl: 'wss://example.com/ws'  // WebSocket服务器地址
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
    const that = this
    const question = this.data.inputValue
    const userMsg = {
      role: 'user',
      content: question
    }
    that.data.msgList.push(userMsg)
    that.setData({
      msgList: that.data.msgList,
      inputValue: '',
      msgLoading: false
    })
    wx.request({
      url: this.data.apiUrl,
      method: 'POST',
      data: {
        question
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res: any) {
        const { choices } = res.data.data
        const { message } = choices[0]
        that.data.msgList.push(message)
        that.setData({
          msgList: that.data.msgList,
          inputValue: '',
          msgLoading: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
})
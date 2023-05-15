// chat.ts
const { completions } = require('../../api/chat')

Page({
  data: {
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
    const question = this.data.inputValue
    if (regex.test(question)) {
      return false
    }
    this.sendUserMsg(question)
    this.receiveAssistantMsg(question)
  },

  // 发送用户消息
  sendUserMsg(question: string) {
    this.setData({
      msgLoading: true
    })
    const userMsg = {
      role: 'user',
      content: question
    }
    this.data.msgList.push(userMsg)
    this.setData({
      msgList: this.data.msgList,
      inputValue: '',
      msgLoading: false
    })
  },

  // 接收机器人消息
  async receiveAssistantMsg(question: string) {
    try {
      const params = {
        question
      }
      const res = (await completions(params)).data || {}
      const { choices } = res
      const { message } = choices[0]
      this.data.msgList.push(message)
      this.setData({
        msgList: this.data.msgList,
        inputValue: '',
        msgLoading: false
      })
    } catch (error) {
      console.log(error)
    }
  },
})
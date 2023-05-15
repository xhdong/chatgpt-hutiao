// chat.ts
const { completions } = require('../../api/chat')

Page({
  data: {
    loading: !0,
    inputValue: '',  // 输入框的值
    // 聊天记录
    msgList: [
      {
        role: 'assistant',
        content: '你好呀，想问什么就问吧'
      }
    ] as any,
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
      loading: true
    })
    const userMsg = {
      role: 'user',
      content: question
    }
    this.data.msgList.push(userMsg)
    this.setData({
      msgList: this.data.msgList,
      inputValue: '',
      loading: false
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
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  },
})
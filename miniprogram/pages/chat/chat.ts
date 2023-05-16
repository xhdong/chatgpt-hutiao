// chat.ts
const { completions } = require('../../api/chat')

Page({
  data: {
    loading: false,
    inputValue: '',  // 输入框的值
    // 聊天记录
    msgList: [
      {
        loading: false,
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
    const userMsg = {
      role: 'user',
      loading: false,
      content: question
    }
    this.data.msgList.push(userMsg)
    this.setData({
      msgList: this.data.msgList,
    })
  },

  // 接收机器人消息
  async receiveAssistantMsg(question: string) {
    try {
      const params = {
        question
      }
      let aiMsg = {
        loading: true,
        role: 'assistant',
        content: ''
      }
      this.data.msgList.push(aiMsg)
      this.setData({
        msgList: this.data.msgList,
      })
      const res = (await completions(params)).data || {}
      const { choices } = res
      const { message } = choices[0]
      const latestIndex = this.data.msgList.length - 1
      this.data.msgList[latestIndex].loading = false
      this.data.msgList[latestIndex].content = message.content
      this.setData({
        msgList: this.data.msgList,
        inputValue: '',
        loading: false
      })
    } catch (error) {
      console.log(error)
      this.setData({
        loading: false
      })
    }
  },
})
// chat.ts
const appChat = getApp()
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
        content: '你好呀，想问什么就问吧',
        showOperate: false,
      }
    ] as any,
    scrollTop: 0
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
        content: '',
        showOperate: true
      }
      this.data.msgList.push(aiMsg)
      this.setData({
        msgList: this.data.msgList,
        loading: true,
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
      this.calcScrollTop()
    } catch (error) {
      console.log(error)
      this.setData({
        loading: false
      })
    }
  },

  // 复制
  handleCopy(e: any) {
    const { title } = e.currentTarget.dataset
    //复制文本
    wx.setClipboardData({
      data: title,
      success() {
        wx.showToast({
          title: '复制成功~',
          icon: "success",
          mask: true //是否设置点击蒙版，防止点击穿透
        })
      }
    })
  },

  //计算 scrollTop，使页面滚动到底部
  calcScrollTop() {
    let that = this;
    let height
    const top = this.data.scrollTop
    let query = wx.createSelectorQuery().in(this)
    query.select('.msg-list').boundingClientRect(function (rect) {
      height = rect.height
      wx.pageScrollTo({
        scrollTop: height - top,
        duration: 100 // 滑动速度
      })
      that.setData({
        scrollTop: height - top
      });
    }).exec();
  },
  onLoad() {
    let token = wx.getStorageSync("token");
    if (!token || token == '') {
      appChat.login()
    }
  }
})
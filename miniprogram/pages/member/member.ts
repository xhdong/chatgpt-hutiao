// member.ts
Page({
  data: {
    userInfo: {},
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    vipList: [
      {
        name: '一个月VIP',
        price: 49,
        oldPrice: 69,
        desc: '新人抢先体验',
        label: '新人特惠',
      },
      {
        name: '三个月VIP',
        price: 89,
        oldPrice: 128,
        desc: '新人推荐特惠',
        label: '',
      },
      {
        name: '一年VIP',
        price: 169,
        oldPrice: 288,
        desc: '新人推荐特惠',
        label: '推荐套餐'
      }
    ],
    // 权益列表
    benefitsList: [
      {
        title: '高速接口',
        desc: '高速连接畅快对话',
        icon: 'icon-member'
      },
      {
        title: '超低延迟',
        desc: '超低延迟不会卡顿',
        icon: 'icon-speed'
      },
      {
        title: '解锁功能',
        desc: '开放所有功能使用',
        icon: 'icon-chat'
      },
      {
        title: '专业客服',
        desc: '专业技术团队服务',
        icon: 'icon-cs'
      }
    ],
    currentIndex: 0,
  },
  handleRecharge(e: any) {
    console.log(e)
    //1. 调用wx.login方法,获取code码
    wx.login({
      success : async (res)=>{
        //2. 获取code码
        const code = res.code;
        //3. 调用获取openid的接口
        // const result = await payApi.getOpenId(code);
        const result = {
          data: {
            success: false,
            userinfo: {}
          }
        };
        //4. 判断 如果成功 则标openid及其他相关的信息保存到畚斗, 失败 则进行一个错误提示
        if(result.data.success){
          const userinfo = result.data.userinfo;
          wx.setStorageSync('userinfo', userinfo)
        }else{
          wx.showToast({
            title: '获取openId失败',
          })
        }
      },
      fail : ()=>{
        wx.showToast({
          title: '调用wx.login方法失败',
        })
      }
    })
  },
  handleChangeItem(e: any) {
    const { index } = e.currentTarget.dataset
    if (this.data.currentIndex === +index) {
      // 再点一下 取消选中
      this.setData({
        currentIndex: -1
      })
    } else {
      this.setData({
        currentIndex: +index
      })
    }
    console.log(this.data.currentIndex, index)
  }
})

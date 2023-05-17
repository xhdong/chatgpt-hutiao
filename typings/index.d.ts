/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    version: '1.0',
    appName: '虎跳智能聊天机器人',
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
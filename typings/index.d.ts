/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    baseURL: 'https://tools-test-03/',
    version: '1.0',
    appName: '虎跳智能聊天机器人',
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    baseURL: 'https://tools-test-03/',
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
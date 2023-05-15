/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    baseURL?: 'http://192.168.105.25:8080/',
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
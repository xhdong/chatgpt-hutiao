const { request } = require('../utils/request')
export function login(data: any) {
  const options = {
    url: `user/v1/login`,
    method: "POST",
    data,
    loading: true
  }
  return request(options);
}

export function auth(data: any) {
  const options = {
    url: `user/v1/oauth`,
    method: "POST",
    data,
    loading: true
  }
  return request(options);
}
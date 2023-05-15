const { request } = require('../utils/request')
export function completions(data: any) {
  const options = {
    url: "chat/v1/completions",
    method: "POST",
    data,
    loading: true
  }
  return request(options);
}
import axios from 'axios';

export function request(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    // baseURL: 'http://adi-v3.dev',
    timeout: 5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  }
  );

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 发送请求
  return instance(config);
}

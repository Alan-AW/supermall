// 首页网络请求

import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

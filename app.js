//引入封装好的request
import request from "./utils/request.js";
App({
  onLaunch: function () {
   //基准路径
    request.defaults.baseURL ="https://api-hmugo-web.itheima.net/api/public/v1"

  }
})
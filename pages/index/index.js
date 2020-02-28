// 引入request
import request from "../../utils/request.js"
Page({
 data:{
  //  轮播图数据
  banners:[],
 },
 onLoad(){
  //  请求轮播图接口
  request({
    url:'/home/swiperdata'
  }).then(res=>{
    // console.log(res)
    const {message}=res.data;
    // 赋值给banners
    this.setData({
      banners:message
    })
  })
 }
})

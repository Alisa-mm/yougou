// 引入request
import request from "../../utils/request.js"
Page({
 data:{
  //  轮播图数据
  banners:[],
  //菜单数据
  menu:[]
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
  }),
  //请求分类菜单
  request({
    url:'/home/catitems'
  }).then(res=>{
    // console.log(res)
    const{message}=res.data;
    // 循环添加跳转链接
    const newData = message.map((v,i)=>{
      if(i==0){
        v.url = "/pages/category/index"
      }
      return v;
    })
    this.setData({
      menu: newData
    })
  })
 }
})

// 引入request
import request from "../../utils/request.js"
Page({
 data:{
  //  轮播图数据
  banners:[],
  //菜单数据
  menu:[],
  // 楼层的数据
  floors: [],
  //是否显示回到顶部
  isShowTop: false
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
  }),
  //请求楼层数据
  request({
    url:'/home/floordata'
  }).then(res=>{
    const {message} = res.data;
    // 赋值给楼层
    this.setData({
      floors:message
    })
  })
 },

  onShow() {
    // 自定义tabBar的配置  要在每一个tabBar页面加上这个判断 selected选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
 //回到顶部事件
 handleToTop(){
   wx.pageScrollTo({
     scrollTop: 0,
     duration: 300
   })
 },
 //监听页面滚动事件(页面滑到下面再显示回到顶部)
  onPageScroll(e){
    // console.log(e)
    const {scrollTop} = e;
    // 当前的状态
    let isShow = this.data.isShowTop;
    // 大于100就显示回到顶部
    if(scrollTop>200){
      isShow=true
    } else {
      isShow = false
    }
    // 避免频繁的操作setData，所以如果下面两个值是相同就没必要再赋值了
    if(isShow===this.data.isShowTop) return;
    // 赋值
    this.setData({
      isShowTop: isShow
    })
  }  
})

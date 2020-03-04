import request from"../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的详情
    detail: {},
    //记录当前状态
    current:0,
    //图片预览数组
    picUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    request({
      url: '/goods/detail',
      data:{
        goods_id:options.id
      }
      }).then(res=>{
        console.log(res);
        const{message}=res.data;
        // 获取图片链接，给预览图片接口使用
        const picUrls = message.pics.map(v=>{
          return v.pics_big
        })
        // 赋值给detail
        this.setData({
          detail:message,
          picUrls
        })
    })
  },
  // 切换tab栏触发
  handleTab(e){
    const { index } = e.currentTarget.dataset;
    this.setData({
      current:index
    })
  },

  // 点击图片，实现图片的预览功能
  handlePreview(e){
    const { index } = e.currentTarget.dataset;
    wx.previewImage({
      current: this.data.picUrls[index], // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  },

  // 跳转到购物车页
  handleToCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  }
})
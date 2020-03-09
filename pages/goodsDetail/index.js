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
  },

  // 把商品添加到本地购物车列表
  handleAddCart() {
    // 每次加入购物车都要判断一下本地有没有数据，如果没有就等于一个空数组
    const goods =wx.getStorageSync("goods") || [];
    //判断一下当前的商品是否已经在goods里面 
    //有的话就数量+1 没有的话就unshif加入goods
    // some循环数组，return的结果“只要有一个是true就会返回true”，反之就false
    const exit = goods.some(v=>{
      // 通过id判断当前商品是否在goods数组中
      const isExit = v.goods_id === this.data.detail.goods_id;
      // 如果存在数量加1
      if(isExit){
        v.number += 1;
        wx.showToast({
          title: '数量+1',
          icon: 'success'
        })
      }
      return isExit
    });

    if(!exit){
      //把商品加入数组中
      goods.unshift({
        goods_id:this.data.detail.goods_id,
        goods_name: this.data.detail.goods_name,
        goods_price: this.data.detail.goods_price,
        goods_small_logo: this.data.detail.goods_small_logo,
        number: 1, //默认数量为1；
        select:true //默认是选中状态
      });
      wx.showToast({
        title: '加入购物车',
        icon: 'success'
      })
    }

    // 保存到本地
    wx.setStorageSync("goods", goods);
  }
})


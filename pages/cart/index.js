// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    //本地商品列表
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //把地址从本地拿出来
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
  },

  onShow(){
    // data和onload只会加载一次 所以需要在每次打开页面都获取一次本地的数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    })
  },

  // 获取收货地址
  GetAddress(){
    wx.chooseAddress({
      success:(res)=>{
        // 把收货地址保存到data
        this.setData({
          address:{
            //收货人
            name: res.userName,
            // 手机号码
            tel: res.telNumber,
            // 详细地址
            detail:res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        });

        // 把收货地址保存到本地
        wx.setStorageSync("address",this.data.address)
      }
    })
  }
})
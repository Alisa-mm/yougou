import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录当前点击了哪个菜单项
    current:0,
    //数据列表
    list:[]
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad(){
    //发送请求
    request({
      url: '/categories'
    }).then(res=>{
      console.log(res)
      const {message}=res.data;
      this.setData({
        list:message
      })
    })
  },

  onShow(){
    // 自定义tabBar的配置  要在每一个tabBar页面加上这个判断 selected选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
      }
  },

  // 点击切换左侧菜单栏时触发
  handeleClick(e){
    const { index } = e.currentTarget.dataset;
    //保存当前索引
    this.setData({
      current:index
    })
  }
})
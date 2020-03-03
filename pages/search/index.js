import request from"../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: "",
    // 上次输入框的值
    lastValue: "",
    //请求列表
    recommend:[],
    // 设置一个开关，必须等待上一次的请求返回
    loading: false,
    // 本地的存储历史记录
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储
    let arr = wx.getStorageSync("history");

    if(!Array.isArray(arr)){
      arr:[]
    }
    this.setData({
      history:arr
    })
  },
  //监听输入框变化
  handleInput(e){
    // console.log(e)
    const {value} = e.detail;
    //把输入的值赋值给inputValue
    this.setData({
      inputValue:value
    })
    if(!value){
      //如果输入框没有值就不发请求，并且清空recommend数组
      this.setData({
        recommend:[]
      });
      return
    };
    // 请求搜索建议
    this.getRecommend();
  },
  // 请求搜索建议
  getRecommend(){
    // 防抖(防止请求太多次)
    if(this.data.loading==false){
      // 开灯
      this.setData({
        loading:true,
        // 记录当前搜索的输入框的值
        lastValue: this.data.inputValue
      });
      //发请求
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.inputValue
        }
       }).then(res => {
        console.log(res)
        const { message } = res.data;
        // 赋值给recommend
        this.setData({
          recommend: message,
          loading:false //请求完就关灯
        })
      });

      //判断一下inputValue的值是否是最新 如果不是 就再次请求
      if(this.data.lastValue!==this.data.inputValue){
        this.getRecommend()
      } 
    }
  
  },
  // 按下回车键
  handleEnter(e){
    // 每次存储的时候，要把本地数据先拿出来
    let arr = wx.getStorageSync("history");

    //如果本地没有数据,或者arr不是一个数组
    if(!Array.isArray(arr)){
      arr=[]
    };
    //添加到数组前面
    arr.unshift(this.data.inputValue);

    // 数组去重
    arr=[...new Set(arr)]
    
    // 把搜索历史存起来
    wx.setStorageSync("history", arr)
    // 跳转到商品搜索列表页
    wx.redirectTo({
      url: "/pages/searchList/index?keyword=" + this.data.inputValue,
    })
  },
  //清除历史搜索
  handleClear(){
    this.setData({
      history:[],
    });
    // 清空本地的历史数据
    wx.setStorageSync('history', [])
  },
  // 失焦时触发
  handleBlur(){
    this.setData({
      recommend: []
    })
  }
})
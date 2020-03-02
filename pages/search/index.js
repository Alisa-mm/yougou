import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏
    tab:['综合','销量','价格'],
    //商品列表数据
    goodList:[],
    //关键字
    keyword:'',
    // 页码
    pagenum:1,
    //是否有更多数据（有的话就是加载中，没有的话就是到底）
    more:true,
    // 是否正在加载中
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 传过来的关键字
    const {keyword}=options;
    // 赋值给keyword
    this.setData({
      keyword
    }) ;
    this.getGoodList()
  },

  //封装获取商品的方法
  getGoodList(){
    // 如果没有更多了，就不再请求
    if (this.data.more == false) {
      return;
    }
    setTimeout(v=>{
      request({
        url: '/goods/search',
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: 10
        }
      }).then(res => {
        console.log(res);
        const { goods } = res.data.message;
        // 修改价格（保留两位小数）
        const products = goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v
        })
        // 赋值给data里面的商品列表
        this.setData({
          goodList: [...this.data.goodList, ...products],
          //当前请求完毕
          loading:false
        });
        //判断是否是最后一页
        if(this.data.goodList.length>=res.data.message.total){
          this.setData({
            more:false
          })
        }
      })
    },2000)
  },
  //页面下拉触底事件
  onReachBottom(){
    // 上一次请求回来之后，再加载下一页数据
    if (this.data.loading === false){
      this.setData({
        // 每次请求的时候 要重置loading为true
        loading:true,
        pagenum: this.data.pagenum + 1
      });
    }
   
    this.getGoodList()
  }
})
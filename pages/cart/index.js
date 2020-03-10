// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    //本地商品列表
    goods:[],
    // 总价格
    allPrice:0,
    // 全选
    allSelect: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //把地址从本地拿出来
    this.setData({
      address: wx.getStorageSync("address") || {}
    });
   
  },

  onShow(){
    // data和onload只会加载一次 所以需要在每次打开页面都获取一次本地的数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });
    // 计算总价格
    this.handeleAllPrice();
    // 判断全选的状态
    this.handleSelectAll();

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
  },

  // 计算总价格
  handeleAllPrice(){
    let price=0;
    //遍历goods数组中的每一项商品价格
    this.data.goods.forEach(v=>{
      // 如果商品是选中状态 才计算价格
      if(v.select){
        price += v.goods_price * v.number;
      }
      
    });
    
    //修改总价格
    this.setData({
      allPrice:price
    });
    // 修改本地的数据, 每一次购物车商品数量的变化 或者全选不全选，都会计算总价格，所以要在这里保存goods 这样的话，不管怎么操作 本地都会变化，刷新的时候就是正确的
    wx.setStorageSync("goods", this.data.goods)
  },

   // 点击加号商品数量加1，点击减号商品数量减1
  handleCalc(e){
    // index是点击的索引值, number可能是1，也可能是-1
    const { index, number } = e.currentTarget.dataset;
    // console.log(index);
    // console.log(number)
    //点击的时候给当前商品加1或者减1,
    // this.data.goods[index].number += number;

    // 上面的计算，商品会加减 但是页面不会刷新需要重新修改goods的值
    // this.setData({
    //   goods: this.data.goods
    // });
    this.data.goods[index].number += number;
    // console.log(this.data.goods[index].number);
    if (this.data.goods[index].number>0){
    // 这个数量应该计算之后，再进行if判断，如果判断之后再计算的话，当this.data.goods[index].number=1时，加上number(-1)，就会变为0，这时候要再减一次才会进入elseif判断，而且如果再点加号的话，就加不上
      // this.data.goods[index].number += number;
      console.log(this.data.goods[index].number)
      // 上面的计算，商品会加减 但是页面不会刷新需要重新修改goods的值
      this.setData({
        goods: this.data.goods
      });

     } else if (this.data.goods[index].number===0){
      //如果进入到elseif判断里面,这个时候number为0，点击取消之后，又会执行if上面的this.data.goods[index].number += number;这个代码，这时候number就等于-1了，这个时候，如果点击购物车内别的商品加减 ，上面的商品数量也会变化，所以执行这个的时候要加上1，就不会有这样的错误
      this.data.goods[index].number=this.data.goods[index].number + 1
        wx.showModal({
          title: '提示',
          content: '是否删除商品',
          success:(res)=> {
            if (res.confirm) {
              //用户点击确定
              this.data.goods.splice(index, 1);
              // 计算总价格
              this.handeleAllPrice()
            
                this.setData({
                  goods: this.data.goods
                });
            }
          }
        });
        
    };
    // 计算总价格
    this.handeleAllPrice()
  },

  //输入框失去焦点时触发
  handleBlur(e){
    // 如果用户输入负数的话,用户失焦的时候，让值变为原来的值
    console.log(e)
    // 先获取原来的的input输入框的值
    const {index}=e.currentTarget.dataset

    let{value}=e.detail;
    value = Math.floor(Number(value))
    if(value<1){
      console.log(value)
      // 如果小于1 就让它等1
       value=1
    }
    //修改商品数量
    this.data.goods[index].number=value;
    // 重新修改data的goods的值
    this.setData({
      goods: this.data.goods
    });
    // 计算总价格
    this.handeleAllPrice();
  },
  // 点击选中的图标
  handleSelect(e){
    // 当前选中商品的索引
    console.log(e)
    const{index}=e.currentTarget.dataset;
    //当前商品的选中状态
    const{select}=this.data.goods[index];
    // 取反修改当前商品的选中状态
    this.data.goods[index].select=!select
    // 重新修改data中goods的值
    this.setData({
      goods:this.data.goods
    })
    // 计算总价格
    this.handeleAllPrice();
    // 判断全选状态
    this.handleSelectAll()
  },

  // 判断全选状态，封装为一个方法 方便调用
  handleSelectAll(){
    // 先假设所有的商品都是选中状态
    let currentSelect = true;
    // 遍历商品列表goods，只要有一项没有选中，全选就是灰色
    this.data.goods.forEach(v=>{
      // 如果有一项为false 就不用再判断了
      if(currentSelect===false){
        return;
      }
      // console.log(v.select)
      if(v.select===false){
        // 把全选的状态改为false
        // let currentSelect =false
        // 不能写let 如果写let 它只在当前作用域里面起作用 所以currentSelect是一直为true的
        currentSelect = false
      }
    })
    // 保存全选状态
    this.setData({
      allSelect: currentSelect
    });
  },

  // 点击全选按钮的处理
  handleAllselect(){
    const{allSelect}=this.data;
    // 循环给每个商品修改状态
    this.data.goods.forEach(v=>{
      v.select=!allSelect
    });
    // 修改data的值
    this.setData({
      goods:this.data.goods,
      // 保存全选状态
      allSelect: !allSelect
    });
    // 计算总价格
    this.handeleAllPrice()
  }
})
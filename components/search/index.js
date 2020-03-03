// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 把关键字传过去
    keyword:{
      type:String,
      value:"搜索"
    },
    align:{
      type:String,
      value:"center"
    }
  },
  // 设置外部拓展样式
  // background样式（传给搜索列表的）align输入框的文字居中还是左对齐 还是右对齐
  externalClasses: ['background', "align"],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

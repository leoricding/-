// pages/lessionDetail/lessionDetail.js
const app = getApp();
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    listData:{},
    index:null,
    tabNavName:['详情',"目录","相关课程"]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  onLoad:function(option){
    //获取路由中的query属性
    console.log(option)
    this.setData({
      listData: app.globalData.listData,
      index:option.index
    })
    // 解决swiper高度无法自适应的问题
    wx.getSystemInfo({
      success:  res =>{
        this.setData({
          clientHeight: res.windowHeight-254
        });
      }
    })

  }
})

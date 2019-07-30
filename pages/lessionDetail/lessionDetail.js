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
   
    // 思路：swiper高度=通过可用屏幕高度-课程图高度-tab栏高度
    let that=this;
    //测试获取指定元素属性（课程图的高度）
    wx.createSelectorQuery().selectAll('.lession-img-container').boundingClientRect(function (rect) {
      console.log(rect[0].height)
      //课程图高度imgHeight
      let imgHeight = rect[0].height

      //获取tab栏的高度
      wx.createSelectorQuery().selectAll('.tab-nav-container').boundingClientRect(function (rect) {
        //tab栏高度rect[0].height
        console.log(rect[0].height)

        //获取屏幕的可用高度
        wx.getSystemInfo({
          success: res => {
            // 解决swiper高度无法自适应的问题
            that.setData({
              //swiper高度clientHeight
              clientHeight: res.windowHeight - imgHeight - rect[0].height,
            });
          }
        })
        
      }).exec()  
      
    }).exec()
   
  }
})

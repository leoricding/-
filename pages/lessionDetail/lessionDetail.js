// pages/lessionDetail/lessionDetail.js
const app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    listData:{},
    index:null,
    tabNavName:['详情',"目录","相关课程"],
    currentSelected:0,
  },

  //绑定事件，选中tab标签
  selectTab(event) {
    console.log("当前选中的tab标签"+event.currentTarget.dataset.index);
    let dataIndex = event.currentTarget.dataset.index;
    this.setData({
      currentSelected: dataIndex
    })
  },
  changeTab(event){
    console.log("swiper切换,显示当前swiper-item的index序号");
    console.log(event.detail.current);
    this.setData({
      currentSelected: event.detail.current
    })
  },
  //周期函数
  onLoad:function(option){
    //获取路由中的query属性
    console.log(option)
    this.setData({
      listData: app.globalData.listData,
      index:option.index
    })
    // 解决swiper塌陷问题
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

// pages/lession/lession.js
//获取全局属性app
const app = getApp();
// 读取本地数据
let datas = require("../../data/localData.js");
//console.log(datas);

//注册页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },

  onLoad:function(){
    //将本地数据写入data
    this.setData({
      listData:datas.localData
    });
    //将本地数据写入全局app，便于其他页面调用
    app.globalData.listData=datas.localData;
    console.log(this.data.listData);
    console.log(app.globalData.listData);
  },

  //绑定冒泡事件
  toLessionDetail:function(event){
    console.log(event);
    let index=event.currentTarget.dataset.index
    wx.navigateTo({
      url: `../lessionDetail/lessionDetail?index=${index}`,
    })
  }
})

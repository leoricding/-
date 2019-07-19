// pages/lession/lession.js
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
    console.log(this.data.listData);
  }
})

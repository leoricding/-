// index.js
// 获取应用实例
// 用于调用全局状态app.globalData
const app = getApp()

// 注册当前页面index
Page({
  data: {
    motto: 'Hello ',
    userInfo: {},
    hasUserInfo: false,
    // 用于判断微信是否支持button.open-type.getUserInfo用法
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 生命周期函数，页面加载时
  onLoad: function () {
    console.log('index.js初始化')

    // 判断是否已经获取到用户信息
    if (app.globalData.userInfo) {
      // 已经获取用户信息
      // 将用户信息赋值给userInfo
      // 将hasUserInfo设置为true
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("写入data数据成功")
      this.routerGo()
    } else if (this.data.canIUse){
      // 未获取到用户信息，但微信支持button.open-type.getUserInfo用法
      // 定义app.userInfoReadyCallback函数，
      // 这个函数在app.js调用
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      this.routerGo()
    } else {
      // 微信不支持button.open-type.getUserInfo用法
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 绑定自定义点击事件getUserInfo
  // 获取用户信息
  // 回调函数，e就是用户授权后的返回值
  // 若用户授权，用户信息保存在e.detail.userInfo
  // 若用户拒绝，e.detail.userInfo为undefined
  getUserInfo: function(e) {
    console.log("index按钮点击了，调用用户信息")
    console.log(e)
    console.log(e.detail.userInfo)
    // 将用户信息
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.routerGo()
  },

  // 实现页面自动跳转
  routerGo(){
    console.log('跳转函数调用了')

    // 定义一个周期函数interval
    // 判断image图片是否渲染，渲染成功后自动跳转
    let interval=setInterval( ()=> {
      if (wx.createSelectorQuery().select('image')) {
        console.log(wx.createSelectorQuery().select('image'))
        // 跳转
        // 跳转成功后执行回调函数clearInterval
        wx.navigateTo({
          url: './../lession/lession',
          success:()=>{
            console.log(this)
            console.log("跳转成功")
            clearInterval(interval)
          },
        })
      }
    }, 500) 
  }
 
})

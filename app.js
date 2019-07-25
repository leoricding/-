//app.js
//注册小程序
App({
  onLaunch: function () {
    console.log("app.js初始化")
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 登录成功后的回调
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wx.login登录成功')
      }
    })

    // 获取用户的设置，返回用户的授权信息
    wx.getSetting({
      success: res => {

        // 获取成功的回调
        console.log('获取用户的当前设置,返回授权后的信息')
        console.log(res)

        //判断用户是否授权
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，则无需重复授权
          // 可以直接调用 wx.getUserInfo 获取用户信息，不会弹框
          console.log("用户已经授权")
          wx.getUserInfo({
            success: res => {
              // 获取用户信息成功后的回调
              // 可以将 res 发送给后台解码出 unionId
              // 将用户信息赋值给this.globalData.userInfo
              this.globalData.userInfo = res.userInfo
              console.log('app.js中获取用户信息成功')
              console.log(this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // app.userInfoReadyCallback是在index的onLoad函数中定义的
              // 判断userInfoReadyCallback这个属性是否存在
              // 如果存在，则执行，将用户数据赋值给globalData及index中的data
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 全局状态
  globalData: {
    userInfo: null,
    listData:null
  }
})
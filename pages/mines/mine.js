let app = getApp()
Page({
  onLoad: function () {
    let updateTime = wx.getStorageSync(('userInfoUpdateTime'));
    if (updateTime > 0) {
      let time = Date.now() - updateTime;
      if (time < (2 * 24 * 60 * 60 * 1000)) {
        let useInfo = wx.getStorageSync("userInfo");
        this.setData({
          userInfo: useInfo
        })
      }
    }
  },
  data: {
    hasLogin: app.globalData.hasLogin,
    userInfo: null
  },

  onClearCache: (event) => {
    wx.showModal({
      content: "是否清除所有缓存？",
      success: (res) => {
        if (res.confirm) {
          //清除缓存
          wx.clearStorage();
        }
      }
    })
  },

  onScanCodeTap: (event) => {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: res.result,
        })
      }
    })
  },

  onSettingTap: (event) => {
    wx.showToast({
      title: '您点击了设置',
      icon: 'none'
    })
  },

  onAddressTap: (event) => {
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },

  onMineLocationTap: (event) => {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    });
  },

  userInfoHandler: function (event) {
    let userInfo = event.detail.userInfo;
    console.log(userInfo);
    this.setData({
      userInfo: userInfo
    });
    app.globalData.userInfo = userInfo;
    wx.setStorageSync("userInfoUpdateTime", Date.now());
    wx.setStorageSync("userInfo", userInfo);
  }
})
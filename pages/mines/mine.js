var app = getApp()
Page({
  onLoad: function () {
    this.setData({
      hasLogin: app.globalData.hasLogin,
      userInfo: app.globalData.userInfo
    })
  },
  data: {},

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

  login: function () {
    var that = this
    wx.login({
      // success: function (res) {
      //   app.globalData.hasLogin = true
      //   that.setData({
      //     hasLogin: true
      //   })
      //   wx.getUserInfo({
      //     success: function (res) {
      //       var userInfo = res.userInfo
      //       var nickName = userInfo.nickName
      //       var avatarUrl = userInfo.avatarUrl
      //       var gender = userInfo.gender //性别 0：未知、1：男、2：女
      //       var province = userInfo.province
      //       var city = userInfo.city
      //       var country = userInfo.country

      //     }
      //   })
      // }
      success: (res) => {
        app.globalData.hasLogin = true;
        this.setData({
          hasLogin: true
        });

        wx.getUserInfo({
          success: (res) => {
            var userInfo = res.userInfo;
            app.globalData.userInfo = userInfo;
            this.setData({
              userInfo: userInfo
            })
          }
        });
      }
    })
  }
})
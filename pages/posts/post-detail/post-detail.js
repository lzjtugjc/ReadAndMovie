// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      ...postsData.postList[postId],
    });

    var postsCollected = wx.getStorageSync('poset_Collected');
    if (postsCollected) {
      this.setData({
        collected: postsCollected[postId]
      });
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('poset_Collected', postsCollected);
    }
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('poset_Collected');
    if (postsCollected) {
      var postCollected = postsCollected[this.data.postId];
      postsCollected[this.data.postId] = !postCollected;
      wx.setStorageSync('poset_Collected', postsCollected);
      // 更新数据绑定变量
      this.setData({
        collected: !postCollected
      });

      wx.showToast({
        title: !postCollected ? '收藏成功' : '取消收藏成功',
        duration: 1000,
        icon: 'success'
      })
    }

  },

  onShareTap: function (event) {

  }
})
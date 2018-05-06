// pages/posts/post.js
var postsData = require('../../data/posts-data.js');
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
    this.setData({
      postList: postsData.postList
    });
  },

  onDetail: function (event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
 * 点击轮播图查看详情
 */
  onSwiperDetailTap: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
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
      ...postsData.postList[postId]
    });
  },
})
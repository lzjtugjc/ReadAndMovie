// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: app.globalData.g_isPlayingMusic
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
      if (postsCollected[postId]){
        this.setData({
          collected: postsCollected[postId]
        });
      }else{
        postsCollected[postId] = false;
        wx.setStorageSync('poset_Collected', postsCollected);
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('poset_Collected', postsCollected);
    };
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusciMonitor();
  },
  /**
   * 设置音乐播放监听
   */
  setMusciMonitor: function () {
    var self = this;
    wx.onBackgroundAudioPause(function () {
      self.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioPlay(function () {
      self.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
    });
  },

  onHide: function () {

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
    var itemList = ['分享到微信好友', '分享到朋友圈', '分享到QQ', '分享到QQ空间', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        console.log(res);
        wx.showModal({
          title: '用户 ' + itemList[res.tapIndex],
          content: '现在还不能实现分享',
        });
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });
  },

  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music.url,
        title: this.data.music.title,
        coverImgUrl: this.data.music.coverImg,
      });

      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_currentMusicPostId = this.data.postId;
      app.globalData.g_isPlayingMusic = true;
    }
  },

})
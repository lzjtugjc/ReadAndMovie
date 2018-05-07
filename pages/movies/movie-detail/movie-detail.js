// pages/movies/movie-detail/movie-detail.js
import { Movie } from "class/Movie.js";

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    // console.log(movieId);
    var deatilUrl = app.globalData.host + "/v2/movie/subject/" + movieId;
    //获取数据
    var movie = new Movie(deatilUrl);
    var self = this;
    movie.getMovieData(function (movie) {
      self.setData({
        movie: movie
      })
    })
  },


  /**
   * 查看大图
   */
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src],
    });
  }
})
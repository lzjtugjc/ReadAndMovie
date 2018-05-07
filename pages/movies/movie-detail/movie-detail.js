// pages/movies/movie-detail/movie-detail.js
var util = require('../../../utils/util.js');
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
    util.http(deatilUrl, 0, 1, false, this.callBack);
  },

  callBack: function (res, isLoadMore) {
    var data = res.data;
    if (!data) {
      return;
    }
    // console.log(data);
    var director = {
      avatar: "",
      name: "",
      id: ""
    }

    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStar(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary.replace(/\\n/g, "\n")
    }

    this.setData({
      movie: movie
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
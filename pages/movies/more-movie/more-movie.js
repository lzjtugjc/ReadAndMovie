// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: [],
    dataUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category,
    })
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.host + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.host + '/v2/movie/coming_soon';
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.host + '/v2/movie/top250';
        break;
    }
    this.setData({
      dataUrl: dataUrl
    })
    //获取数据
    util.http(dataUrl, 0, 12, false, this.callBack);
  },

  callBack: function (res, isLoadMore) {
    var moviesDouban = res.data;
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        star: util.convertToStar(subject.rating.stars)
      }
      movies.push(temp);
    }
    console.log(movies);
    //如果不是加载更多，则清空数据
    if (!isLoadMore && this.data.movies.length > 0) {
      this.setData({
        movies: []
      })
    }

    if (this.data.movies.length <= 0) {
      this.setData({
        movies: movies
      });
    } else {
      this.setData({
        movies: this.data.movies.concat(movies)
      });
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //设置标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },
  onReachBottom: function (event) {
    util.http(this.data.dataUrl, this.data.movies.length, 12, true, this.callBack);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function (event) {
    //获取数据
    util.http(this.data.dataUrl, 0, 12, false, this.callBack);
  },
  onMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    // console.log("onMovieDetail" + movieId);
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})
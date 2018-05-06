var util = require('../../utils/util.js');
var app = getApp();
Page({

  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.host + "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.host + '/v2/movie/coming_soon';
    var top250Url = app.globalData.host + '/v2/movie/top250';

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var self = this;
    wx.request({
      url: url,
      data: {
        start: 0,
        count: 3
      },
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        self.processDoubanDta(res.data, settedKey, categoryTitle);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  processDoubanDta: function (moviesDouban, settedKey, categoryTtile) {
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
    console.log("movies : " + movies);

    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categoryTtile: categoryTtile
    };
    this.setData(readyData);
  },

  onMoreMovieTap: function (event) {
    var category = event.currentTarget.dataset.category;
    if(!category){
      return;
    }
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    });
  }
})
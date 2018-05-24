var util = require('../../utils/util.js');
var app = getApp();
Page({

  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    inputValue: ""
  },
  onLoad: function (event) {
    this.getMovieListCache("inTheaters");
    this.getMovieListCache("comingSoon");
    this.getMovieListCache("top250");
  
    var inTheatersUrl = app.globalData.host + "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.host + '/v2/movie/coming_soon';
    var top250Url = app.globalData.host + '/v2/movie/top250';

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  getMovieListCache: function (key){
    let data = wx.getStorageSync(key);
    console.log("获取到的缓存为 ： " + data);
    this.setData(data);
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

    let readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categoryTtile: categoryTtile
    };
    wx.setStorage({
      key: settedKey,
      data: readyData,
      success: (res) => {
        console.log("保存成功");
      }
    })
    this.setData(readyData);
  },

  onMoreMovieTap: function (event) {
    var category = event.currentTarget.dataset.category;
    if (!category) {
      return;
    }
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    });
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    });
  },

  onBindConfirm: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.host + "/v2/movie/search?q=" + text;
    console.log("onBindConfirm  " + event.detail.value);
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  onCancelTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ""
    });
  },

  onMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    // console.log("onMovieDetail" + movieId);
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  }
})
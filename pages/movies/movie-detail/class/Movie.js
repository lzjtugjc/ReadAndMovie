var util = require('../../../../utils/util.js');
class Movie {
  constructor(url) {
    this.url = url;
  }

  getMovieData(cb) {
    this.cb = cb;
    util.http(this.url, 0, 1, false, this.processDoubanData.bind(this));
  }

  processDoubanData(res,isLoadMore) {
    var data = res.data;
    if (!data) {
      return;
    }
    console.log(data);
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    console.log(data.directors);
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
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
    this.cb(movie);
  }
}

export {
  Movie
}
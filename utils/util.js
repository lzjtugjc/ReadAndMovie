const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStar(stars) {
  var num = stars.toString().substring(0, 1);
  return parseInt(num);
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var index in casts) {
    castsjoin = castsjoin + casts[index].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = [];
  for (var i in casts) {
    var cast = {
      img: casts[i].avatars ? casts[i].avatars.large : "",
      name: casts[i].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

function http(url, offset, pageSize, isLoadMore, callBack) {
  var self = this;
  wx.request({
    url: url,
    data: {
      start: offset,
      count: pageSize
    },
    method: "GET",
    header: {
      "content-type": "json"
    },
    success: function (res) {
      callBack(res, isLoadMore);
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStar: convertToStar,
  http: http,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString
}

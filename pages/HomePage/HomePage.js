//引入数据
var newsData = require("../data/HomePageData.js");
var app = getApp();

Page({

  data: {
    indicatorDots: "true",
    autoplay: "true",
    interval: "3000",
    circular: "true",
    useData: []
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    this.setData({
      useData: newsData.initData
    }) //传递数据到上面data的useData

    var usNews = app.globalUrl.NewsUrl + "/v2/top-headlines?country=us&apiKey=77168bfedb7b408eb62a5de0aa27b70f";
    var jpNews = app.globalUrl.NewsUrl + "/v2/top-headlines?country=jp&apiKey=77168bfedb7b408eb62a5de0aa27b70f";
    this.http(usNews, this.callback);
    this.http(jpNews, this.callback);
  },

  //新闻接口
  http: function(url, callback) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        callback(res.data)
      }
    })
  },

  callback: function(res) {
    //console.log(res);
    var news = [];
    //过滤数据
    for (var idx in res.articles) {
      var article = res.articles[idx];

      var temp = {
        title: article.title,
        author: article.source.name,
        date: article.publishedAt,
        description: article.description,
        image: article.urlToImage,
        content: article.content,
      }
      news.push(temp);
    }
    console.log(news);
  },

  //跳转详情页
  goNewsDetail: function(event) {
    wx.navigateTo({
      url: "PageDetail/PageDetail?newsid=" + event.currentTarget.dataset.newsid
    })
  },
})
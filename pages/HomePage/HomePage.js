//引入数据
var app = getApp();

Page({

  data: {
    indicatorDots: "true",
    autoplay: "true",
    interval: "3000",
    circular: "true",
    newData:[]
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {

  //var usNews = app.globalUrl.NewsUrl + "/v2/top-headlines?country=us&apiKey=77168bfedb7b408eb62a5de0aa27b70f";
    var jpNews = app.globalUrl.NewsUrl + "/v2/top-headlines?country=jp&apiKey=77168bfedb7b408eb62a5de0aa27b70f";
  //var cnNews = app.globalUrl.NewsUrl + "/v2/top-headlines?country=cn&apiKey=77168bfedb7b408eb62a5de0aa27b70f";
  //this.http(usNews, this.callback);
    this.http(jpNews, this.callback);
  //this.http(cnNews, this.callback);
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
    var idx;
    for (idx in res.articles) {
      var article = res.articles[idx];
    //idx是新闻的序号，0开始
      var temp = {
        id:idx,
        title: article.title,
        author: article.source.name,
        date: article.publishedAt,
        description: article.description,
        image: article.urlToImage,
        content: article.content,
      }
      news.push(temp);
    }
    //article是一条数据里全部的信息都有
    //news[]是temp筛选过的信息
    //console.log(news[2]);
    this.setData({
      newData:news
    })//传递数据到上面data的useData
  },

  //跳转详情页
  goNewsDetail: function(event) {
    console.log(event);
    wx.navigateTo({
      url: "PageDetail/PageDetail?id="+event.currentTarget.dataset.id
    })
  },
})

//导出数据可以被外部访问
module.exports = {
  initData: Page
}

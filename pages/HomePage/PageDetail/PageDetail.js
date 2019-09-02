var newsData = require("../../data/HomePageData.js") //引入数据

Page({
  data: {
    newsid:""
  },

  onLoad: function(options) {
    this.setData(newsData.initData[options.newsid]) //获取新闻数据用
    this.setData({
      newsid: options.newsid //把唯一id放到data中
    })

    //第一次进入的时候判断是否存在本地存储以及收藏
    var newsCollect = wx.getStorageSync('newsCollect');
    //如果newsCollect存在，则代表以前收藏过或者以前取消过收藏
    if (newsCollect) {
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected: newCollect
      })
    } else {
      //第一次进入根本不存在数据
      var newsCollect = {};
      //我把当前唯一id扔到newsCollect对象中，默认false
      newsCollect[options.newsid] = false;
      //扔到本地存储中
      wx.setStorageSync('newsCollect', newsCollect);
    }
  },

  collectTap: function(event) {
    //newsCollect是所有数据的集合
    var newsCollect = wx.getStorageSync("newsCollect");
    //newCollect是当前一条数据
    var newCollect = newsCollect[this.data.newsid];
    //点击的时候，如果收藏则取消，如果未收藏则收藏
    newCollect = !newCollect;
    //更新到本地存储中
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync("newsCollect", newsCollect);
    //更新视图
    this.setData({
      collected: newCollect
      //collected:newsCollect[this.data.newsid]
    })
  }
})
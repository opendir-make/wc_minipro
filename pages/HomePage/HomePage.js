//引入数据
var newsData = require("../data/HomePageData.js");

Page({

  data: {
    indicatorDots: "true",
    autoplay: "true",
    interval: "3000",
    circular: "true",
    useData: ""
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    this.setData({
      useData: newsData.initData
    }) //传递数据到上面data的useData
  },

  //跳转详情页
  goNewsDetail: function(event) {
    wx.navigateTo({
      url: "PageDetail/PageDetail?newsid="+event.currentTarget.dataset.newsid
    })
  }
})
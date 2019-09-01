var newsData = require("../../data/HomePageData.js")
Page({
  data: {
    detailData: []
  },

  onLoad: function(options) {
    this.setData(newsData.initData[options.newsid])
  }
})
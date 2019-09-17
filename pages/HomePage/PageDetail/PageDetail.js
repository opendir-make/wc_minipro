var newsDetail = require("../../HomePage/HomePage.js") //引入数据

Page({
  data: {
    //idx: "",
    isPlaying: false
  },

  onLoad: function(options) {
    console.log(options.id)
    console.log(newsDetail.callback.news[options.id])

    //this.setData(newsData.initData[options.newsid]) //获取新闻数据用
    //this.setData({
    //  newsid: options.newsid //把唯一id放到data中
    //})

    //读取和存储都是在操作整体

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
      //把当前唯一id扔到newsCollect对象中，默认false
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
      }),

      wx.showToast({
        title: newsCollect[this.data.newsid] ? "收藏成功" : "取消收藏", //三元表达式
        //表达式 (expr1) ? (expr2) : (expr3)
        // 在 expr1 求值为 TRUE 时的值为 expr2，在 expr1 求值为 FALSE 时的值为 expr3
        icon: 'success',
        duration: 700,
        mask: true
      })
  },

  playerTap: function(event) {
    console.log("用户点击了播放按钮");
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        var status = res.status;
        if (status != 1) {
          //没有播放
          wx.playBackgroundAudio({
            dataUrl: newsData.initData[that.data.newsid].music.url,
            title: newsData.initData[that.data.newsid].music.title,
            coverImgUrl: newsData.initData[that.data.newsid].music.coverImg
          })
          that.setData({
            isPlaying: true
          })
        } else {
          wx.pauseBackgroundAudio();
          that.setData({
            isPlaying: false
          })
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: newsData.initData[this.data.newsid].title,
      path: "pages/HomePage/PageDetail/PageDetail"
    }
  }
})
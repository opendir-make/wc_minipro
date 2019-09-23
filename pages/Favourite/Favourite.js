Page({
  goCollecting1:function(event){
    wx.navigateTo({
      url: '../Favourite/collecting/collecting',/* 关联到跳转页面的地址*/
    })
  },
  goCollecting2: function (event) { /*跳转到collecting2页面*/
    wx.navigateTo({
      url: '../Favourite/collecting2/collecting2',
    })
  }
 

})

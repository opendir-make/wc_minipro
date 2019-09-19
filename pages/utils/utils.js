//公共网络请求（新闻接口）
function http(url, callback) {
  wx.request({
    url: url,
    method:"GET",
    header: {
      'content-type': 'application/xml'
    },
    success(res) {
      callback(res.data)
    }
  })
}

//导出数据可以被外部访问
module.exports = {
  http:http
}

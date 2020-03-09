// pages/detail/detail.js
const app = getApp()

Page({
  data:{
    newsDetail:{},
    // content:""
    
  },

  onLoad(params){
    var me = this;

    var newsId = params.newsId;
    console.log(params)
    console.log("传递过来的新闻ID为："+newsId);

    wx.request({
      url: app.serverUrl + '/news/detail/' + newsId,
      // data:{
      //   x='',
      //   y=''
      // },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        //console.log(res.data);
        var mydata = res.data;
        var status = mydata.status;
        if (status == 200) {
          var newsDetail = mydata.data;
          me.setData({
            newsDetail: newsDetail
          });
        }
      }
    })
  }
  
})
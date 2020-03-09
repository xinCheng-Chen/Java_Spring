//index.js
const app = getApp()

Page({
  data: {
    types: [],
    defaultNewsTypeId: 1001,//设置首页默认新闻分类
    defaultTypeIndex:0,//定义默认分类下标
  },

  showDetail(e) {
    // console.log(e);
    // debugger;
    var newsId = e.currentTarget.dataset.newsid;
    console.log(newsId);
    wx.navigateTo({
      url: '/pages/detail/detail?newsId=' + newsId,
    });
  },

  onLoad() {
    var me = this;
    wx.request({
      url: app.serverUrl + '/type/all',
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
          var typeArr = mydata.data;
          me.setData({
            types: typeArr
          });
        }
      }
    })
    // 获取新闻默认列表
    me.fetchNewsList();
  },

  fetchNewsList() {
    var me = this;
    var typeId = me.data.defaultNewsTypeId;

    wx.request({
      url: app.serverUrl + '/news/list?typeId=' + typeId,
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
          var newsList = mydata.data; //获取后端newsList
          var newsWrapperList = [];
          for (var i = 0; i < newsList.length; i++) {
            var news = newsList[i];
            var coverImgStr = news.coverImg;
            var coverImgArr = [];
            if (coverImgStr != null && coverImgStr != undefined && coverImgStr != '') {
              coverImgArr = JSON.parse(coverImgStr);
            }
            var newsWrapper = {
              news: news,
              coverImgArr: coverImgArr
            }

            newsWrapperList.push(newsWrapper);
          }
          me.setData({
            newsWrapperList:newsWrapperList
            // me(property) newsWrapperList: any[]
            // newsWrapperList
          });
          console.log(newsWrapperList)
          // me.setData({
          //   types: typeArr
          // });
        }
      }
    })
  },

  switchNews(e){
    var choosenindex = e.currentTarget.dataset.choosenindex;
    //如果当前显示的新闻类别就是用户点击的index，则不做任何操作，避免重复业务
    var defaultTypeIndex=this.data.defaultTypeIndex;
    if (choosenindex == defaultTypeIndex){
      return;
    }
    //用户选择新的分类下标后，去覆盖原有的默认的新闻分类下标
    this.setData({
      defaultTypeIndex: choosenindex
    })
    var typeid = e.currentTarget.dataset.typeid;
    //覆盖新闻分类的id
    this.setData({
      defaultNewsTypeId: typeid
    })
    this.fetchNewsList();
  },

})
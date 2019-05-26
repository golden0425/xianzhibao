import wxModal from "../../utils/wxModal";
import api from "../../utils/request";
Page({
  data: {
    resoutuijian:null,
    jingpinhaoshu:null,
    xinshuremai:null,
    jikemiaosha: null,
    ershouzhuanqu: null,
    publishList:[],
    swiperList:[
      { url: "http://zuul.xpark.highlifes.com/common/image/20190515/1b7014c1-a7db-4108-b32c-9274d19f1864.jpg" },
      { url: "http://zuul.xpark.highlifes.com/common/image/20190515/9a47e064-e867-44e3-9a30-b02dcc84ff11.png" },
      { url: "http://zuul.xpark.highlifes.com/common/image/20190515/8ca9ebee-b0f8-4de2-a164-e6e0be848457.png"}],
    msgList: [
      { url: "url", title: "公告：欢迎来到闲置二手" },
      { url: "url", title: "公告：夏日炎炎" }],
    
  },
  search_page:function(){
    wx.navigateTo({
      url: '../search_page/search_page',
    })
  },
  
  onLoad() {
    this.getPublishs()
  }, 

  getPublishs:function (){
    api.getpublishs().then((res)=>{
      console.log(res)
      if(res.code==200){
      this.setData({
        publishList:res.data.rows
      });
      }
      
    })
  },
  getProductTopThree:()=>{
    //热搜推荐前三个数据抓取
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 1 },
      method: 'GET',
      header: { "content-type": "application/json" },
      success: function (res) {
        var resoutuijian = res.data.reverse();
        that.setData({
          resoutuijian: resoutuijian
        });
      }
    });
    //精品好书前三个数据抓取
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 2 },
      method: 'GET',
      header: { "content-type": "application/json" },
      success: function (res) {
        var jingpinhaoshu = res.data.reverse();
        that.setData({
          jingpinhaoshu: jingpinhaoshu
        });
      }
    });
    //新书热卖前三个数据抓取
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 3 },
      method: 'GET',
      header: { "content-type": "application/json" },
      success: function (res) {
        var xinshuremai = res.data.reverse();
        that.setData({
          xinshuremai: xinshuremai
        });
      }
    });
    //即刻秒杀前三个数据抓取
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 4 },
      method: 'GET',
      header: { "content-type": "application/json" },
      success: function (res) {
        var jikemiaosha = res.data.reverse();
        that.setData({
          jikemiaosha: jikemiaosha
        });
      }
    });
    //二手专区前三个数据抓取
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 5 },
      method: 'GET',
      header: { "content-type": "application/json" },
      success: function (res) {
        var ershouzhuanqu = res.data.reverse();
        that.setData({
          ershouzhuanqu: ershouzhuanqu
        });
      }
    });
  },

  toDetail:function(e){
    var bookid = e.currentTarget.dataset.bookid;
    console.log("您刚点击的书本id为："+bookid);
    wx.navigateTo({
      url: '../others/details/details?bookid=' + bookid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  resoutuijian:function(){
    wx.switchTab({
      url: '../fenlei/fenlei',
    })
  },
  jingpinhaoshu:function(){
    wx.switchTab({
      url: '../fenlei/fenlei',
    })
  },
  xinshuremai: function () {
    wx.switchTab({
      url: '../fenlei/fenlei',
    })
  },
  onShareAppMessage: function (res) {    
    if(res.from === "menu"){
      console.log("来自右上角转发菜单")
    }
    return {
      title: "肥肥怪书吧",
      path: '/pages/index/index',
      imageUrl: "https://www.ffgbookbar.cn/BookStoreProject/public/index.png",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },


})
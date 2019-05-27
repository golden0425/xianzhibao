Page({
  data: {
    activeIndex: 0,
    scrolltop:0,
    tabs: [
      {
        id: 1,
        tabName: '二手专区'
      }, {
        id: 2,
        tabName: '热搜推荐'
      }, {
        id: 3,
        tabName: '精品好物'
      }, {
        id: 4,
        tabName: '新品热卖'
      }, {
        id: 5,
        tabName: '即刻秒杀'
      }
    ],
    items:[
      {name: 'dangmian', value: '当面交易'},
      {name: 'dangmian', value: '邮寄',checked: 'true'},
    ],
    ershouzhuanqu: null,
    resoutuijian:null,
    jingpinhaoshu:null,
    xinshuremai:null,
    jikemiaosha:null,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['请选择分类','1','2','3','4','5','6'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    selectList:['请选择分类','全新','9.9成新','9.8成新','9.5成新','9成新'],
    showList:false,
    value:0
  },
  search_page: function () {
    wx.navigateTo({
      url: '../search_page/search_page',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  selectTap(){
    this.setData({
      show: !this.data.show,
      showList:false
    });
  },
  selectListTap(){
   this.setData({
      showList: !this.data.showList,
      show:false
    });
  },
  optionListTap(e){
    let {value,item}=e.currentTarget.dataset;//获取点击的下拉列表的下标
    this.setData({
      value:value,
      showList:!this.data.showList,
    });
  }, 
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show:!this.data.show,
    });
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that =this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          deviceHeight: res.windowHeight,
        });
      }
    }); 
    // 获取热搜推荐数据
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1,'type':1},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "content-type": "application/json" }, // 设置请求的 header
      success: function (res) {
        var resoutuijian = res.data.reverse();
       that.setData({
         resoutuijian: resoutuijian,
       });
      }
    });
    // 获取精品好书数据
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 2 },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "content-type": "application/json" }, // 设置请求的 header
      success: function (res) {
        var jingpinhaoshu = res.data.reverse();
        that.setData({
          jingpinhaoshu: jingpinhaoshu,
        });
      }
    });
    // 获取新书热卖数据
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 3 },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "content-type": "application/json" }, // 设置请求的 header
      success: function (res) {
        var xinshuremai = res.data.reverse();
        that.setData({
          xinshuremai: xinshuremai,
        });
      }
    });
    // 获取即刻秒杀数据
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 4 },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "content-type": "application/json" }, // 设置请求的 header
      success: function (res) {
        var jikemiaosha = res.data.reverse();
        that.setData({
          jikemiaosha: jikemiaosha,
        });
      }
    });
    // 获取二手旧书数据
    wx.request({
      url: 'https://www.ffgbookbar.cn/BookStoreProject/public/store.php/showBooks',
      data: { isAll: 1, 'type': 5 },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "content-type": "application/json" }, // 设置请求的 header
      success: function (res) {
        var ershouzhuanqu = res.data.reverse();
        that.setData({
          ershouzhuanqu: ershouzhuanqu,
        });
      }
    });
  },
  changeTab: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      scrolltop:0,
    })
  },
  gotodetail:function(res){ 
    var bookid = res.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../others/details/details?bookid='+bookid,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === "menu") {
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
  getMore: function () {
    // this.setData({
    //   contentList: this.data.contentList.concat([
    //     { text: ' ' },
    //     { text: ' ' },
    //     { text: ' ' },
    //     { text: ' ' },
    //     { text: ' ' }
    //   ])
    // });
  },
})
import configUrl from "../../config";
Page({
  data: {
    activeIndex: 0,
    scrolltop: 0,
    tabs: [
      {
        id: 1,
        tabName: "二手专区"
      },
      {
        id: 2,
        tabName: "热搜推荐"
      },
      {
        id: 3,
        tabName: "精品好物"
      },
      {
        id: 4,
        tabName: "新品热卖"
      },
      {
        id: 5,
        tabName: "即刻秒杀"
      }
    ],
    items: [
      { name: "dangmian", value: "当面交易" },
      { name: "dangmian", value: "邮寄", checked: "true" }
    ],
    ershouzhuanqu: null,
    resoutuijian: null,
    jingpinhaoshu: null,
    xinshuremai: null,
    jikemiaosha: null,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ["请选择分类", "1", "2", "3", "4", "5", "6"], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    selectList: [
      "请选择分类",
      "全新",
      "9.9成新",
      "9.8成新",
      "9.5成新",
      "9成新"
    ],
    showList: false,
    value: 0,
    filepath: []
  },
  search_page: function() {
    wx.navigateTo({
      url: "../search_page/search_page",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  },
  selectTap() {
    this.setData({
      show: !this.data.show,
      showList: false
    });
  },
  selectListTap() {
    this.setData({
      showList: !this.data.showList,
      show: false
    });
  },
  optionListTap(e) {
    let { value, item } = e.currentTarget.dataset; //获取点击的下拉列表的下标
    this.setData({
      value: value,
      showList: !this.data.showList
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  //上传图片
  uploadPic: function() {
    let that = this;
    if (that.data.filepath.length === 1) {
      wx.showModal({
        title: "提示",
        content: "图片最多只能放一张哦",
        showCancel: false, //是否显示取消按钮
        cancelColor: "skyblue", //取消文字的颜色
        confirmText: "我知道了", //默认是“确定”
        confirmColor: "skyblue", //确定文字的颜色
        success: function(res) {},
        fail: function(res) {}, //接口调用失败的回调函数
        complete: function(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });
      return 0;
    }
    //设置第一张上传时弹出提示框消耗流量
    if (that.data.filepath.length == 0) {
      wx.showModal({
        title: "提示",
        content: "上传图片需要消耗流量，是否继续？",
        confirmText: "继续",
        success: function(res) {
          if (res.confirm) {
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ["compressed"], //压缩图
              sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
              success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var filepath = that.data.filepath;
                var tempFilePaths = res.tempFilePaths;
                console.log(filepath);
                filepath.push(tempFilePaths);
                console.log("地址路径为：" + tempFilePaths);
                that.setData({
                  isSrc: true,
                  filepath: filepath,
                  imgSrc: wx
                    .getFileSystemManager()
                    .readFileSync(res.tempFilePaths[0], "base64") //单张地址base64
                });
                console.log("地址路径为：" + that.data.filepath[0]);
                console.log(
                  wx
                    .getFileSystemManager()
                    .readFileSync(res.tempFilePaths[0], "base64")
                );
              }
            });
            // wx.chooseImage({
            //   count: 1, // 默认9
            //   sizeType: ['compressed'], //压缩图
            //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            //   success: function (res) {
            //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            //     var filepath = that.data.filepath;
            //     var tempFilePaths = res.tempFilePaths;
            //     console.log(filepath);
            //     filepath.push(tempFilePaths);
            //     console.log("地址路径为：" + tempFilePaths);
            //     that.setData({
            //       isSrc: true,
            //       filepath: filepath,
            //       imgSrc:tempFilePaths //单张地址
            //     })
            //     console.log("地址路径为：" + that.data.filepath[0]);
            //   }
            // })
          }
        }
      });
    } else {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], //压缩图
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var filepath = that.data.filepath;
          var tempFilePaths = res.tempFilePaths;
          console.log(filepath);
          filepath.push(tempFilePaths);
          console.log("地址路径为：" + tempFilePaths);
          that.setData({
            isSrc: true,
            filepath: filepath
          });
          console.log("地址路径为：" + that.data.filepath[0]);
        }
      });
    }
  },
  //删除图片
  clearPic: function(event) {
    //删除图片
    console.log(event);
    var index = event.currentTarget.dataset.index;
    var filepath = that.data.filepath;
    filepath.splice(index, 1);
    that.setData({
      isSrc: true,
      filepath: filepath
      // isSrc用来掩盖增加图标
    });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      //初始化数据
      filepath: [],
      isSrc: true,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true
    });
    wx.getSystemInfo({
      success: res => {
        that.setData({
          deviceHeight: res.windowHeight
        });
      }
    });
  },
  changeTab: function(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      scrolltop: 0
    });
    switch (e.currentTarget.dataset.index) {
      case 1:
        this.setData({
          selectData: [
            "请选择分类",
            "热搜推荐1",
            "热搜推荐2",
            "热搜推荐3",
            "热搜推荐4",
            "热搜推荐5"
          ]
        });
        break;
      case 2:
        this.setData({
          selectData: [
            "请选择分类",
            "精品好物1",
            "精品好物2",
            "精品好物3",
            "精品好物4",
            "精品好物5"
          ]
        });
        break;
      case 3:
        this.setData({
          selectData: [
            "请选择分类",
            "新品热卖1",
            "新品热卖2",
            "新品热卖3",
            "新品热卖4",
            "新品热卖5"
          ]
        });
        break;
      case 4:
        this.setData({
          selectData: [
            "请选择分类",
            "即刻秒杀1",
            "即刻秒杀2",
            "即刻秒杀3",
            "即刻秒杀4",
            "即刻秒杀5"
          ]
        });
        break;
      default:
        this.setData({
          selectData: ["请选择分类", "1", "2", "3", "4", "5", "6"]
        });
    }
  },
  gotodetail: function(res) {
    var bookid = res.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: "../others/details/details?bookid=" + bookid
    });
  },
  onShareAppMessage: function(res) {
    if (res.from === "menu") {
      console.log("来自右上角转发菜单");
    }
    return {
      title: "肥肥怪书吧",
      path: "/pages/index/index",
      imageUrl: "https://www.ffgbookbar.cn/BookStoreProject/public/index.png",
      success: res => {
        console.log("转发成功", res);
      },
      fail: res => {
        console.log("转发失败", res);
      }
    };
  },
  uploadImage: function() {
    let initUrl = configUrl.config.configUrl;
    let that = this;
    console.log(that.data.userId);
    let filePathStr = that.data.filepath[0].toString();
    console.log(filePathStr);
    wx.uploadFile({
      url: `${initUrl}user/uploadPuImage`,
      filePath: filePathStr,
      name: "file",
      formData: {
        userId: that.data.userId
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        console.log(res);
        if (res.statusCode === 200) {
          that.upload(res.data);
        }
      }
    });
  },
  upload(res) {
    let imgUrls = configUrl.config.imgUrl;
    let imgObj = JSON.parse(res);
    console.log(imgObj);
    let params = {
      query: {
        userId: this.data.userId, // 用户 id
        categoryId: "1", //种类 id
        brandId: "联想", //品牌
        puImage: `${imgUrls}${imgObj.data.picturePurl}`,
        puImageb: `${imgUrls}${imgObj.data.thumppicturePurl}`, //上传图片 1 张
        quantity: "1", //数量
        miaoshu: this.data.content, //商品详细介绍
        newold: "全新", //新旧
        old: "",
        amount: "1" //沟通次数
      }
    };
    console.log(params);
    api.sellPublish(params).then(res => {
      console.log(res);
    });
  },
  onShow() {
    console.log("onShow");
    let { userId } = wx.getStorageSync("userInfo");
    if (!userId) {
      this.setData({
        isdisabled: true
      });
      wxModal.showLoginModal();
    } else {
      this.setData({
        isdisabled: false,
        userId: userId
      });
    }
  }
});

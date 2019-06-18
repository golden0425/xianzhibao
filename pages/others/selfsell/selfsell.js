//获取应用实例
import api from "../../../utils/request";
import WxModal from "../../../utils/wxModal";
let app = getApp();
Page({
  data: {
    judgecontent: false,
    goods: [],
    publishList: [],
    pageSize: 10,
    flag: true,
    page: 1,
    delBtnWidth: 140,
    isScroll: true,
    windowHeight: 0,
    list: "",
    goodsIndex: null
  },
  getPublishs: function() {
    let { pageSize, page } = this.data;

    let params = {
      query: {
        pageSize,
        page
      }
    };
    api.getpublishs(params).then(res => {
      if (res.status === 200) {
        this.setData({
          publishList: res.data.rows
        });
      }
      wx.stopPullDownRefresh();
    });
  },
  onShow: function() {
    let { userId } = wx.getStorageSync("userInfo");
    if (userId) {
      let params = {
        query: { userId, page: 1, pageSize: 10 }
      };
      api.getMyPublishs(params).then(res => {
        if (res.status === 200)
          if (res.data.rows.length > 0)
            this.setData({
              goods: res.data.rows,
              judgecontent: true
            });
        console.log(res);
      });
    } else {
      wxModal.showLoginModal();
    }
  },
  onLoad: function(options) {
    this.getPublishs();
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          navHeight: res.statusBarHeight,
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function(e) {
    let touch = e.touches[0];
    console.log(touch);
    this.setData({
      startX: touch.clientX
    });
  },
  drawMove: function(e) {
    if (e.touches.length === 1) {
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let txtStyle = "";
      if (disX == 0 || disX < 0) {
        //如果移动距离小于等于0，说明向右滑动，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {
        //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      let goods = this.data.goods;
      goods[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        goods: goods
      });
    }
  },
  drawEnd: function(e) {
    let content = "您确定要删除该商品吗？";
    if (e.changedTouches.length == 1) {
      WxModal.setUpdateFuc(this.delGoodsItem);
      WxModal.Modal(content);
      //手指移动结束后水平位置
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = this.data.startX - endX;
      let delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let txtStyle =
        disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      let goods = this.data.goods;
      goods[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        goods: goods,
        goodsItem: goods[index],
        goodsIndex: index
      });
    }
  },
  delGoodsItem: function(confirm) {
    let { goodsId } = this.data.goodsItem;
    if (confirm) {
      let params = {
        query: { goodsId }
      };
      console.log(params);
      api.downMyPubList(params).then(res => {
        console.log(res);
      });
    } else {
      let { goodsIndex } = this.data;

      let goods = this.data.goods;
      goods[goodsIndex].txtStyle = "left:0rpx";
      this.setData({
        goods: goods
      });
    }
  },
  onReachBottom: function() {
    if (this.data.flag) {
      let { pageSize, page } = this.data;
      let params = {
        query: {
          pageSize,
          page
        }
      };
      let newPage = this.data.page + 1;
      api.getpublishs(params).then(res => {
        if (res.status === 200) {
          console.log(res);
          if (newPage => res.data.total) {
            this.setData({
              flag: false
            });
          } else {
            this.setData({
              publishList: res.data.rows,
              page: newPage
            });
          }
        }
        wx.stopPullDownRefresh();
      });
    }
  },
  onPullDownRefresh: function() {
    this.getPublishs();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  tonewsell: function() {
    wx.switchTab({ url: "/pages/fenlei/fenlei" });
  },
  goto: function(e) {
    let bookid = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: "../details/details?bookid=" + bookid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  }
});

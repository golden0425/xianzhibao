const app = getApp();
import wxModal from "../../utils/wxModal";

Page({
  data: {
    userInfo: {}, 
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    containHeight:500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    let userInfo= wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:userInfo
      })
    }else{
      wxModal.showLoginModal()
    }
  },
  onLoad: function () {
    
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // all_orders:function(){
  //   wx.navigateTo({
  //     url: '../others/all_orders/all_orders?currentTab=0',
  //     success: function(res) {},
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },
  // waitpay_list: function () {
  //   wx.navigateTo({
  //     url: '../others/all_orders/all_orders?currentTab=1',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // waitsend_list: function () {
  //   wx.navigateTo({
  //     url: '../others/all_orders/all_orders?currentTab=2',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  //  waitreceiv_list: function () {
  //   wx.navigateTo({
  //     url: '../others/all_orders/all_orders?currentTab=3',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // waitback_list: function () {
  //   wx.navigateTo({
  //     url: '../others/all_orders/all_orders?currentTab=4',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  selfsell: function () {
    wx.navigateTo({
      url: '../others/selfsell/selfsell',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  mycollections: function () {
    wx.navigateTo({
      url: '../others/mycollections/mycollections',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  myaddress: function () {
    wx.navigateTo({
      url: '../others/myaddress/myaddress',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  mycards: function () {
    wx.navigateTo({
      url: '../others/mycards/mycards',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  myoptions: function () {
    wx.navigateTo({
      url: '../others/myoptions/myoptions',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
})
/**
 * 提示与加载工具类
 */
export default class WxModal {
  /**
   * 警告框
   */
  constructor() {
    this.onUpdateFuc = ''
  }

  static setUpdateFuc(func) {
    this.onUpdateFuc = func
  }

  static alert(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }

 static showLoginModal () {
  wx.showModal({
    title: '提示',
    content: '您还未授权，授权后可获得完整体验 ',
    confirmText: '一键授权',
    success (res) {
      console.log(res)
      // 点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '../others/authorization/authorization',
        })
      }else{
        console.log('1')
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }
  })
}
  /**
   * 警告框
   */
  static showAlert(title, callBack) {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      duration: 2000
    })
    if (callBack) {
      setTimeout(() => {
        callBack()
      }, 2000)
    }
  }

  /**
   * 弹出加载提示
   */
  static loading(title = '加载中') {
    wx.hideLoading()
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
   * 加载完毕
   */
  static loaded() {
    wx.hideLoading()
  }

  static error(title, onHide) {
    wx.showToast({
      title: title,
      image: '../images/error.png',
      mask: true,
      duration: 2000
    })
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 1500)
    }
  }

  static toast(title, onHide, icon = 'success') {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: 2000
      })
    }, 300)

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 2300)
    }
  }

  static Modal(title = '提示', content = '您确定要取消该预约吗？') {
    let that = this
    wx.showModal({
      title: title,
      content: content,
      async success(res) {
        if (that.onUpdateFuc) {
          that.onUpdateFuc(res.confirm)
        }
      },
      fail() {
        console.log('取消预约')
        this.loaded()
      }
    })
  }
}

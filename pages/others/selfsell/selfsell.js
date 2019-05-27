//获取应用实例
import api from "../../../utils/request";
var app = getApp();
Page({
  data: {
    judgecontent:false,
    goods:[],
  },
  onShow:function(){
    let {userId}=wx.getStorageSync('userInfo')
    if(userId){
      let params={
        query:{userId}
      }
      api.getMyPublishs(params).then((res)=>{
        if(res.status===200)
          if(res.data.rows.length>0)
            this.setData({
              goods:res.data.rows,
              judgecontent:true
            })
        console.log(res)
      })
    }else{
      wxModal.showLoginModal()
    }
    
  },
  onLoad: function () {
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function (){
  },
  tonewsell: function () {
    wx.switchTab({ url:'/pages/fenlei/fenlei' });
  },
  goto:function(e){
    var bookid = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../details/details?bookid='+bookid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});

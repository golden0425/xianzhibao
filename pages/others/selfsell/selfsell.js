//获取应用实例
import api from "../../../utils/request";
var app = getApp();
Page({
  data: {
    judgecontent:false,
    goods:[],
    publishList:[],
    pageSize:10,
    flag:true,
    page:1, 
  },
  getPublishs:function (){
    let {pageSize,page}=this.data

    let params={
      query:{
        pageSize,
        page
      }
    }
    api.getpublishs(params).then((res)=>{

      if(res.status===200){
        this.setData({
          publishList:res.data.rows
        });
      }
      wx.stopPullDownRefresh();
    })
  },
  onShow:function(){
    let {userId}=wx.getStorageSync('userInfo')
    if(userId){
      let params={
        query:{userId,page:1,pageSize:10}
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
    this.getPublishs();
  },
  onReachBottom:function(){
    if(this.data.flag){
      let {pageSize,page}=this.data
      let params={
        query:{
          pageSize,
          page
        }
      }
      console.log('one',this.data.page)
      let newPage=this.data.page+1;
      console.log('two',newPage);
      console.log(params)
      api.getpublishs(params).then((res)=>{
        if(res.status===200){
          console.log(res)
          if(newPage => res.data.total){ 
              this.setData({
                flag:false
              })
          }else{
            this.setData({
              publishList:res.data.rows,
              page:newPage
            });
          }
        }
        wx.stopPullDownRefresh()
      })
    }

  },
  onPullDownRefresh:function(){
    this.getPublishs()
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

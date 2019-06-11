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
    delBtnWidth:160,
    data: [{ content: "1", right: 0 }, { content: "2", right: 0 }, { content: "3", right: 0 }, { content: "4", right: 0 }, { content: "5", right: 0 }, { content: "6", right: 0 }, { content: "7", right: 0 }, { content: "8", right: 0 }, { content: "9", right: 0 }, { content: "10",  right: 0 }],
    isScroll:true,
    windowHeight:0,
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
  onLoad: function (options) {
    this.getPublishs();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for(var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX
    console.log("33333")
    console.log(e)
    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  }, 
  drawEnd: function (e) {
    console.log("88888")
    console.log(e)
    
    var item = this.data.data[e.currentTarget.dataset.index]
    console.log('item.right',item.right)
    if (item.right >= this.data.delBtnWidth/2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  },
  
  delItem: function (e) {

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

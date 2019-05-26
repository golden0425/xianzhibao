
import wxModal from "../../utils/wxModal";
import api from "../../utils/request";
import  imgUrl  from "../../config";
 

import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
//获取应用实例
var app = getApp();
var that;
var username = wx.getStorageSync("my_nick");
var openid = wx.getStorageSync("user_openid");
var userid = wx.getStorageSync("user_id");
Page({
  data: {
    isdisabled:false,
    list_remind: '加载中',
    itemopen: false,
    hasFeed: false,
    goodsname: '',//商品名称
    content: '',//商品详细介绍
    mes: '',//卖家留言
    price:null,//价格
    sellerphone:'',//卖家联系方式
    sellerWechat:'',//卖家微信号
    imglist:"",
    info: '',
    userId:'',
    imgSrc:''
  },
  onShow:function (){
    console.log('onShow')
    let {userId}=wx.getStorageSync('userInfo');
    if(!userId){
      this.setData({
        isdisabled:true
      })
      wxModal.showLoginModal()
    }else{
      this.setData({
        isdisabled:false,
        userId:userId
      })
    }
  },
  onLoad: function () {
    console.log('onLoad')
    that = this;
    that.setData({//初始化数据
      filepath: [],
      isSrc: true,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true,
    })

    //获取设备和用户信息
    wx.getSystemInfo({
      success: function (res) {
        var info = '---\r\n**用户信息**\r\n';
        info += '用户名：' + username;
        info += '\r\n手机型号：' + res.model;
        info += '（' + res.platform + ' - ' + res.windowWidth + 'x' + res.windowHeight + '）';
        info += '\r\n微信版本号：' + res.version;
        info += '\r\nTogether版本号：' + app.version;
        that.setData({
          info: info
        });
        console.log(info);
      }
    });

  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    wx.hideToast()
  },


  //上传图片
  uploadPic: function () {
    if (that.data.filepath.length === 1) {
      wx.showModal({
        title: '提示',
        content: '图片最多只能放一张哦',
        showCancel: false,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "我知道了",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) { },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
      return 0;
    }
    //设置第一张上传时弹出提示框消耗流量
    if (that.data.filepath.length == 0) {
      wx.showModal({
        title: '提示',
        content: '上传图片需要消耗流量，是否继续？',
        confirmText: '继续',
        success: function (res) {
          if (res.confirm) {
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['compressed'], //压缩图
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
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
                  imgSrc:wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64") //单张地址base64

                })
                console.log("地址路径为：" + that.data.filepath[0]);
                console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
              },
            })
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
    }
    else {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], //压缩图
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var filepath = that.data.filepath;
          var tempFilePaths = res.tempFilePaths;
          console.log(filepath);
          filepath.push(tempFilePaths);
          console.log("地址路径为：" + tempFilePaths);
          that.setData({
            isSrc: true,
            filepath: filepath,
          })
          console.log("地址路径为：" + that.data.filepath[0]);
        }
      })
    }
  },

  //删除图片
  clearPic: function (event) {//删除图片
    console.log(event);
    var index = event.currentTarget.dataset.index;
    var filepath = that.data.filepath;
    filepath.splice(index, 1);
    that.setData({
      isSrc: true,
      filepath: filepath,
      // isSrc用来掩盖增加图标
    })
  },
  //商品文本信息上传，传入时间戳作为判断依据
 

upload(res){
    let imgUrl=configUrl.config.imgUrl
    let imgObj=JSON.parse(res)
    console.log(imgObj)
    let params={
      query:{
        userId:this.data.userId, // 用户 id
        categoryId: '1',//种类 id
        brandId: '联想',//品牌
        puImage:`${imgUrl}${imgObj.data.picturePurl}`,
        puImageb:`${imgUrl}${imgObj.data.thumppicturePurl}`,//上传图片 1 张
        quantity:'1',//数量
        miaoshu:this.data.content,//商品详细介绍
        newold:'全新',//新旧
        old:'',
        amount:'1'//沟通次数
      }
    }
    console.log(params)
    api.sellPublish(params).then(res=>{
      console.log(res)
    })
    
  },
uploadImage(){
  let that=this
  let filePathStr=that.data.filepath[0].toString()
  wx.uploadFile({
    url: 'http://5a5e0e8a.ngrok.io/user/uploadPuImage',
    filePath:filePathStr,
    name: 'file',
    formData:{
      userId:that.data.userId
    },
    header: {
      'Content-Type':'application/json',
    },
    success:(res)=>{
      console.log(res)
      if(res.statusCode===200){
          that.upload(res.data)
      }
    }
  })

  // let params={
  //   query:{
  //     userId:this.data.userId, // 用户 id
  //     // Files:this.data.imgSrc,
  //     filePath:this.data.filepath[0],
  //     name:'file'
  //   },
  //   isUpImage:'multipart/form-data' 
  //   //  isUpImage:'application/json' 
  // }
  // api.uploadImage(params).then(res=>{
  //   console.log(res)
  //   // this.upload()
  // })
},

  //提交表单
  submitForm:function(e) {
    this.uploadImage()

    // var goodsname = e.detail.value.goodsname;
    // var content = e.detail.value.content;
    // var mes = e.detail.value.mes;
    // var price = parseFloat(e.detail.value.price); 
    // var sellerphone = e.detail.value.phone; 
    // var sellerWechat = e.detail.value.wechat; 
    // //先进行表单非空验证
    // if (goodsname == "") {
    //   wxModal.alert('请输入商品名称')
    // } else if (content == "") {
    //   wxModal.alert('请输入商品详细介绍')
    // }
    // else if (!price){
    //   wxModal.alert('请确保价格为数字')
    // }
    // else if (sellerphone.length!=11){
    //   wxModal.alert('请核对您的联系方式，以方便对方联系您')
    // }
    // else if (sellerWechat == "") {
    //   wxModal.alert('请输入您的微信号，以方便对方联系您')
    // }
    // else if (that.data.filepath.length==0) {
    //   wxModal.alert('请至少上传一张商品图片')
    // }
    // else {
    //   that.setData({
    //     goodsname: goodsname,
    //     content: content,
    //     mes: mes,
    //     price: price,
    //     sellerphone: sellerphone ,
    //     sellerWechat: sellerWechat ,
    //   })

    //   wx.showModal({
    //     title: '提示',
    //     content: '是否确认提交商品信息',
    //     success: function (res) {
    //       console.log(res)
    //       if (res.confirm) {
    //         //执行上传操作，异步async
    //         that.uploadImage()

    //         that.setData({
    //           isLoading: true,
    //           isdisabled: true,
    //         });
    //         // 延迟函数
    //         setTimeout(function () {
    //           wx.navigateBack({
    //             delta:1,
    //           });
    //           wx.showToast({
    //             title: '提交成功',
    //             icon: 'success',
    //             duration: 1500
    //           });
    //         }, 1500);

    //       }
    //     }
    //   })
    // }
    // setTimeout(function () {
    //   that.setData({
    //     showTopTips: false
    //   });
    // }, 1000);
  }

});

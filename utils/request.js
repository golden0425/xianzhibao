import wxModal from "../utils/wxModal";
import  configUrl  from "../config";

let initUrl=configUrl.config.configUrl
function Requests(url, params={}) {
  console.log(url,params)
  let {method,isUpImage}=params
  return new Promise((resolv, reject) => {
    wxModal.loading()
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.request({
          url: url,
          data: params.query,
          method:method || "POST",
          header: {
            'Accept': 'application/json',
            'Content-Type':isUpImage || 'application/json; charset=utf-8',
            'token': res.data.token || ''
          },
          success: function (res) {
            wxModal.loaded()
            if (res.data == "服务器异常") {
              wx.showModal({
                title: '提示',
                content: '网络错误或服务器繁忙!',
              })
            } else {
              resolv(res.data)
            }
          },
          fail: function (err) {
            wxModal.loaded()
            reject(err)
            wx.showModal({
              title: '提示',
              content: '网络错误或服务器繁忙!',
            })
          }
        })
      },
      fail: function () {
        wx.request({
          url: url,
          data: params.query,
          method:method || "POST",
          header: {
            'Accept': 'application/json',
            'Content-Type':isUpImage || 'application/json; charset=utf-8'
          },
          success: function (res) {
            wxModal.loaded()
            if (res.data == "服务器异常") {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '网络错误或服务器繁忙!',
              })
            } else {
              resolv(res.data)
            }
          },
          fail: function (err) {
            wxModal.loaded()
            reject(err)
            wx.showModal({
              title: '提示',
              content: '网络错误或服务器繁忙!',
            })
          }
        })
      }
    })
  })
}

const login = params => Requests(`${initUrl}${LOGIN}`, params) //登录


const Login=()=>{
  wxModal.loading()
  wx.login({
    success(datainfo) {
      wx.getSetting({
      success:(res)=> {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success:(res)=>{
              let {nickName,avatarUrl}=res.userInfo
              let params={
                query:{
                  code:datainfo.code,
                  nickname:nickName,
                  faceImage:avatarUrl
                }
              }
              login(params).then(data=>{
                if(data.status===200){
                  wx.setStorageSync('userInfo',data.data);
                  wxModal.loaded()
                  setTimeout(() => {
                      wx.navigateBack({
                        delta:3
                      });
                    }, 1000);
                }else{
                  // wxModal.alert('授权失败')
                  // setTimeout(() => {
                  //   wx.navigateBack({
                  //     delta:3
                  //   });
                  // }, 1000);
                }
                
              })
              // api.login(params).then(data=>{
              //   console.log(data)
              // })
            }
          })
        }else{
          wxModal.showLoginModal()
        }
      },
      fail:(err)=>{
        wxModal.alert('登录失败')
      }  
    })
    }
  })
}


const getpublishs = params => Requests(`${initUrl}${GET_PUBLISHS}`, params) //获取全部产品
const sellPublish = params => Requests(`${initUrl}${SELL_PUBLISH}`, params) //发布商品
const uploadImage = params => Requests(`${initUrl}${UPLOAD_IMAGE}`, params) //上传图片





const LOGIN = 'user/login'
const GET_PUBLISHS = 'user/getpublishs' 
const SELL_PUBLISH='user/publish'
const UPLOAD_IMAGE='user/uploadPuImage'



module.exports={
  Login,
  getpublishs,
  sellPublish,
  uploadImage
}
//app.js
import api from "/utils/request";

App({
  onLaunch:()=>{
    api.Login()
  }
})
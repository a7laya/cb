(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-setting-setting"],{"0fb6":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"/* 页面铺满屏幕 */.page-fill[data-v-5cbead2a]{width:100%;height:100%;position:absolute}\r\n/* 头部个人信息 start */.header[data-v-5cbead2a]{padding:%?20?% %?30?% %?20?% %?30?%;\r\n\t/* background-color: #ffd655; */\r\n\t/* background: url(../../static/icons/bg.png) repeat; */display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.face[data-v-5cbead2a]{width:%?120?%;height:%?120?%;border-radius:50%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.info-wapper[data-v-5cbead2a]{width:80%;margin-left:%?40?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.nickname[data-v-5cbead2a]{color:#6a5018;font-size:18px;font-weight:700}.regist-login[data-v-5cbead2a]{margin-left:%?60?%;margin-top:%?30?%}.nav-info[data-v-5cbead2a]{color:#a38e62;font-size:14px;margin-top:%?10?%}.set-wapper[data-v-5cbead2a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;width:15%}.settings[data-v-5cbead2a]{width:%?40?%;height:%?40?%}\r\n/* 头部个人信息 end */\r\n/* 中间的 NEXT 大LOGO start */.body[data-v-5cbead2a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.big-next[data-v-5cbead2a]{font-size:%?160?%;color:#f7f7f7}\r\n/* 中间的 NEXT 大LOGO end */.info-list[data-v-5cbead2a]{\r\n\t/* margin-top: 20upx; */padding:%?0?% %?30?%}.info-words[data-v-5cbead2a]{color:#333;font-size:16px;width:25%;line-height:%?80?%\r\n\t/* font-weight: bold; */}.face[data-v-5cbead2a]{width:%?80?%;height:%?80?%;border-radius:50%}.arrow-block[data-v-5cbead2a]{margin-left:%?10?%;line-height:%?86?%}.arrow-ico[data-v-5cbead2a]{width:%?30?%;height:%?30?%}.item-wapper[data-v-5cbead2a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;\r\n\t/* margin-top: 20upx; */-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.face-line-upbottom[data-v-5cbead2a]{margin-top:%?20?%;\r\n\t/* margin-bottom: 20upx; */padding-top:%?20?%;padding-bottom:%?20?%}.line-top[data-v-5cbead2a]{\r\n\t/* margin-top: 20upx; */}.right-wapper[data-v-5cbead2a]{width:80%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.gray-fields[data-v-5cbead2a]{font-size:14px;color:#a9a9a9;line-height:%?80?%}\r\n/* 底部操作 start */.footer-wapper[data-v-5cbead2a]{position:fixed;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%}.footer-words[data-v-5cbead2a]{text-align:center;background-color:#fff;padding:%?20?%;color:#333;font-size:16px}\r\n/* 底部操作 end */",""])},"1d64":function(t,e,i){"use strict";i.r(e);var a=i("5979"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},5979:function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,o=a(i("bd86")),r=(n={data:function(){return{userIsLogin:!1,userInfo:{}}},onShow:function(){var t=this.getGlobalUser("userInfo");null!=t?(this.userIsLogin=!0,this.userInfo=t):(this.userIsLogin=!1,this.userInfo={},uni.navigateTo({url:"../login/login"}))}},(0,o.default)(n,"onShow",function(){var t=this.getGlobalUser("userInfo");null!=t?(this.userIsLogin=!0,this.userInfo=t):(this.userIsLogin=!1,this.userInfo={},uni.navigateTo({url:"../login/login"}))}),(0,o.default)(n,"onLoad",function(){}),(0,o.default)(n,"methods",{changePassword:function(){uni.navigateTo({url:"../changePassword/changePassword"})},timerSet:function(){uni.navigateTo({url:"../timerSet/timerSet"})},cleanStorage:function(){uni.clearStorageSync(),uni.showToast({title:"清理缓存成功",mask:!1,duration:1500})},logout:function(){var t=this.getGlobalUser("userInfo"),e=this.serverUrl;uni.request({url:e+"/users/logout?id="+t.user_id,method:"POST",header:{"content-type":"application/x-www-form-urlencoded",id:t.user_id,token:t.token},complete:function(t){uni.removeStorageSync("userInfo"),uni.navigateTo({url:"../login/login"})}})}}),n);e.default=r},"75cd":function(t,e,i){var a=i("0fb6");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5b05dc30",a,!0,{sourceMap:!1,shadowMode:!1})},9049:function(t,e,i){"use strict";i.r(e);var a=i("f796"),n=i("1d64");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("b063");var r=i("2877"),s=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"5cbead2a",null);e["default"]=s.exports},b063:function(t,e,i){"use strict";var a=i("75cd"),n=i.n(a);n.a},f796:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page page-fill"},[i("v-uni-view",{staticClass:"header"},[t.userIsLogin?i("v-uni-view",{staticClass:"info-wapper"},[i("v-uni-view",{staticClass:"nickname"},[t._v(t._s(t.userInfo.username))])],1):i("v-uni-view",[i("v-uni-navigator",{attrs:{url:"../login/login"}},[i("v-uni-view",{staticClass:"nickname regist-login"},[t._v("登录")])],1)],1)],1),i("v-uni-view",{staticClass:"page-block info-list"},[i("v-uni-view",{staticClass:"item-wapper ",on:{click:function(e){e=t.$handleEvent(e),t.changePassword(e)}}},[i("v-uni-view",{staticClass:"info-words"},[t._v("更改密码")]),i("v-uni-view",{staticClass:"right-wapper"},[i("v-uni-view",{staticClass:"arrow-block"},[i("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icons/left-gray-arrow.png"}})],1)],1)],1),i("v-uni-view",{staticClass:"line-top"},[i("v-uni-view",{staticClass:"line"})],1),i("v-uni-view",{staticClass:"item-wapper",on:{click:function(e){e=t.$handleEvent(e),t.timerSet(e)}}},[i("v-uni-view",{staticClass:"info-words"},[t._v("定时设置")]),i("v-uni-view",{staticClass:"right-wapper"},[i("v-uni-view",{staticClass:"arrow-block"},[i("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icons/left-gray-arrow.png"}})],1)],1)],1),i("v-uni-view",{staticClass:"line-top"},[i("v-uni-view",{staticClass:"line"})],1)],1),i("v-uni-view",{staticClass:"footer-wapper"},[i("v-uni-view",{staticClass:"footer-words",staticStyle:{"margin-top":"10upx"},on:{click:function(e){e=t.$handleEvent(e),t.logout(e)}}},[t._v("退出登录")])],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})}}]);
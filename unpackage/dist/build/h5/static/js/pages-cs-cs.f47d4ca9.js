(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cs-cs"],{"238e":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".page-block[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column\r\n\t/* justify-content: flex-start; */}\r\n\r\n\r\n\r\n/* 搜索框 start */.search-block[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?0?% %?20?% %?20?% %?20?%;\r\n\t/* 固定搜索栏 */position:fixed;top:70;z-index:2000;background-color:#f8f8f8}.plus-ico-wapper[data-v-fb043260]{margin-right:%?30?%}.search-ico-wapper[data-v-fb043260]{\r\n\t/* background-color: #eaeaea; */display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:%?0?% %?10?%}.search-ico[data-v-fb043260]{width:%?50?%;height:%?50?%}.search-text[data-v-fb043260]{font-size:19px;background-color:#fff;height:%?50?%;width:%?550?%}\r\n\r\n\r\n\r\n/* 搜索框 end */\r\n\r\n\r\n\r\n/* 电池型标题 start */.cs-name[data-v-fb043260]{margin-top:%?70?%}\r\n\r\n\r\n\r\n/* 电池型标题 end */\r\n\r\n\r\n\r\n/* 删除弹出框 start */.button-block[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.popup-button[data-v-fb043260]{margin:20px}\r\n\r\n\r\n\r\n/* 删除弹出框 end */\r\n\r\n\r\n\r\n/* 增加删除弹出框 start */.add-edit[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;widows:%?500?%;height:%?250?%}.add-edit-row[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;height:%?50?%;margin-top:%?50?%}.row-title-left[data-v-fb043260]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;width:30%;height:%?40?%;margin-right:%?15?%}.row-title-right[data-v-fb043260]{width:65%;height:%?40?%\r\n\t/* background-color: #eaeaea; */}.row-title-text[data-v-fb043260]{font-size:20px}.row-title-input[data-v-fb043260]{font-size:20px;background-color:#eaeaea}.popup-button-add[data-v-fb043260]{margin-left:%?100?%}\r\n\r\n\r\n\r\n/* 增加删除弹出框 start */",""])},"42cc":function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("e814")),o=n(i("0f0e")),s=n(i("3c3a")),r=n(i("d952")),c=n(i("a1c6")),d={components:{uniList:o.default,uniListItem:s.default,uniPopup:r.default,uniIcon:c.default},data:function(){return{csList:[],keywords:"",page:1,limit:15,totalPages:1,selectid:0,csIndex:0,addId:"",addLocation:"",editId:"",editLocation:""}},onShow:function(){var t=this.getGlobalUser("userInfo");null!=t?(this.userIsLogin=!0,this.userInfo=t):(this.userIsLogin=!1,this.userInfo={},uni.navigateTo({url:"../login/login"}))},onLoad:function(){var t=this,e=t.getGlobalUser("userInfo");uni.showLoading({mask:!0,title:"请稍后..."}),uni.showNavigationBarLoading();var i=t.serverUrl,n=t.limit;uni.request({url:i+"/css/tableData?keywords=&page=1&limit="+n,header:{"content-type":"application/x-www-form-urlencoded",id:e.user_id,token:e.token},method:"POST",success:function(e){if(0==e.data.code){var i=e.data.data.data;t.csList=i,t.totalPages=(0,a.default)(e.data.data.count/n)+1}else 1==e.data.code&&uni.navigateTo({url:"../login/login"})},complete:function(){uni.hideNavigationBarLoading(),uni.hideLoading()}})},onReachBottom:function(){var t=this,e=t.page+1,i=t.totalPages,n="";t.limit;e>i||t.pagedcsList(n,e,15)},methods:{add:function(){this.$refs.popupAdd.open()},confirmAdd:function(){var t=this,e=t.getGlobalUser("userInfo"),i=t.addId,n=t.addLocation;uni.showLoading({mask:!0,title:"请稍后..."}),uni.showNavigationBarLoading();var a=t.serverUrl;uni.request({url:a+"/css/add?meter_id="+i+"&location="+n,header:{"content-type":"application/x-www-form-urlencoded",id:e.user_id,token:e.token},method:"POST",success:function(e){0==e.data.code&&(t.csList.unshift({meter_id:i,location:n}),t.addId="",t.addLocation="")},complete:function(){uni.hideNavigationBarLoading(),uni.hideLoading()}}),this.$refs.popupAdd.close()},cancelAdd:function(){this.$refs.popupAdd.close()},confirmEdit:function(){var t=this,e=t.getGlobalUser("userInfo"),i=t.editId,n=t.editLocation,a=t.csIndex,o=t.selectid;uni.showLoading({mask:!0,title:"请稍后..."}),uni.showNavigationBarLoading();var s=t.serverUrl;uni.request({url:s+"/css/edit?id="+o+"&meter_id="+i+"&location="+n,header:{"content-type":"application/x-www-form-urlencoded",id:e.user_id,token:e.token},method:"POST",success:function(e){0==e.data.code&&(t.csList[a].meter_id=i,t.csList[a].location=n,t.editId="",t.editLocation="")},complete:function(){uni.hideNavigationBarLoading(),uni.hideLoading()}}),this.$refs.popupEdit.close()},cancelEdit:function(){this.$refs.popupEdit.close()},confirmDelete:function(t){var e=this,i=e.getGlobalUser("userInfo"),n=t.currentTarget.dataset.csid;uni.showLoading({mask:!0,title:"请稍后..."}),uni.showNavigationBarLoading();var a=e.serverUrl;uni.request({url:a+"/css/delete?id="+n,header:{"content-type":"application/x-www-form-urlencoded",id:i.user_id,token:i.token},method:"POST",success:function(t){0==t.data.code&&e.csList.splice(e.csIndex,1)},complete:function(){uni.hideNavigationBarLoading(),uni.hideLoading()}}),this.$refs.popupDelete.close()},cancelDelete:function(){this.$refs.popupDelete.close()},showcs:function(t){var e=t.currentTarget.dataset.csid;uni.navigateTo({url:"../csSingle/csSingle?csId="+e})},pagedcsList:function(t,e,i){var n=this,a=n.getGlobalUser("userInfo");uni.showLoading({mask:!0,title:"请稍后..."}),uni.showNavigationBarLoading();var o=n.serverUrl;uni.request({url:o+"/css/tableData?keywords="+t+"&page="+e+"&limit="+i,header:{"content-type":"application/x-www-form-urlencoded",id:a.user_id,token:a.token},method:"POST",success:function(t){if(0==t.data.code){var i=t.data.data.data;n.csList=n.csList.concat(i),n.page=e}},complete:function(){uni.hideNavigationBarLoading(),uni.hideLoading()}})},searchMe:function(t){var e=this,i=e.keywords;e.csList=[],e.pagedcsList(i,1,15)},operator:function(t){var e=this,i=(e.getGlobalUser("globalUser"),t.currentTarget.dataset.csid),n=t.currentTarget.dataset.csindex;e.selectid=i,e.csIndex=n,uni.showActionSheet({itemList:["编辑","删除"],success:function(t){var i=t.tapIndex;0==i?(e.editId=e.csList[n].meter_id,e.editLocation=e.csList[n].location,e.$refs.popupEdit.open()):1==i&&e.$refs.popupDelete.open()}})}}};e.default=d},8995:function(t,e,i){"use strict";i.r(e);var n=i("42cc"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},aa1c:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page page-block"},[i("v-uni-view",{staticClass:"search-block"},[i("v-uni-view",{staticClass:"plus-ico-wapper"},[i("v-uni-text",{staticClass:"test",staticStyle:{"font-size":"50upx"},on:{click:function(e){e=t.$handleEvent(e),t.add(e)}}},[t._v("")])],1),i("v-uni-input",{staticClass:"search-text",attrs:{placeholder:"搜索ID|位置",maxlength:"10","confirm-type":"search"},on:{confirm:function(e){e=t.$handleEvent(e),t.searchMe(e)}},model:{value:t.keywords,callback:function(e){t.keywords=e},expression:"keywords"}}),i("v-uni-view",{staticClass:"search-ico-wapper"},[i("v-uni-image",{staticClass:"search-ico",attrs:{src:"../../static/icons/search.png"},on:{click:function(e){e=t.$handleEvent(e),t.searchMe(e)}}})],1)],1),i("v-uni-view",{staticClass:"cs-name"},[i("uni-list",t._l(t.csList,function(e,n){return i("v-uni-view",{key:n},[i("v-uni-view",{attrs:{"data-csid":e.id,"data-csindex":n},on:{click:function(e){e=t.$handleEvent(e),t.showcs(e)},longpress:function(e){e=t.$handleEvent(e),t.operator(e)}}},[i("uni-list-item",{attrs:{title:e.location+"  ["+e.meter_id+"]","show-extra-icon":"true","extra-icon":{color:"#0402BB",size:"22",type:"spinner"}}})],1)],1)}),1)],1),i("uni-popup",{ref:"popupEdit",attrs:{type:"center"}},[i("v-uni-view",{staticClass:"add-edit"},[i("v-uni-view",{staticClass:"add-edit-row"},[i("v-uni-view",{staticClass:"row-title-left"},[i("v-uni-text",{staticClass:"row-title-text"},[t._v("水表ID:")])],1),i("v-uni-view",{staticClass:"row-title-right"},[i("v-uni-text",{staticClass:"row-title-input"},[t._v(t._s(t.editId))])],1)],1),i("v-uni-view",{staticClass:"add-edit-row"},[i("v-uni-view",{staticClass:"row-title-left"},[i("v-uni-text",{staticClass:"row-title-text"},[t._v("位置:")])],1),i("v-uni-view",{staticClass:"row-title-right"},[i("v-uni-input",{staticClass:"row-title-input",model:{value:t.editLocation,callback:function(e){t.editLocation=e},expression:"editLocation"}})],1)],1)],1),i("v-uni-view",{staticClass:"button-block"},[i("v-uni-button",{staticClass:"popup-button-add",attrs:{type:"warn",plain:"true","data-csid":t.selectid},on:{click:function(e){e=t.$handleEvent(e),t.confirmEdit(e)}}},[t._v("确定")]),i("v-uni-button",{staticClass:"popup-button-add",attrs:{type:"primary",plain:"true"},on:{click:function(e){e=t.$handleEvent(e),t.cancelEdit(e)}}},[t._v("取消")])],1)],1),i("uni-popup",{ref:"popupDelete",attrs:{type:"center"}},[t._v("确定要删除吗"),i("v-uni-view",{staticClass:"button-block"},[i("v-uni-button",{staticClass:"popup-button",attrs:{type:"warn",plain:"true","data-csid":t.selectid},on:{click:function(e){e=t.$handleEvent(e),t.confirmDelete(e)}}},[t._v("确定")]),i("v-uni-button",{staticClass:"popup-button",attrs:{type:"primary",plain:"true"},on:{click:function(e){e=t.$handleEvent(e),t.cancelDelete(e)}}},[t._v("取消")])],1)],1),i("uni-popup",{ref:"popupAdd",attrs:{type:"center"}},[i("v-uni-view",{staticClass:"add-edit"},[i("v-uni-view",{staticClass:"add-edit-row"},[i("v-uni-view",{staticClass:"row-title-left"},[i("v-uni-text",{staticClass:"row-title-text"},[t._v("水表ID:")])],1),i("v-uni-view",{staticClass:"row-title-right"},[i("v-uni-input",{staticClass:"row-title-input",model:{value:t.addId,callback:function(e){t.addId=e},expression:"addId"}})],1)],1),i("v-uni-view",{staticClass:"add-edit-row"},[i("v-uni-view",{staticClass:"row-title-left"},[i("v-uni-text",{staticClass:"row-title-text"},[t._v("位置:")])],1),i("v-uni-view",{staticClass:"row-title-right"},[i("v-uni-input",{staticClass:"row-title-input",model:{value:t.addLocation,callback:function(e){t.addLocation=e},expression:"addLocation"}})],1)],1)],1),i("v-uni-view",{staticClass:"button-block"},[i("v-uni-button",{staticClass:"popup-button-add",attrs:{type:"warn",plain:"true","data-csid":t.selectid},on:{click:function(e){e=t.$handleEvent(e),t.confirmAdd(e)}}},[t._v("确定")]),i("v-uni-button",{staticClass:"popup-button-add",attrs:{type:"primary",plain:"true"},on:{click:function(e){e=t.$handleEvent(e),t.cancelAdd(e)}}},[t._v("取消")])],1)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},c6b8:function(t,e,i){"use strict";var n=i("f15d"),a=i.n(n);a.a},edba:function(t,e,i){"use strict";i.r(e);var n=i("aa1c"),a=i("8995");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("c6b8");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"fb043260",null);e["default"]=r.exports},f15d:function(t,e,i){var n=i("238e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("28b80d10",n,!0,{sourceMap:!1,shadowMode:!1})}}]);
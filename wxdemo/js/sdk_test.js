/* 
* @Author: ZhangFengJie
* @Date:   2017-04-20 09:48:54
* @Last Modified by:   ZhangFengJie
* @Last Modified time: 2017-06-02 14:44:35
*/
//页面初始化
var sUserID='';
var config_json={};

function getMain(){
    config_json=useToken();
    console.log(config_json);
    var wx_ticket=config_json.D5;
    var timestamp=config_json.D3;
    var nonceStr=config_json.D4;
    var signature=getSignature(wx_ticket,nonceStr,timestamp);
    console.log(timestamp);//时间戳
    console.log(nonceStr);//随机字符串
    console.log(signature);//生成的签名
    wx_ready(timestamp,nonceStr,signature);
}
getMain();//初始化获取方法



function wx_ready(timestamp,nonceStr,signature){
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx480f8f10e26363f4', // 必填，公众号的唯一标识
        timestamp:timestamp, // 必填，生成签名的时间戳
        nonceStr:nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ', 
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });


    wx.ready(function(){
        wx.checkJsApi({
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ', 
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ],
          success: function (res) {
            alert(JSON.stringify(res));
          }
        });

    });
}



var sUserID="";
var EMPIID="";
var JGDM="";
var msgid="";
var openid="";
var curdate;
var sZt;//访视状态，1 第一次访视 2 大于一次访视
var sUserName;
var QRcode;//二维码
var code;
//入口
$(function(){
   //获取URL参数
   EMPIID=queryString("EMPIID");
   curdate=queryString("curdate");
   curdate=strreplace(curdate,"%20"," ")
   JGDM=queryString("JGDM");
   sUserID=queryString("sUserID");
   msgid=queryString("msgid");
   planVisitingId=queryString("planVisitingId");
   recordId=queryString("recordId");
   sZt=queryString("sZt");
   code=queryString("code");
   //alert(code)
   sUserName=unescape(queryString("sUserName"));
   formResize();
})
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";
 
    var uuid = s.join("");
    return uuid;
}
//页面初始化
var nonceStr=uuid();
console.log(nonceStr);
var timestamp=dateDiff("1970-01-01 00:00:00",new Date().format("yyyy-MM-dd hh:mm:ss"),"s")
// var doc2=getToken(sUserID,nonceStr,timestamp)
// 	$.ajax({async:false,type:"POST",url:"../../../disPatchJson?clazz=GETWXSHA&sUserID="+sUserID+"&sParams=wx480f8f10e26363f4$198cb8142abfc8a409c4e99f79ea962f$"+nonceStr+"$"+timestamp,data:{},success:function(msg){doc2=msg;}});
//console.log(doc2)
var doc2="f43e5cc6267756f51cea52584e23bc3e9a01032a";
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx480f8f10e26363f4', // 必填，公众号的唯一标识
    timestamp:timestamp, // 必填，生成签名的时间戳
    nonceStr:nonceStr, // 必填，生成签名的随机串
    signature: doc2,// 必填，签名，见附录1
    jsApiList: ["onMenuShareTimeline"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
	form_init();
});

wx.error(function(res){
	
});
function form_init(){
	wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	    	
	    },
	    fail: function(res) {
	    	
	    }
	});
	var doc=""
	var url="../../../disPatchJson?clazz=RMIREADDATA&sUserID="+sUserID+"&sExParams=https://api.weixin.qq.com/sns/oauth2/access_token&appid=wx480f8f10e26363f4&secret=198cb8142abfc8a409c4e99f79ea962f&code="+code+"&grant_type=authorization_code";
	$.ajax({async:false,type:"POST",url:url,data:{},success:function(msg){doc=msg;}});
	if (doc != ""){
	    var oJson=eval("("+doc+")")
	    if(oJson.openid){//第一次使用code//刷新之后尝试使用临时code自动登录
	    	openid=oJson.openid
	    	var phone='18757417986'
	    		console.log(openid)
	    	data_bd(phone,openid,code)//绑定到用户表
	    }
	    if(oJson.errmsg){
	    	if(oJson.errmsg.indexOf('code been used')!=-1){
	    		alert('code been used')//刷新之后尝试使用临时code自动登录
	    	}
	    }
	    	 //alert(oJson.openid)
	}
}
//页面大小适应
$(window).resize(function(){formResize();});
function formResize(){
	//$("#div1").height($("body").height()-70)
}
//数据列表
function data_list(){}
//数据删除
function data_del(){}
//账号绑定
function data_bd(phone,openid,code){
	alert(phone+"----"+openid)
	var doc=""
	var url="../../../disPatchJson?&clazz=READDATA&UITYPE=JG_WX_OPENID_UPDATE&sUserID="+sUserID+"&sParams="+phone+"$"+openid+"$"+code+"&data=[{D0:0}]";
	$.ajax({async:false,type:"POST",url:url,data:[{"D0":"0"}],success:function(msg){doc=msg;}});
	if (doc != ""){
	    var oJson=eval("("+doc+")")
	    if (oJson.code!="0"){
			alert(oJson.dsc);
	    }else{
	    	 alert("绑定成功")
	    }
	}
}
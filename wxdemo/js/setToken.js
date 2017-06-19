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
   sUserName=unescape(queryString("sUserName"));
   // formResize();
   window.setInterval(doMain,7000000)
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
    // alert(uuid)
    return uuid;
}
//页面初始化
var nonceStr=uuid()
var timestamp=dateDiff("1970-01-01 00:00:00",new Date().format("yyyy-MM-dd hh:mm:ss"),"s")

var jsapi_ticket2='';
var nonceStr2='';
var timestamp2='';
function doMain(){
	var doc2=getToken(sUserID,nonceStr,timestamp)
	var arr=doc2.split(',')
	var signature=arr[0]
	var asess_token=arr[1]
	var jsapi_ticket=arr[2]
	setToken(signature,asess_token,timestamp,nonceStr,jsapi_ticket)
}
function getMain(){
	var ojson=useToken();
  jsapi_ticket2=ojson.D5;
  timestamp2=ojson.D3;
  nonceStr2=ojson.D4;
	console.log(ojson);
  console.log(jsapi_ticket2);
  console.log(timestamp2);
  console.log(nonceStr2);
}



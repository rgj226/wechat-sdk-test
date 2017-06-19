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
   formResize();
   //form_init()
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
var nonceStr=uuid()
var timestamp=dateDiff("1970-01-01 00:00:00",new Date().format("yyyy-MM-dd hh:mm:ss"),"s")
wx.ready(function(){
	form_init();
});
wx.error(function(res){
	
});
var doc2="uWwMj_YTkHlEtX2ljxmnr3Qa4tZ-qTaCeZA8scy8oICzhuv1WKzGDg8iy5AIgMnrSNiYb4Ue3IMNn8lhevATvqYLp_UplU_OrKDu6KPI2nEIHASqikweIwzA4rUJpNGtOKVeAAAFBM";
function form_init(){
	var ojson = [];
	var ojsonstr = {};
	ojsonstr.D0 = '0';//来源
	ojson.push(ojsonstr)
	//同步调用
	var doc=""
	var url="../../../disPatchJson?clazz=RMIREADDATA&sUserID="+sUserID+"&sExParams=https://api.weixin.qq.com/cgi-bin/token&grant_type=client_credential&appid=wx480f8f10e26363f4&secret=198cb8142abfc8a409c4e99f79ea962f";
	$.ajax({async:false,type:"POST",url:url,data:{data:mini.encode(ojson)},success:function(msg){doc=msg;}});
	if (doc != ""){
		var oJson=eval("("+doc+")")
		doc2=oJson.access_token
		console.log(doc2)
	}
}
//页面大小适应
$(window).resize(function(){formResize();});
function formResize(){
	//$("#div1").height($("body").height()-70)
}
//数据列表
function data_list(){
	var ojson = [];
	var ojsonstr = {};
	ojsonstr.industry_id1 = '2';//
	ojson.push(ojsonstr)
	//同步调用
	var doc=""
	var url="../../../disPatchJson?clazz=RMIREADDATA&sUserID="+sUserID+"&sExParams=https://api.weixin.qq.com/cgi-bin/template/get_industry&access_token="+doc2;
	$.ajax({async:false,type:"POST",url:url,data:{data:mini.encode(ojson)},success:function(msg){doc=msg;}});
	if (doc != ""){
	    
	}
}
//数据删除
function data_del(){
	var ojson = [];
	var ojsonstr = {};
	ojsonstr.template_id_short = 'aNKBdugxGCAYR5GYhY-KLiG1ileqTCdM2y0dv1RhWcA';//
	ojson.push(ojsonstr)
	//同步调用
	var doc=""
	var url="../../../disPatchJson?clazz=RMIREADDATA&sUserID="+sUserID+"&sExParams=https://api.weixin.qq.com/cgi-bin/template/api_add_template&access_token="+doc2;
	$.ajax({async:false,type:"POST",url:url,data:{data:mini.encode(ojson)},success:function(msg){doc=msg;}});
	if (doc != ""){
	    
	}
}

function data_send(){
	//var ojson = [];
	var ojsonstr = {};
  ojsonstr.touser = 'o8ZSOv-FC8a24AqfZa2xsH5sO98I';//openid
	// ojsonstr.touser = 'o8ZSOv2dNYrTdv2WPDzlIC2Hq5XA';//openid
	ojsonstr.template_id = '5paJEpDJQU4SF8XNHX6qZhFFu49aunSwFskYBLA3KR4';//模版id
	ojsonstr.url="http://apps.junbaotech.cn?openid=123";//携带参数用户id  以及确认到期时间
	ojsonstr.data={
            "first": {
                "value":"亲爱的张锋杰,盆易康平台竭诚为您服务",
                "color":"#000000"
            },
            "keyword1":{
                "value":"2017年12月15日 08:00",
                "color":"#000000"
            },
            "keyword2": {
                "value":"麦澜德M1",
                "color":"#000000"
            },
            "keyword3": {
                "value":"来院就诊时，请您备好清洁的麦澜德M1电极套包，并且带上之前的治疗单和评估单！",
                "color":"#000000"
            },
            "remark":{
                "value":"您需要在10分钟内确认治疗排队,点击详情进入排队确认→",
                "color":"#ff0200"
            }
    }
	//ojson.push(ojsonstr)
	console.log(JSON.stringify(ojsonstr))
	//同步调用
	var doc=""
	var url="../../../disPatchJson?clazz=RMIWX&sUserID="+sUserID+"&sExParams=https://api.weixin.qq.com/cgi-bin/message/template/send&access_token="+doc2;
	/*$.ajax({async:false,type:"POST",url:url,data:{data:JSON.stringify(ojson)},success:function(msg){doc=msg;}});
	if (doc != ""){
	    
	}*/
	

	$.post(url,{data:JSON.stringify(ojsonstr)},
    		function (doc, textStatus){
    			if (doc != null){
    				
    			}else{
    				
    			}
    		})	
}

//数据列表
function data_get(){
	var ojson = [];
	var ojsonstr = {};
	ojsonstr.industry_id1 = '2';//
	ojson.push(ojsonstr)
	//同步调用
	var doc=""
	var url="../../../disPatchJson?clazz=WXDOWN&sUserID="+sUserID+"&sExParams=http://file.api.weixin.qq.com/cgi-bin/media/get&access_token="+doc2+"&media_id=zBLubjevjRzV8SH63naK5_hMfVujumSZCs9gSwMFQEHCtEeRp-PBnG4X9qca_e1-" 
	$.ajax({async:false,type:"POST",url:url,data:{data:mini.encode(ojson)},success:function(msg){doc=msg;}});
	if (doc != ""){
	    
	}
}

function data_down(){
	window.location.href="http://file.api.weixin.qq.com/cgi-bin/media/get?access_token="+doc2+"&media_id=zBLubjevjRzV8SH63naK5_hMfVujumSZCs9gSwMFQEHCtEeRp-PBnG4X9qca_e1-"
}

/**
 *  Author:strive
 *  Date: 2016/1/13
 * 
 * 				ajax({
					url:'/user',
					data:{act:'login',name:oTextName.value,pass:oTextPass.value},
					type:'get',
					success:function(str){
						var json=eval('('+str+')');
						
						if(json.ok){
							alert('登录成功');
						}else{
							alert('注册失败,失败原因:'+json.msg);
						}
					},
					error:function(str){
						alert('ajax请求失败，失败原因：');
						alert(str);
					}
				});
 * 
 */

function json2url(json){
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}

function ajax(json){
    json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.type=json.type || 'get';

    var timer=null;

//1.创建Ajax对象
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }
//2.连接服务器（打开和服务器的连接）
//3.发送
    switch(json.type){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }
//4.接收
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            clearTimeout(timer);
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
        }
    };
}

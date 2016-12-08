function EveryCount(index) {  
    var a = $("#test tr").eq(index).find("td").eq(2).text();  
    var b = $("#Num" + index).val();  
    var c = parseFloat(a) * parseFloat(b);  
    $("#test tr").eq(index).find("td").eq(4).text(c);  
    TotalCount();  
    updateOrderCookie(); //修改cookies中保存的数量  
    WriteOrderInDiv();  
}  
//计算总计  
function TotalCount() {  
    var rowscount = $("#test tr").length;  
    var sum = 0;  
    for (var i = 1; i <= parseInt(rowscount); i++) {  
        var littecount = $("#test tr").eq(i).find("td").eq(4).text();  
        if (littecount != null && littecount != "NaN" && littecount != "") {  
            sum = parseFloat(sum) + parseFloat(littecount);  
        }  
    }  
    $("#total").text(sum);  
}  
//判断是否存在相同的商品 如果相同则加一  
function IsRepeat(codes) {  
    var rowscount = $("#test tr").length;  
    var sum = 0;  
    for (var i = 1; i <= (parseInt(rowscount) - 1); i++) {  
        var Code = $("#test tr").eq(i).find("td").eq(0).text();  
  
  
        if (codes == Code) {  
            return i;  
        }  
    }  
    return 0;  
}  
//<--Start--将订单数据写入div  
function WriteOrderInDiv() {  
    var gwc = "<table id='test' style='border:0px;' ><tr><td>商品名称</td><td  width='40%'>详情</td><td>单价(￥)</td><td>数量</td><td>小计</td><td>操作</td></tr>";  
    var OrderString = unescape(ReadOrderForm('24_OrderForm')); //获取cookies中的购物车信息  
    var strs = new Array(); //定义一个数组，用于存储购物车里的每一条信息  
    var OneOrder = "";  
    strs = OrderString.split("|"); //用|分割出购物车中的每个产品  
    for (i = 1; i < strs.length; i++) {  
        gwc += "<tr>";  
        OneOrder = strs[i].split("&");  
        for (a = 0; a < OneOrder.length; a++) {  
  
  
            if (a != 3) {  
                gwc += "<td>";  
                gwc += OneOrder[a];  
                gwc += "</td>";  
  
  
            }  
            else {  
                gwc += "<td id='dd'>";  
                gwc += "<input title='填写想购买的数量,请使用合法数字字符' style='width:40px;' id='Num" + i + "' type='text' onblur='javascript:EveryCount(" + i + ");' value='" + OneOrder[a] + "'>";  
                gwc += "</td>";  
            }  
        }  
        gwc += "<td>";  
        gwc += OneOrder[2] * OneOrder[3];  
        gwc += "</td>";  
        gwc += "<td>";  
        gwc += " <a href='#' onclick ='DelteData(this);'>删除</a>";  
        gwc += "</td>";  
        gwc += "</tr>";  
    }  
  
  
    gwc += "</table>";  
    $("#Cart").html(gwc);  
    TotalCount();  
}  
function DelteData(obj) {  
    var $this = $(obj);  
    $this.closest("tr").remove();  
    TotalCount();  
    updateOrderCookie(); //修改cookies中保存的数量  
}  
//<--End--将订单数据写入div  
//--Start--展开/收缩购物车  
function show(id) {  
    if (document.getElementById(id).style.display == "") {  
        document.getElementById(id).style.display = 'none';  
    }  
    else {  
        document.getElementById(id).style.display = '';  
    }  
  
  
}  
//<--End--展开/收缩购物车  
//<--Start--从cookie中读出订单数据的函数  
function ReadOrderForm(name) {  
    var cookieString = document.cookie;  
    if (cookieString == "") {  
        return false;  
    }  
    else {  
        var firstChar, lastChar;  
        firstChar = cookieString.indexOf(name);  
        if (firstChar != -1) {  
            firstChar += name.length + 1;  
            lastChar = cookieString.indexOf(';', firstChar);  
            if (lastChar == -1) lastChar = cookieString.length;  
            return cookieString.substring(firstChar, lastChar);  
        }  
        else {  
            return false;  
        }  
    }  
}  
//-->End  
//<--Start--添加商品至购物车的函数  
function SetOrderForm(item_no, item_name, item_amount, item_price) {  
  
  
    var cookieString = document.cookie;  
    if (cookieString.length >= 4000) {  
        alert("您的订单已满\n请结束此次订单操作后添加新订单！");  
    }  
    else if (item_amount < 1 || item_amount.indexOf('.') != -1) {  
        alert("数量输入错误！");  
    }  
    else {  
  
  
        var mer_list = ReadOrderForm('24_OrderForm');  
        var Then = new Date();  
        Then.setTime(Then.getTime() + 30 * 60 * 1000);  
        var item_detail = "|" + item_no + "&" + item_name + "&" + item_price + "&" + item_amount;  
        var i = IsRepeat(item_no);  
        if (i > 0 && mer_list.indexOf(escape(item_no)) != -1) {  
            var count = $("#Num" + i).val();  
            $("#Num" + i).val(parseInt(count) + 1);  
            EveryCount(i);  
            //                    alert("“" + item_name + "”\n" + "已经加入您的订单！");  
        }  
        else if (i == 0 && mer_list == false) {  
            document.cookie = "24_OrderForm=" + escape(item_detail) + ";expires=" + Then.toGMTString();  
            //                    alert("“" + item_name + "”\n" + "已经加入您的订单！");  
        }  
        else {  
            document.cookie = "24_OrderForm=" + mer_list + escape(item_detail) + ";expires=" + Then.toGMTString();  
            //                    alert("“" + item_name + "”\n" + "已经加入您的订单！");  
        }  
    }  
}  
//-->End  
//<--Start--修改数量后，更新cookie的函数  
function updateOrderCookie() {  
  
  
    var rowscount = $("#test tr").length;  
    var item_detail = "";  
    for (var i = 1; i <= parseInt(rowscount); i++) {  
  
  
        var d = $("#test tr").eq(i).find("td").eq(0).text();  
        var e = $("#test tr").eq(i).find("td").eq(1).text();  
        var f = $("#test tr").eq(i).find("td").eq(2).text();  
        var g = $("#test tr").eq(i).find("td").find("input[type='text']").val();  
  
  
        if (d != null && d != "NaN" && d != "" && e != null && e != "NaN" && e != "" && f != null && f != "NaN" && f != "" && g != null && g != "NaN" && g != "") {  
            item_detail += "|" + d + "&" + e + "&" + f + "&" + g;  
        }  
    }  
  
  
    var Then = new Date();  
    Then.setTime(Then.getTime() + 30 * 60 * 1000);  
    document.cookie = "24_OrderForm=" + escape(item_detail) + ";expires=" + Then.toGMTString();  
}  
//<--End--订单更新  
//<--清空购物车  
function clearOrder() {  
    var Then = new Date();  
    document.cookie = "24_OrderForm='';expires=" + Then.toGMTString();  
} 

$(function(){
	$("li:last","ul").click(function(){
		SetOrderForm($("li:eq(1)",$(this).parent()).text(),$("li:eq(2)",$(this).parent()).text(),'1',$("li:eq(3)",$(this).parent()).text());
		WriteOrderInDiv();
	})
	$("input[type='button']").click(function(){
		clearOrder();
		WriteOrderInDiv();
	})
})

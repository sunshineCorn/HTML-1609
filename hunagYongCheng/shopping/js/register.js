$(function(){
	
					var verify1=false;
					var verify2=false;
					var verify3=false;
					var verify4=false;
					$("input:eq(0)",".zhuce1").blur(function(){
						verify2=true;
						var pattern=/^[1][0-9]{10}$/g;
						var str=$(this).val();
						$("p:eq(0)",".zhuce1").css("display","block");
						$("p:eq(0)",".zhuce1").append("<i class='fa fa-check'></i>").css("color","green");
						$(this).parent().css({"border":"1px solid green","color":"green"});
						if(!pattern.test(str)){
							$("p:eq(0)",".zhuce1").text("请输入正确的手机号码").css("color","red");
							$(this).parent().css({"border":"1px solid red","color":"red"});
							verify2=false;
						}
					})
					$("input:eq(1)",".zhuce1").blur(function(){
						verify3=true;
						var pattern=/^[^' ']{6,12}$/;
						var str=$(this).val();
						$("p:eq(1)",".zhuce1").css("display","block");
						$("p:eq(1)",".zhuce1").append("<i class='fa fa-check'></i>").css("color","green");
						$(this).parent().css({"border":"1px solid green","color":"green"});
						if(!pattern.test(str)){
							$("p:eq(1)",".zhuce1").text("请输入正确的密码").css("color","red");
							$(this).parent().css({"border":"1px solid red","color":"red"});
							verify2=false;
						}
					})
					
					$("input:eq(2)",".zhuce1").blur(function(){
						verify1=true;
						$("p:eq(2)",".zhuce1").css("display","block");
						$("p:eq(2)",".zhuce1").append("<i class='fa fa-check'></i>").css("color","green");
						if(($(this).val() == $("input:eq(1)",".zhuce1").val() && $("input:eq(1)",".zhuce1").val() !="")){
							
						}else{
							$("p:eq(2)",".zhuce1").text("请输入相同密码").css("color","red");
							$(this).parent().css({"border":"1px solid red","color":"red"});
							verify1=false;
						}
					})
					$("input:eq(3)").blur(function(){
						verify4=true;
						console.log($(this).val())
						console.log($(".code").text())
						if($(this).val() == $(".code").html() && $(this).val() != ""){
							
						}else{
							$(this).parent().css({"border":"1px solid red","color":"red"});
							verify4=false;
						}
					})
					$(".code").click(function(){
						var scort=parseInt(Math.random()*9000+1000);
						$(this).html(scort);
						console.log($(".code").html())
					})
					$("input",".zhuce1").focus(function(){
						$("p",".zhuce1").text("");
						$("li:lt(4)",".zhuce1").css("border","1px solid #c5c5c5")
					})
					
					$("button").click(function(){
						if(verify1 && verify2 && verify3 && verify4){
							var d=new Date();
							d.setDate(d.getDate()+7);
							setCookie("username",$("input:eq(0)",".zhuce1").val(),d);
							setCookie("key",$("input:eq(1)",".zhuce1").val(),d);
							
							console.log(getCookie("key"))
							location.href="logo.html";
						}else{
							alert("请完善信息");
						}
						return false;
					})
//						
//					
//					
//			        $("input:eq(3)").blur(function(){
//			        	$("span").text("");
//			        	verify3=true;
//			        	var pattern=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//						var str=$(this).val();
//						if(!pattern.test(str)){
//							$(this).next().text("请输入正确的邮箱地址");
//							verify3=false;
//						}
//			        })
//						
//					
//					
//					
//						
//					
				$("li:first",".zhuce").click(function(){
					$(".wrap-content-left2").animate({
						left:"0",
					})
				});
				$("li:last",".zhuce").click(function(){
					$(".wrap-content-left2").animate({
						left:"-600px",
					})
				});
				
			})




	$(function(){
		$("#head").load("head.html");
		$("#footer").load("footer.html");
		
		
		//maotia
		$(".smallmaotai").mouseover(function(evt){
			$("img",".maotai").attr("src",$(evt.target).attr("src"));
		})
		
		
    	//放大功能
	  	$(".maotai").jqueryzoom({
		  xzoom: 500,//放大区域宽度
		  yzoom: 500,//放大区域高度
		  preload: 1,//是否显示预加载
		  offset:10,//放大区域偏离小图的距离
		  position: "right",//放大区域显示的位置（left,right）
		  lens:true //是否显示小图上的透明区域
	  });
  		
  		$("span",".distribution").hover(function(){
  			console.log("2333")
  			$(".address").css("display","block");
  			$(this).css("color","red");
  		},function(){
  			$(".address").css("display","none");
  			$(this).attr("style","color:black");
  		})
  		
		$("li","ul.chooce").hover(function(){
			$(this).css({"border":"1px solid red","color":"red"});
		},function(){
			$(this).css({"border":"1px solid #dfdfdf","color":"black"});
		})
		$("span:eq(1)","div.num1").click(function(){
			$("span:eq(0)",".num1").text(parseInt($("span:eq(0)",".num1").text())+1);
		})
		$("span:eq(2)","div.num1").click(function(){
			$("span:eq(0)",".num1").text(parseInt($("span:eq(0)",".num1").text())-1);
		})
		$(".second",".buy").click(function(){
			for(var i=0;i<parseInt($("span:eq(0)",".num1").text());i++){
				SetOrderForm("52度 茅台","经典原浆V15 1000ml",'1',"148");
			}
			alert("添加成功！");
		})
		
		//content-right
		$(document).scroll(function(){
			if($(document).scrollTop()>=$(".content1-right").offset().top){
			
			$(".nav1").css({"position":"fixed","top":"0"})
		}else{
			$(".nav1").css({"position":"static"});
		}
		})
		
		//comment
		var reply=true;
		$("button",".comment-right").click(function(){
			if(reply){
				$(".reply").css("display","block");
				reply=false;
			}else{
				$(".reply").css("display","none");
				reply=true;
			}
			
		})
		
		var page = function(_pageindex, _isgenerate){
				$.get('../litd/index - 副本.txt', {'_': Math.random(), page: _pageindex}, function(response){
					var obj = JSON.parse(response);
					var pageCount = obj.totalCount % obj.pageSize > 0 ? parseInt(obj.totalCount / obj.pageSize) + 1 :  parseInt(obj.totalCount / obj.pageSize)
					var pageFlag = '';
					if(!_isgenerate){
						return false;
					}
					for(var i = 1; i <= pageCount; i++){
						pageFlag += ('<span class="page1">' + i + '</span>');
					}
					
					$(pageFlag).appendTo('.page',"#comment");
					$("span:eq(0)",".page").click(function(){
						$("div").remove(".comment-left");
						$("div").remove(".comment-right");
						for(var i =0;i<obj.result.length/2;i++){
							$("#comment").append("<div class='comment-left'></div>");
							$("#comment").append("<div class='comment-right'></div>");
							$(".comment-right:last").append("<p class='p1'></p>");
							$(".comment-right:last").append("<p class='p2'></p>");
							$(".comment-right:last").append("<p class='p3'></p>");
							$(".comment-right:last").append("<button></button>");
							$(".comment-left:last").append("<img src="+obj.result[i].src+"/>");
							$(".comment-left:last").append("<p>"+obj.result[i].phone+"</p>")
							$(".comment-left:last").append("<p>"+obj.result[i].vip+"</p>");
							$(".p1:last").append("<span>"+obj.result[i].data+"</span>")
							$(".p1:last").append("<img src="+obj.result[i].start+"/>");
							$(".p2:last").text(obj.result[i].p2)
							$(".p3:last").text(obj.result[i].p3);
							$("button:last").text(obj.result[i].Button);
						}
					})
//						
//					
					$("span:eq(1)",".page").click(function(){
						$("div").remove(".comment-left");
						$("div").remove(".comment-right");
						for(var i =0,j=obj.result.length/2;i<obj.result.length/2;i++,j++){
							$("#comment").append("<div class='comment-left'></div>");
							$("#comment").append("<div class='comment-right'></div>");
							$(".comment-right:last").append("<p class='p1'></p>");
							$(".comment-right:last").append("<p class='p2'></p>");
							$(".comment-right:last").append("<p class='p3'></p>");
							$(".comment-right:last").append("<button></button>");
							$(".comment-left:last").append("<img src="+obj.result[j].src+"/>");
							$(".comment-left:last").append("<p>"+obj.result[j].phone+"</p>")
							$(".comment-left:last").append("<p>"+obj.result[j].vip+"</p>");
							$(".p1:last").append("<span>"+obj.result[j].data+"</span>")
							$(".p1:last").append("<img src="+obj.result[j].start+"/>");
							$(".p2:last").text(obj.result[j].p2)
							$(".p3:last").text(obj.result[j].p3);
							$("button:last").text(obj.result[j].Button);
						}
					})
					for(var i =0;i<obj.result.length/2;i++){
						$("#comment").append("<div class='comment-left'></div>");
						$("#comment").append("<div class='comment-right'></div>");
						$(".comment-right:last").append("<p class='p1'></p>");
						$(".comment-right:last").append("<p class='p2'></p>");
						$(".comment-right:last").append("<p class='p3'></p>");
						$(".comment-right:last").append("<button></button>");
						$(".comment-left:last").append("<img src="+obj.result[i].src+"/>");
						$(".comment-left:last").append("<p>"+obj.result[i].phone+"</p>")
						$(".comment-left:last").append("<p>"+obj.result[i].vip+"</p>");
						$(".p1:last").append("<span>"+obj.result[i].data+"</span>")
						$(".p1:last").append("<img src="+obj.result[i].start+"/>");
						$(".p2:last").text(obj.result[i].p2)
						$(".p3:last").text(obj.result[i].p3);
						$("button:last").text(obj.result[i].Button);
					}
					
				})
		}
		page(1,true);
		

	})

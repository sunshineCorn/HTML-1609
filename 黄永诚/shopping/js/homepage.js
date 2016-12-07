$(function(){
	
	//head
	
	
	//main
	$("div",".main-left").hover(function(){
		$(this).css({"background":"#fff"});
		$("i",this).css("color","#C40000");
		$(".main-left").css("overflow","visible")
		$("span",this).css({color:"black"});
		$("a",this).css({color:"black"});
		$(".specialLi",this).css({"background":"#C40000"})
		$(".specialA",this).css({"color":"#fff"});
	},function(){
		$(this).css({"background":"#C40000"});
		$("i",this).css("color","#fff");
		$(".main-left").css("overflow","hidden")
		$("span",this).css({color:"#fff"});
		$("a",this).css({color:"#fff"});
		$(".specialLi",this).css({"background":"#fff"})
		$(".specialA",this).css({"color":"#C40000"});
	})

	var count=0;
	function lunbo(){
		timer=setInterval(function(){
			count++;
			$("span",".chooce").css("background","black");
			$("span:contains("+count+")",".chooce").css("background","red");
			$(".main"+count).fadeOut(1000);
			$(".main"+(count+1)).fadeIn(1000);
			if(count==6){
				
				$(".main1").fadeIn(1000);
				$(".main6").fadeOut(1000);
				count=0;
			}
			
		},1000)
	}
		
		lunbo();
		$("span",".chooce").hover(function(){
			clearInterval(timer);
			$("span",".chooce").css("background","black");
			$(".main"+(count+1)).fadeOut(1000);
			$(this).css("background","red");
			$(".main"+$(this).text()).fadeIn(1000);
		},function(){
			$(".main"+$(this).text()).fadeOut(1000);
			$(this).css("background","black");
			count=$(this).text()==6 ?0:$(this).text()-1 ;
			console.log(count)
			lunbo();
		})
		
	//buyWine
	$("dl",".recommend").hover(function(){
		$(".fourst",this).animate({left:"65px"},300);
		console.log($(".fourst",this))
	},function(){
		$(".fourst",this).animate({left:"75px"},300);
	})
	
//	//floor
	$(".maotai-1").css('width',4*440+"px")
		function lunbo1(){
				timer1 = setInterval(function(){
				var left=parseInt($(".maotai-1").css("left"))-440;
				if(!(left<-440*3)){
					$($(".maotai-1")).animate({left:left},1000);
				}else{
					$(".maotai-1").css("left",0)
				}
				},2000)
		}
		lunbo1()
	$(".maotai-right").click(function(){
		clearInterval(timer1);
		var left=parseInt($(".maotai-1").css("left"))-440;
		if(!(left<-440*3)){
						$($(".maotai-1")).animate({left:left},1000);
					}else{
						$(".maotai-1").css("left",0)
					}
		lunbo1()
	})
	$(".maotai-left").click(function(){
		clearInterval(timer1);
		var left=parseInt($(".maotai-1").css("left"))+440;
		if(!(left>0)){
						$($(".maotai-1")).animate({left:left},1000);
					}else{
						$(".maotai-1").css("left",-440*3+"px")
					}
		lunbo1()
	})
	
	//floor5
	$("div",".goods").hover(function(){
		$("img",$(this)).animate({
			left:"-113px",
		},500);
	},function(){
		$("img",$(this)).animate({
			left:"0px",
		},500);
	})
	
	
	//floor6
			$("#common").load('head.html',function(){
				console.log(getCookie("logo"))
				if(getCookie("logo")){
					$(".kehu").css("display","block");
					removeCookie("logo")
				}
			})
			$("#footer").load('footer.html')
			var page = function(_pageindex, _isgenerate){
				$.get('../litd/index.txt', {'_': Math.random(), page: _pageindex}, function(response){
					var obj = JSON.parse(response);
					var pageCount = obj.totalCount % obj.pageSize > 0 ? parseInt(obj.totalCount / obj.pageSize) + 1 :  parseInt(obj.totalCount / obj.pageSize)
					var pageFlag = '';
					if(!_isgenerate){
						return false;
					}
					for(var i = 1; i <= pageCount; i++){
						pageFlag += ('<span>' + i + '</span>');
					}
					
					$(pageFlag).appendTo('.span',"#floor6");
					$("span:eq(0)",".span").click(function(){
						for(var i =0;i<obj.result.length/2;i++){
						console.log(obj.result[i].src)
						$("div:eq("+(i+2)+")","#floor6").append("<img src="+obj.result[i].src+"/>");
						}
					})
						
					
					$("span:eq(1)",".span").click(function(){
						for(var i =0,j=obj.result.length/2;i<obj.result.length;i++,j++){
						$("div:eq("+(i+2)+")","#floor6").append("<img src="+obj.result[j].src+"/>");
						}
					})
					for(var i =0;i<obj.result.length/2;i++){
						console.log(obj.result[i].src)
						$("div:eq("+(i+2)+")","#floor6").append("<img src="+obj.result[i].src+"/>");
					}
					
				})
			}
			page(1, true);
//			$('.span').on('click', function(evt){
////				console.log(evt)
////				page($("body").text());
//				
//			})

	
})
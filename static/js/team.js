var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', function($scope,$interval) {
	//Images Slider
	var imgWrapperEle=document.querySelector(".img-wrapper"); 
	var imgEles=document.querySelectorAll(".img-slide");
	var imgLayerEles=document.querySelectorAll(".img-layer");
	var imgDesEles=document.querySelectorAll(".img-des");
	var imgTitleEles=document.querySelectorAll(".img-title");
	var imgContentEles=document.querySelectorAll(".img-content");
	var imgTextEles=document.querySelectorAll(".img-text");
    var dotEles=document.querySelectorAll(".slider-dot");
    
	var setAllImgElesIdFun=function(){ 
		imgEles=document.querySelectorAll(".img-slide");
		angular.forEach(imgEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
			angular.element(value).addClass("animated");
		});

		imgLayerEles=document.querySelectorAll(".img-layer");
		angular.forEach(imgLayerEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
		});
		
		imgDesEles=document.querySelectorAll(".img-des");
		angular.forEach(imgDesEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
		});

		imgTitleEles=document.querySelectorAll(".img-title");
		angular.forEach(imgTitleEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
		});

		imgContentEles=document.querySelectorAll(".img-content");
		angular.forEach(imgContentEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
		});

		imgTextEles=document.querySelectorAll(".img-text");
		angular.forEach(imgTextEles, function(value,key){
			angular.element(value).attr("qb-img-id",key);
		});
	}
	var qbGetImgContentHeight=function(){
		angular.forEach(imgTextEles,function(value,key){
			var isImgActive=angular.element(imgEles[key]).hasClass("active-img");
			angular.element(imgEles[key]).addClass("active-img");
			angular.element(imgEles[key]).removeClass("inactive-img");
			

			angular.element(value).css("height","auto");
			var imgContentHeight=angular.element(value)[0].offsetHeight;
			angular.element(value).css("height","0px");
			angular.element(value).attr("qb-content-height",imgContentHeight);

			if(!isImgActive)
			{
				angular.element(imgEles[key]).removeClass("active-img");
				angular.element(imgEles[key]).addClass("inactive-img");
			}
		});
    }	
    
    angular.element(window).bind("resize",function(){
        qbGetImgContentHeight();
		setAllImgElesIdFun();
	})
	
    qbGetImgContentHeight();
    setAllImgElesIdFun();
    //MouseEnter
	$scope.qbHoverOnFun=function(event){
		var qbHoveredImgId=angular.element(event.target).attr("qb-img-id");
		
		angular.forEach(imgTextEles,function(value,key){
			var qbImgId=angular.element(value).attr("qb-img-id");
			if(qbImgId==qbHoveredImgId)
			{
				angular.element(value).addClass("fadeIn");
				var qbContentHeight=angular.element(value).attr("qb-content-height");
				angular.element(value).css("height",qbContentHeight+"px");
				angular.element(value).removeClass("fadeOut");
			}
		});
	}

	$scope.qbHoverOffFun=function(event){
		var qbHoveredImgId=angular.element(event.target).attr("qb-img-id");
		
		angular.forEach(imgTextEles,function(value,key){
			var qbImgId=angular.element(value).attr("qb-img-id");
			if(qbImgId==qbHoveredImgId)
			{
				angular.element(value).removeClass("fadeIn");
				angular.element(value).css("height","0px");
				angular.element(value).addClass("fadeOut");
			}
		});
	}

	//Slider function
	$scope.qbImgClickFun=function(){
	};
});

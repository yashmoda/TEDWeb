var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', function($scope,$interval,qbBasics,$http,$compile) {
    var picCoverEles;
    //editing
    var speakerDesEles=[];

    $http.get("/speaker/previous_speakers").then(function(previous_speakers){
        angular.forEach(previous_speakers.data.speaker_details,function(speaker_details,key){
            var picCover=$compile(angular.element("<div class=\"pic-bg norm\">    <div class=\"pic-cover\" speaker-id="+key+">   <div class=\"pic-img\" style=\"background-image:url('"+speaker_details.image+"')\"> </div>  <div class=\"pic-des\">  <div class=\"card-title\"><b> "+speaker_details.name+"</b></div> <div class=\"card-text\"> "+speaker_details.domain+"  <br> </div>    </div>    </div>    </div>"))($scope);
            speakerDesEles[key]=$compile(angular.element("<div class=\"speaker-img img-cover\" style=\"background-image:url('"+speaker_details.image+"')\"> </div>   <div class=\"speaker-des\"> <div class=\"speaker-name\">"+speaker_details.name+"</div>  <div class=\"speaker-details\">"+speaker_details.description+"</div>   <a href=\""+speaker_details.previous_talk_link+"\"> Watch the TED<sup>x</sup> Talk</a>     </div>"))($scope);
            angular.element(document.querySelector("#speaker_details")).append(picCover);
        });

        picCoverEles=document.querySelectorAll(".pic-cover");
        picCoverElesLoadFun();
    });

    var openTextDesFun=function(picCover){
        window.setTimeout(function(){
            if(angular.element(picCover).parent().hasClass("large"))
                angular.element(picCover.querySelector(".card-text")).css("display","block");
        },500)
    }

    var closeTextDesFun=function(picCover){
        angular.element(picCover.querySelector(".card-text")).css("display","none");

    }

    var speakerDetailsModal=angular.element(document.querySelector("#speaker_data"));
    $scope.speakerModalCloseFun=function(){
        angular.element(speakerDetailsModal.children().children()[1]).empty();
        speakerDetailsModal.css("display","none");
    }
    var picCoverElesLoadFun=function(){

        angular.forEach(picCoverEles,function(picCoverEle,key){
        angular.element(picCoverEle).attr("speaker-id",key);
        angular.element(picCoverEle).bind("mouseenter",function(event){
            if(window.innerWidth>600)
            {
                var speakerId=qbBasics.findParentByClassName(event.target,"pic-cover").attr("speaker-id");
                var alignId=qbBasics.findParentByClassName(event.target,"pic-bg").attr("align-id");
                angular.forEach(picCoverEles,function(picCover,keyNum){
                    if(alignId==angular.element(picCover).parent().attr("align-id"))
                    {
                        angular.element(picCover).parent().removeClass("norm");
                        if(keyNum==speakerId)
                        {
                            angular.element(picCover).parent().addClass("large");
                            angular.element(picCover).parent().removeClass("small");
                            openTextDesFun(picCover);
                        }
                        else
                        {
                            angular.element(picCover).parent().removeClass("large");
                            angular.element(picCover).parent().addClass("small");
                        }
                    }
                })
            }
        });

        angular.element(picCoverEle).bind("mouseleave",function(event){
            if(window.innerWidth>600)
            {
                var speakerId=qbBasics.findParentByClassName(event.target,"pic-cover").attr("speaker-id");
                angular.forEach(picCoverEles,function(picCover,keyNum){
                    closeTextDesFun(picCover)
                    angular.element(picCover).parent().addClass("norm");
                    angular.element(picCover).parent().removeClass("large");
                    angular.element(picCover).parent().removeClass("small");
                })
            }
        });


        //editing
        angular.element(picCoverEle).bind("click",function(event){
            var speakerId;
            if(angular.element(event.target).hasClass("pic-cover"))
            {
                speakerId=angular.element(event.target).attr("speaker-id");
            }
            else
            {
                var picCoverTarget=qbBasics.findParentByClassName(event.target,"pic-cover");
                speakerId=angular.element(picCoverTarget).attr("speaker-id");
            }

            if(speakerId)
            {
                angular.element(speakerDetailsModal.children().children()[1]).append(speakerDesEles[speakerId]);
                speakerDetailsModal.css("display","block");
            }
        });

        closeTextDesFun(picCoverEle);
    });
    }

    angular.element(window).bind("scroll",function(event){
        if(window.innerWidth<600)
        {
            var activeKey=0;
            angular.forEach(picCoverEles,function(picCover,key){
                if((picCover.getBoundingClientRect().top+picCover.getBoundingClientRect().height)<window.innerHeight*0.9)
                {
                    activeKey=key;
                }

            });

            angular.forEach(picCoverEles,function(picCover,picCoverKey){
                if(picCoverKey==activeKey)
                {
                    angular.element(picCover).parent().addClass("large");
                    angular.element(picCover).parent().removeClass("norm");
                    openTextDesFun(picCover);
                }
                else
                {
                    angular.element(picCover).parent().addClass("norm");
                    angular.element(picCover).parent().removeClass("large");
                    closeTextDesFun(picCover);
                }
            });
        }
    });


    angular.element(window).bind("resize",function(){
        qbAlignIdSetFun();
    });
    var qbAlignIdSetFun=function(){

        var offSetTop=angular.element(picCoverEles[0]).parent()[0].offsetTop;
        var alignId=0;
        angular.forEach(picCoverEles,function(picCover,key){
            if(angular.element(picCover).parent()[0].offsetTop==offSetTop)
            {
                angular.element(picCover).parent().attr("align-id",alignId);
            }
            else
            {
                offSetTop=angular.element(picCover).parent()[0].offsetTop;
                alignId++;
                angular.element(picCover).parent().attr("align-id",alignId);
            }
        });
    }

    angular.element(document).ready(function(){
        qbAlignIdSetFun();
    });

    var applyForm=angular.element(document.querySelector("#applyForm"));

    var setModalFormPaddingFun=function(){
        var qbTop=(parseFloat(window.getComputedStyle(applyForm[0], null).getPropertyValue('height'))-parseFloat(window.getComputedStyle(applyForm.children()[0], null).getPropertyValue('height')))/2;
        applyForm.attr("qb-top",qbTop);
        var qbLeft=(parseFloat(window.getComputedStyle(applyForm[0], null).getPropertyValue('width'))-parseFloat(window.getComputedStyle(applyForm.children()[0], null).getPropertyValue('width')))/2;
        applyForm.attr("qb-left",qbLeft);
    }

    setModalFormPaddingFun();

    $scope.modalOpenFun=function(){
        applyForm.css("display","block");
    }

    $scope.modalCloseFun=function(){
        applyForm.css("display","none");
    }
    applyForm.bind("click",function(event){
        if(angular.element(event.target).hasClass("modal"))
        {
            $scope.modalCloseFun();
        }
    });
});
myApp.service('qbBasics',qbBasics);
qbBasics.$inject=['$compile'];
function qbBasics($compile)
{
    this.classCons= function (classes) {
        var allClass=classes.split(',');
        var classL="";
        var k=0;
        angular.forEach(allClass, function(value, key){
            if(!(classL))
                classL=allClass[k];
            else
                classL=classL+" "+allClass[k];
            k++;
        });
        return classL;
    }
    this.findParent=function(pElement,pName){
        var par=pElement.parent();
        var con=true;
        var parName=pName.toUpperCase();
        var reqElement;
        while(con)
        {
            if((par[0].nodeName)===parName)
            {
                reqElement=par;
                con=false;
            }
            else if((par[0].nodeName)==="BODY")
            {
                con=false;
                reqElement=undefined;
            }
            else
                par=par.parent();
        }
        if(reqElement===undefined)
            alert("Undefined Parent Name");
        return reqElement;
    }
    this.findParentByClassName=function(pElement,pClassName){
        var par=angular.element(pElement).parent();
        var con=true;
        var reqElement;
        while(con)
        {
            if(par.hasClass(pClassName))
            {
                reqElement=par;
                con=false;
            }
            else if((par[0].nodeName)==="BODY")
            {
                con=false;
                reqElement=undefined;
            }
            else
                par=par.parent();
        }
        return reqElement;
    }
    this.findChildren=function(cElement,cName){
        var child=cElement.children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(cName.toUpperCase()))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }
    this.findElement=function(eName){
        var qbContainer=angular.element(document.querySelector(eName));
        var con=true;
        var found=false;
        var reqElement;
        /*var child=qbContainer.children();
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(eName.toUpperCase()))
                    {
                       reqElement=child[i];
                        found=true;
                    }
                    i++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();
                }
            }
            else
            {
                con=false;
                alert("Undefined Element NodeName");
            }
        }*/
        return qbContainer;
    }

    this.findQbChildren=function(eObject){
        var child=eObject.children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    var childName=angular.element(value)[0].nodeName;
                    if(((childName[0])==="Q")&&((childName[1])==="B")&&((childName[2])==="-"))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }

    this.isQbType=function(eName){
        var eleName=angular.element(eName)[0].nodeName;
        if(((eleName[0])==="Q")&&((eleName[1])==="B")&&((eleName[2])==="-"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    this.contentsAlign=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contsHeight=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }

            else if(hAlign==="middle")
            {
                if(widthType==="responsive")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                var paddingPer=(paddingWidth/parentWidth)*100;
	                angular.element(elem).css("padding-left",paddingPer+"%");
	                angular.element(elem).css("padding-right",paddingPer+"%");
	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var widthPer=(contsWidth[i]/totalWidth)*100;
	                    angular.element(vCont).css("width",widthPer+"%");
	                    i++;
	                });
                }
                else if(widthType==="static")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                angular.element(elem).css("padding-left",paddingWidth+"px");
	                angular.element(elem).css("padding-right",paddingWidth+"px");
                }
            }

            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }

        if(vAlign)
        {
            if(vAlign==="top")
            {

            }
            else if(vAlign==="centre")
            {
                if(heightType==="responsive")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
    	                contsHeight[i]=thisHeight;
    	                if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
    	                i++;
	                });

	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                var paddingPer=(paddingHeight/parentHeight)*100;
	                angular.element(elem).css("padding-top",paddingPer+"%");
	                angular.element(elem).css("padding-bottom",paddingPer+"%");

	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var heightPer=(contsHeight[i]/lHeight)*100;
	                    angular.element(vCont).css("height",heightPer+"%");
	                    i++;
	                });
                }
                else if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {

            }
        }
    }

    this.contentsAlignResize=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }

            else if(hAlign==="middle")
            {
                if(hAlign==="middle")
	            {
	                if(widthType==="static")
	                {
	                    if(contentsTotalWidth)
	                    {
	                        var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                        var paddingWidth=(parentWidth-contentsTotalWidth)/2;
                            angular.element(elem).css("padding-left",paddingWidth+"px");
    		                angular.element(elem).css("padding-right",paddingWidth+"px");
	                    }
	                }
	            }
            }

            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }

        if(vAlign)
        {
            if(vAlign==="top")
            {

            }
            else if(vAlign==="centre")
            {
                if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {

            }

        }
    }

    this.compile=function(ele){
        var scope=angular.element(document.querySelector("qb-compile")).children().scope().qbCompileFun();
        var qbCompileEle=$compile(ele)(scope);
        return qbCompileEle;
    }

    this.setInnerWidth=function(ele,outterWidth){
        var cont=angular.element(ele)[0];

        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));

        var innerWidth=outterWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        cont.style.width=innerWidth+"px";
	}

	this.getRespPercents=function(ele,outterWidth){
		var cont=angular.element(ele)[0];

		var thisPaddingLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left')))/outterWidth;
		var thisPaddingRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right')))/outterWidth;
		var thisMarginLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left')))/outterWidth;
		var thisMarginRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right')))/outterWidth;
		var thisBorderLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left')))/outterWidth;
		var thisBorderRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right')))/outterWidth;

		var thisInnerWidth=1-(thisPaddingLeftPer+thisPaddingRightPer+thisMarginLeftPer+thisMarginRightPer+thisBorderLeftPer+thisBorderRightPer);

		return {
			paddingLeft: thisPaddingLeftPer,
			paddingRight: thisPaddingRightPer,
			marginLeft: thisMarginLeftPer,
			marginRight: thisMarginRightPer,
			borderLeft: thisBorderLeftPer,
			borderRight: thisBorderRightPer,
			innerWidth: thisInnerWidth
		}
	}

	this.setRespPercents=function(ele,outterWidth,respPercents){
		var cont=angular.element(ele)[0];

		angular.element(cont).css('padding-left',(respPercents.paddingLeft*outterWidth)+"px");
		angular.element(cont).css('padding-right',(respPercents.paddingRight*outterWidth)+"px");
		angular.element(cont).css('border-left',(respPercents.borderLeft*outterWidth)+"px");
		angular.element(cont).css('border-right',(respPercents.borderRight*outterWidth)+"px");
		angular.element(cont).css('margin-left',(respPercents.marginLeft*outterWidth)+"px");
		angular.element(cont).css('margin-right',(respPercents.marginRight*outterWidth)+"px");
		angular.element(cont).css('width',(respPercents.innerWidth*outterWidth)+"px");
	}

    this.getOutterWidth=function(ele){
        var cont=angular.element(ele)[0];

        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));
        var thisWidth=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('width'));

        var outterWidth=(thisWidth+thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        return outterWidth;
    }
}
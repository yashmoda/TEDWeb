var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', function($scope,$interval,$http) {
    var numOfImgs=0;
    var numOfImgsFromBackend;
    var portPics=[];
    var landPics=[];
    var qbGalleryImgProps=[];
    var numOfLanscapeWraps=0;
    var numOfPortraitWraps=0;
    var galleryPicsWrapContainer=angular.element(document.querySelector(".gallery-pics-wrap-container"));
    qbAllImgsLoadedFun=function(){
        galleryPicsWrapContainer.empty();
        var numOfPortraits=0;
        var numOfLandscapes=0;
        
        if(window.innerWidth<=600)
        {
            numOfPortraits=2;
            numOfLandscapes=1;

            numOfPortraitWraps=parseInt(portPics.length/numOfPortraits)+1;
            numOfLanscapeWraps=parseInt(landPics.length/numOfLandscapes)+1;
        }
        else if(window.innerWidth<=800)
        {
            numOfPortraits=3;
            numOfLandscapes=2;

            numOfPortraitWraps=parseInt(portPics.length/numOfPortraits)+1;
            numOfLanscapeWraps=parseInt(landPics.length/numOfLandscapes)+1;
        }
        else if(window.innerWidth<=1200)
        {
            numOfPortraits=4;
            numOfLandscapes=3;

            numOfPortraitWraps=parseInt(portPics.length/numOfPortraits)+1;
            numOfLanscapeWraps=parseInt(landPics.length/numOfLandscapes)+1;
        }
        else
        {
            numOfPortraits=5;
            numOfLandscapes=4;

            numOfPortraitWraps=parseInt(portPics.length/numOfPortraits)+1;
            numOfLanscapeWraps=parseInt(landPics.length/numOfLandscapes)+1;
        }

        var flagForWraps=1;
        var leftPort=portPics.length;
        var leftLand=landPics.length;
        var indexForPort=0;
        var indexForLand=0;
        for(var wrap=0; wrap<(numOfPortraitWraps+numOfLanscapeWraps); wrap++)
        {
            if(flagForWraps)
            {
                if(leftPort>0)
                {
                    var galleryPicsWrapsPortraitELe=angular.element("<div class=\"gallery-pics-wrap-portrait\"></div>");
                    galleryPicsWrapContainer.append(galleryPicsWrapsPortraitELe);
                    for(var picNum=0; picNum<numOfPortraits; picNum++)
                    {
                        var qbGalleryWrapWidth=parseFloat(window.getComputedStyle(galleryPicsWrapsPortraitELe[0], null).getPropertyValue('width'))-parseFloat(window.getComputedStyle(galleryPicsWrapsPortraitELe[0], null).getPropertyValue('padding-right'))-parseFloat(window.getComputedStyle(galleryPicsWrapsPortraitELe[0], null).getPropertyValue('padding-left'));
                        var qbGalleryImgWidth=qbGalleryWrapWidth*0.99/numOfPortraits;
                        var qbGalleryImgHeight=qbGalleryImgWidth*4/3;

                        var qbGalleryImgOrgRatio=qbGalleryImgProps[portPics[indexForPort].attr("qb-gallery-pic-id")].orgRatio;
                        if(qbGalleryImgOrgRatio<(4/3))
                        {
                            portPics[indexForPort].children().children().attr("height",qbGalleryImgHeight);
                            var leftValueForImg=((qbGalleryImgHeight/qbGalleryImgOrgRatio)-qbGalleryImgWidth)/2;
                            portPics[indexForPort].children().children().css("left","-"+leftValueForImg+"px");
                        }
                        else
                        {
                            portPics[indexForPort].children().children().attr("width",qbGalleryImgWidth);
                            var topValueForImg=((qbGalleryImgWidth*qbGalleryImgOrgRatio)-qbGalleryImgHeight)/2;
                            portPics[indexForPort].children().children().css("top","-"+topValueForImg+"px");
                        }
                        portPics[indexForPort].children().css("height",qbGalleryImgHeight+"px");
                        portPics[indexForPort].children().css("width",qbGalleryImgWidth+"px");
                        galleryPicsWrapsPortraitELe.append(portPics[indexForPort]);
                        indexForPort++;
                        if(indexForPort==portPics.length)
                        {
                            break;
                        }
                    }

                    leftPort-=numOfPortraits;
                }
                if(leftLand>0)
                {
                    flagForWraps=0;
                }
            }
            else
            {
                if(leftLand>0)
                {
                    var galleryPicsWrapsLandscapeEle=angular.element("<div class=\"gallery-pics-wrap-landscape\"></div>");
                    galleryPicsWrapContainer.append(galleryPicsWrapsLandscapeEle);
                    for(var picNum=0; picNum<numOfLandscapes; picNum++)
                    {
                        var qbGalleryWrapWidth=parseFloat(window.getComputedStyle(galleryPicsWrapsLandscapeEle[0], null).getPropertyValue('width'))-parseFloat(window.getComputedStyle(galleryPicsWrapsLandscapeEle[0], null).getPropertyValue('padding-right'))-parseFloat(window.getComputedStyle(galleryPicsWrapsLandscapeEle[0], null).getPropertyValue('padding-left'));
                        var qbGalleryImgWidth=qbGalleryWrapWidth*0.99/numOfLandscapes;
                        var qbGalleryImgHeight=qbGalleryImgWidth*3/4;

                        var qbGalleryImgOrgRatio=qbGalleryImgProps[landPics[indexForLand].attr("qb-gallery-pic-id")].orgRatio;
                        if(qbGalleryImgOrgRatio<0.75)
                        {
                            var leftValueForImg=((qbGalleryImgHeight/qbGalleryImgOrgRatio)-qbGalleryImgWidth)/2;
                            landPics[indexForLand].children().children().css("left","-"+leftValueForImg+"px");
                            landPics[indexForLand].children().children().attr("height",qbGalleryImgHeight);
                        }
                        else
                        {
                            var topValueForImg=((qbGalleryImgWidth*qbGalleryImgOrgRatio)-qbGalleryImgHeight)/2;
                            landPics[indexForLand].children().children().css("top","-"+topValueForImg+"px");
                            landPics[indexForLand].children().children().attr("width",qbGalleryImgWidth);
                        }

                        landPics[indexForLand].children().css("height",qbGalleryImgHeight+"px");
                        landPics[indexForLand].children().css("width",qbGalleryImgWidth+"px");
                        galleryPicsWrapsLandscapeEle.append(landPics[indexForLand]);
                        indexForLand++;
                        if(indexForLand==landPics.length)
                        {
                            break;
                        }
                    }

                    leftLand-=numOfLandscapes;
                }
                if(leftPort>0)
                {
                    flagForWraps=1;
                }
            }
        }
    }
    qbAllImgLoadCheckFun=function(){
        numOfImgs++;
        if(numOfImgs==numOfImgsFromBackend)
        {
            qbAllImgsLoadedFun()
        }
    }
    var galleryPicEles=[];

    $http.get("/gallery/gallery_feed/").then(function(gallery_data){
        angular.forEach(gallery_data.data.image_feed,function(imageFeed,key){
            var tempEle=angular.element("<div class=\"gallery-pic-cover\">   <div class=\"gallery-pic\">   <img  src=\""+imageFeed.image+"\" alt=\"Tedx NIT Raipur\">    </div>    </div>");
            galleryPicEles.push(tempEle);
        });
        qbGalleryLoadFun();
    });
    qbGalleryLoadFun=function(){
        numOfImgsFromBackend=galleryPicEles.length;
        angular.forEach(galleryPicEles,function(galleryPicEle,eleKey){
            //Adding id to it;
            galleryPicEle.attr("qb-gallery-pic-id",eleKey);
            galleryPicEle.children().children()[0].addEventListener("load",function(event){
                if(event.target.height>event.target.width)
                {
                    angular.element(event.target).parent().parent().attr("qb-gallery-pic-type","portrait");
                    portPics.push(angular.element(event.target).parent().parent());
                }
                else
                {
                    angular.element(event.target).parent().parent().attr("qb-gallery-pic-type","landscape");
                    landPics.push(angular.element(event.target).parent().parent());
                }
                var qbGalleryImgOrgRatio=event.target.height/event.target.width;
                var qbGalleryImgOrgHeight=event.target.height;
                var qbGalleryImgOrgWidth=event.target.width;

                var qbGalleryImgProp={
                    orgRatio:qbGalleryImgOrgRatio,
                    orgHeight:qbGalleryImgOrgHeight,
                    orgWidth:qbGalleryImgOrgWidth
                }
                qbGalleryImgProps[angular.element(event.target).parent().parent().attr("qb-gallery-pic-id")]=qbGalleryImgProp;
                qbAllImgLoadCheckFun()
            });
        });
    }

    angular.element(window).bind("resize",function(){
        qbAllImgsLoadedFun();
    });
    
});

//<div class=\"gallery-pic-cover\">   <div class=\"gallery-pic\">   <img  src=\"images/pic1.jpg\" alt=\"Tedx NIT Raipur\">    </div>    </div>

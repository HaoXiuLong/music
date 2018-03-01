(function($,root){
    var $scope = $(document.body);
    

    function renderInfo(info){
        var html = '<h3 class="song">'+ info.song +'</h3>'+
        '<h4 class="singer">——' + info.singer + '——</h4>'+
        '<h4 class="album">'+ info.album + '</h4>';

        $scope.find(".info").html(html);
    }
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            $scope.find(".song-img img").attr("src",src);
            root.blurImg(img,$scope);
        }
        img.src=src;
    }
    function isLike(like){
        if(like == true){
            $scope.find(".like").addClass("love");
        }else{
            $scope.find(".like").removeClass("love");
        }
    }

    root.render = function(data){
        renderInfo(data);
        renderImg(data.image);
        isLike(data.isLike);
    }
}(window.Zepto,window.player))
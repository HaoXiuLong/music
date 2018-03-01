var root = window.player;
var render = root.render;
var $ =window.Zepto;
var $scope = $(document.body);
var index = 0;
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var proccessor = root.proccessor;
var playlist = root.playlist;


function bindTouch(){
    var $sliderpoint = $scope.find(".point");
    var offset = $scope.find(".proccess").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderpoint.on("touchstart",function(){
        proccessor.stopPro();
    }).on("touchmove",function(e){
        var x =e.changedTouches[0].clientX;
        var percent = (x - left)/width;
        if(percent > 1 ||percent < 0){
            percent = 0;
        }
        proccessor.update(percent);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        proccessor.startPro(percent);
        var time = percent * songList[controlmanager.index].duration;
        audiomanager.jumptoplay(time);
        $scope.find(".play").addClass("playing");
    })
}
function bindClick(){
    $scope.on("play:change",function(event,index,flag){
        var song = songList[index];
        render(song);
        audiomanager.setAudioSource(song.audio);
        if(audiomanager.status == "play" || flag){
            audiomanager.play();
            proccessor.startPro();
        }
        proccessor.renderAllTime(song.duration);
        proccessor.update(0);
     })
    $scope.find(".play").on("click",function(){
        if(audiomanager.status == "play"){
            audiomanager.pause();
            proccessor.stopPro();
            // $scope.find(".play").removeClass("playing");
        } 
        else{
            audiomanager.play();
            proccessor.startPro();
            // $scope.find(".play").addClass("playing");
        }
        $scope.find(".play").toggleClass("playing");
    })
    $scope.find(".prev").on("click",function(){
        var index = controlmanager.prev();
        $scope.trigger("play:change",[index]);
    })
    $scope.find(".next").on("click",function(){
        var index = controlmanager.next();
        $scope.trigger("play:change",[index]);
    })  
    $scope.find(".list").on("click",function(){
        playlist.show(controlmanager);
    })   
}

function successFn(data){
    console.log(data);
    songList = data;
    proccessor.renderAllTime(songList[index].duration);
    controlmanager = new root.controlManager(data.length); 
    audiomanager.setAudioSource(songList[index].audio);
    playlist.renderList(data);
    bindClick();
    bindTouch();
    $scope.trigger("play:change",0);    
}

function getData(url){
    $.ajax({
        type: "GET",
        url: url,
        success:successFn
    })
}
getData("/mock/data.json");


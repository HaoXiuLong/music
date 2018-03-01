(function($,root){
    var $scope = $(document.body);
    var  curDuration;
    var frameId;
    var startTime;
    var lastPersent = 0;
    function formateTime(duration){
        duration  = Math.floor(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(second  < 10){
            second = "0" + second;
        }
        if(minute < 10){
            minute = "0" + minute;
        }
        return minute + ":"+ second;
        
    }
    function renderAllTime(duration){
        curDuration = duration;
        var allTime = formateTime(duration);
        $scope.find(".totaltime").html(allTime);
    }
    function update(percent){
        var curTime = percent * curDuration;
        curTime = formateTime(curTime);
        $scope.find(".autotime").html(curTime);
        renderPro(percent);
    }
    function renderPro(percent){
        var percentage = (percent - 1) *100 + "%";
        $scope.find(".dark").css({
            transform : "translateX("+percentage+")"
        })
    }
    function startPro(percentage){
        percentage ? lastPersent=percentage:lastPersent;
        startTime =new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPersent +  Math.floor(curTime - startTime)/(curDuration*1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }
            else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stopPro(){
        
        var stop = new Date().getTime();
        lastPersent += (stop - startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId);
    }
    root.proccessor = {
        renderAllTime : renderAllTime,
        startPro:startPro,
        stopPro,
        update

    }
}(window.Zepto,window.player))
//封裝一個手風琴方法 方法名為accrd 給他兩參數

//參數1 顏色數組 , 參數2 鼠標移入後兄弟寬度
$.fn.accrd = function(colorArr,newW){

    //若沒有傳寬度 就給他一個默認值20
    var newW = newW || 20

    //若沒有傳顏色數組 就給他默認為空
    var colorArr = colorArr || null

    //把原本對象保存起來
    var jq = this

    //為了避免多次重新獲取對象的li 這裏先定義li為$li
    var $li = jq.find('li')

    //把原本li的寬度大小保存起來
    var originW = $li.width()
    
    //如果有顏色數組 就用each循環改變其背景色
    if(colorArr!==null){
        $li.each(function (i, e) {
            $(e).css('backgroundColor', colorArr[i])
        })
    }

    //在滑鼠移入事件中 把參數2傳進去 稍後用e.data獲取
    $li.on('mouseenter',newW,function(e){

        //這裏計算鼠標移入的當前li寬度為： 取整[最外層盒子的寬度 減去 (參數2*(li總數-1))]
        var bigW = parseInt(jq.width() - (e.data * ($li.length - 1)))

        //然後讓鼠標移入的li動畫改變寬度為計算出來的bigW 其他兄弟動畫改變寬度為參數2(就是這裏的e.data)
        $(this).stop().animate({width:bigW}).siblings().stop().animate({width:e.data})
    })

    //在鼠標移出事件中 把原本li的寬度(originW)傳進去 稍後用e.data獲取
    $li.on('mouseleave',originW, function (e) {

        //把所有li動畫改變成原本li的寬度(就是originW 也是e.data)
        $li.stop().animate({ width: e.data })
    })
}
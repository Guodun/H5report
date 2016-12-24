var H5ComponentPolyline = function ( name ,cfg ) {
    var component = new H5ComponentBase( name ,cfg );
    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布（网格线背景）,背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append( cns);

    var drawBoard = function () {
        // 水平网格线， 100份  -> 10份
        var step = 10;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#AAAAAA";

        window.ctx = ctx;
        for( var i=0; i<step+1; i++){
            var y = (h/step) * i;

            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
        }

        // 垂直网格线(根据项目的个数去分)
        var stepy = cfg.data.length+1;
        for( var i=0; i<stepy+1; i++){
            var x = (w/stepy) * i;
            ctx.moveTo(x,0);
            ctx.lineTo(x,y);
        }
        ctx.stroke();
    };

    // 输入项目文本
    var AddBoardText =function () {
        var stepy = cfg.data.length+1;
        var text_w = w/stepy >> 0;
        for( var i=0; i<stepy+1; i++){
            var x = (w/stepy) * i;
            // 输入项目文本
            if (cfg.data[i] ){
                var text =$('<div class="text">');
                text.text( cfg.data[i][0] );
                text.css('width',text_w/2).css('left', (x/2 - text_w/4) + text_w/2);
                component.append(text);
            }
        }
    };

    drawBoard();
    AddBoardText();

    // 加入画布-数据层
    var cns2 = document.createElement('canvas');
    var ctx2 = cns.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;

    /**
     * 绘制折线以及对应的数据喝阴影
     * @param {[floot]} 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return {[DOM]}
     */

    var draw;
    draw = function (per) {
        // 清空画布
        ctx2.clearRect(0,0,w,h);

        drawBoard();

        //绘制折线数据
        ctx2.beginPath();
        ctx2.lineWidth = 3;
        ctx2.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;
        var pointDataX = [];
        var pointDataY = [];

        // 画点
        for (i in cfg.data) {
            var item = cfg.data[i];

            x = (w / (cfg.data.length + 1)) * i + (w / (cfg.data.length + 1));
            y = h -(item[1]*h*per);

            pointDataX.push(x);
            pointDataY.push(y);


            ctx2.moveTo(x, y);
            ctx2.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //连线
        // 移动画笔到第一个数据的点位
        ctx2.moveTo(pointDataX[0], pointDataY[0]);
        for (var i = 0; i < pointDataY.length - 1; i++) {
            ctx2.lineTo(pointDataX[i + 1], pointDataY[i + 1])
        }
        ctx2.stroke();

        // 绘制阴影
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = 'rgba(255, 136, 120, 0)';
        ctx2.lineTo(x, h);
        ctx2.lineTo(pointDataX[0], h);
        ctx2.fillStyle = 'rgba(255, 136, 120, 0.2)';
        ctx.fill();

        // 写数据
        for (i in cfg.data) {
            var item = cfg.data[i];

            x = (w / (cfg.data.length + 1)) * i + (w / (cfg.data.length + 1));
            y = h -(item[1]*h*per);


            ctx2.fillStyle = item[2] ? item[2] : "#595959";

            ctx2.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10);
        }

        ctx2.stroke();

        component.append(cns2);
    };


    component.on('onLoad', function () {
        //折现图生长动画
        var s = 0;
        for( var i = 0; i < 100; i++){
            setTimeout(function () {
                s+=0.01;
                draw(s);
            },i*10)
        }
    });

    component.on('onLeave', function () {
        //折现图生长动画
        var s = 1;
        for( var i = 0; i < 100; i++){
            setTimeout(function () {
                s-=0.01;
                draw(s);
            },i*10)
        }
    });

    return component;
};

// 饼图组件对象

var H5ComponentPie = function ( name, cfg ) {
    var component = new H5ComponentBase( name, cfg );

    // 绘制背景层画布
    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = w;
    cns.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    var r = w/2;
    // 加入一个底图层
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.lineWidth =1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();

    //绘制一个数据层
    var dataCns = document.createElement('canvas');
    var dataCtx = dataCns.getContext('2d');
    dataCns.width = w;
    dataCns.height = h;
    $(dataCns).css('zIndex', 2);
    component.append(dataCns);

    var colors = ['red','green','blue','orange','gray']; // 备用颜色
    var sAngel = 1.5 * Math.PI; // 设置开始的角度在 12 点位置
    var eAngel = 0; // 结束角度
    var aAngel = Math.PI*2; // 100%的圆结束的角度 2pi = 360


    // dataCtx.beginPath();
    // dataCtx.fillStyle='red';
    // dataCtx.strokeStyle= 'red';
    // dataCtx.lineWidth =1;
    // dataCtx.moveTo(r,r);
    // dataCtx.arc(r,r,r,sAngel,aAngel);
    // dataCtx.fill();
    // dataCtx.stroke();


    var step = cfg.data.length;

    for(var i = 0; i < step; i++){
        var item  = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());
        eAngel = sAngel + aAngel *item[1];

        dataCtx.beginPath();
        dataCtx.fillStyle=color;
        dataCtx.lineWidth =1;
        dataCtx.moveTo(r,r);
        dataCtx.arc(r,r,r,sAngel,eAngel);
        dataCtx.fill();

        sAngel = eAngel;

        // 加入所有的项目文本和百分比
        var text = $('<div class="text">');
        text.text(item[0]);

        var per = $('<div class="per">');
        per.text(item[1]*100 + '%');
        text.append(per);
        component.append(text);

        var x = r + Math.sin( 0.5 * Math.PI - sAngel ) * r;
        var y = r + Math.cos( 0.5 * Math.PI - sAngel ) * r;



        if(x > w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }

        if(y > h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }
        if(item[2]){
            text.css('color',item[2]);
        }
        text.css('opacity', 0);

    }

    // 加入一个蒙板层
    var maskCns = document.createElement('canvas');
    var maskCtx = maskCns.getContext('2d');
    maskCns.width = w;
    maskCns.height = h;
    $(maskCns).css('zIndex', 3);
    component.append(maskCns);


    maskCtx.fillStyle = '#eee';
    maskCtx.strokeStyle = '#eee';
    maskCtx.lineWidth =1;



    // 生长动画
    var draw = function ( per ) {
        maskCtx.clearRect(0,0,w,h);
        maskCtx.beginPath();
        maskCtx.moveTo(r,r);
        // console.log(sAngel+2*Math.PI * per);

        if(per <= 0){
            maskCtx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity', 0);
        }else{
            maskCtx.arc(r,r,r,sAngel, sAngel+2*Math.PI * per,true);
        }


        maskCtx.fill();
        maskCtx.stroke();
        if( per >= 1){
            component.find('.text').css('opacity', 1);
        }
    };

    draw(0);

    component.on('onLoad',function () {
       // 饼图生长动画
        var s = 0;
        for(var i = 0; i<100; i++){
            setTimeout(function () {
                s+=0.01;
                draw(s)
            },i*10);
        }
    });

    component.on('onLeave',function () {
        // 饼图生长动画
        var s = 1;
        for(var i = 0; i<100; i++){
            setTimeout(function () {
                s-=0.01;
                draw(s)
            },i*10);
        }
    });


    return component;
};

// 柱状图组件对象

var H5ComponentBar = function ( name, cfg) {
    var component = new H5ComponentBase( name, cfg);


    $.each( cfg.data, function (index, item) {
        var line = $('<div class="line">');
        var barName = $('<div class="barName">');
        var progress = $('<div class="progress">');
        var per = $('<div class="per">');

        var bgstyle = '';

        if(item[2]){
            bgstyle = 'style="background-color:'+item[2]+'"';
        }else {
            // console.log('helo')
        }
        var width = (item[1]*100) + '%';
        progress.css('width', width);
        progress.html('<div class="bg" '+bgstyle+'></div>');


        per.text(width);
        barName.text(item[0]);
        line.append(barName).append(progress).append(per);
        component.append(line);
    });

    return component;
};
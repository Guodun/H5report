/**
 * 内容管理对象
 */
// var jdata = [];

var H5 =function ( ) {
    this.id = ('h5_' + Math.random()).replace('.', '_');//创建ID
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    this.page = [] //保存当前页
    $('body').append( this.el );

    /*
     * [addPage description]
     * @param {string} name 组件的名称，会加入到ClassName中
     * @param {[type]} text 页内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function ( name, text ) {
        // jdata.push({isPage:true, name:name, text:text});
        var page = $('<div class="h5_page section">');

        if( name != undefined ){
            page.addClass( 'h5_page_'+name );
        }

        if( text != undefined ){
            page.text( text );
        }

        this.el.append(page);
        this.page.push( page );

        if( typeof this.whenAddPage === "function"){

            this.whenAddPage();
        }
        return this;
    };
    // 新增组件
    this.addComponent = function (name, cfg) {

        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        }, cfg);

        // jdata.push({isPage:false, name:name, cfg:cfg});
        var component; // 定义一个变量，存储组件元素
        console.log(this.page.slice(-1)[0]);
        console.log(this.page);
        var page = this.page.slice(-1)[0];// 获取当前页

        switch (cfg.type){
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'Polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'Pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'point':
            component = new H5ComponentPoint(name, cfg);
            break;

            default:
        }

        page.append( component );

        return this;
    };

    // H5对象初始化呈现
    this.loader = function ( firstPage ) {
      this.el.fullpage({

          onLeave:function ( index, nextIndex, direction) {
              $(this).find('.h5_component').trigger('onLeave');
          },
          afterLoad:function (index, nextIndex, direction) {
            $(this).find('.h5_component').trigger('onLoad');
          }

      });
      this.page[0].find('.h5_component').trigger('onLoad');
      this.el.show();
      if(firstPage){
          $.fn.fullpage.moveTo( firstPage );
      }
    };

    // this.loader = typeof H5_loading == "function" ? H5_loading : this.loader;

    return this;
};
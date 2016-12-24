var H5_loading = function (images,firstPage) {

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

}
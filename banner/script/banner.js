;+function($){
    $.fn.Zbanner=function(ele,opts){
        new Banner(ele,opts);
    }
    function Banner(ele,opts){
        this.init(ele,opts);
    }
    Banner.prototype={
        constructor:Banner,
        init:function(ele,opts){
            this.ul=$(ele);
            this.animata = opts.animata ? opts.animata : "fade"
            this.li=this.ul.children();
            this.bannerNum = this.li.length; 
            this.index=0;
            if(opts.autoplay){//是否自动轮播
                this.autoplay();
            }
            if(typeof opts.turns == "object"){//按钮选择判断
                this.btnPre = $(opts.turns.pre)
                this.btnNext = $(opts.turns.next)
                console.log(this.btnPre)
                console.log(this.btnNext)
                this.btnPre
                .on("click.changeIndex",{turn:"prev"},$.proxy(this.change_index,this))
                .on("click.animation",$.proxy(this.animation,this))
                this.btnNext
                .on("click",{turn:"next"},$.proxy(this.change_index,this))
                .on("click",$.proxy(this.animation,this))
            }
        },
        change_index:function(event){//判断下标值，来驱动轮播
            var turnList = {
                "prev":function(){//上一个
                    this.prev = this.index;
                    if(this.index  == 0){
                        this.index = this.bannerNum - 1;
                    }else{
                        this.index --;
                    }
                }.bind(this),
                "next":function(){//下一个
                    this.prev = this.index;
                    if(this.index == this.bannerNum - 1){
                        this.index = 0;
                    }else{
                        this.index ++;
                    }
                }.bind(this)
            }
            if(!(typeof turnList[event.data.turn] == "function")) return 0;
            turnList[event.data.turn]();
        },
        animation:function(event){//运动方式
            if(this.prev == this.index) return ;
            var animationList = {
                "slide":function(){//下拉
                    animationList.slideFadeInit();
                    this.li.eq(this.index)
                    .stop()
                    .addClass("zindex")
                    .css({
                        display:"none"
                    })
                    .slideDown(1000)
                    .siblings()
                    .removeClass("zindex");
                }.bind(this),
                "fade":function(){//淡入
                    animationList.slideFadeInit();
                    this.li.eq(this.index)
                    .stop()
                    .addClass("zindex")
                    .css({
                        display:"none"
                    })
                    .fadeIn(1000) 
                    .siblings()
                    .removeClass("zindex");         
                }.bind(this),
                "slideFadeInit":function(){//其他元素下标
                    this.li.eq(this.prev)
                    .css({
                        zIndex:1
                    })
                    .siblings()
                    .css({
                        zIndex:""
                    })
                }.bind(this)
            }
            animationList[this.animata]();
        },
        autoplay:function(){//自动轮播
            this.banner=$(".banner")
            this.banner.on("mouseenter",function(){
                clearInterval(this.autoTimer);
            }.bind(this))
            this.banner.on("mouseleave",function(){
                clearInterval(this.autoTimer);
                this.autoTimer = setInterval(function(){
                    this.prev = this.index;
                    this.index = ++this.index  % this.bannerNum;
                    this.animation();
                }.bind(this),1250);
            }.bind(this))
            this.banner.trigger("mouseleave")
        }
    }
}(jQuery);
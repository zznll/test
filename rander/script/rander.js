function Rander() {
    this.init();
}
Rander.prototype = {
    constructor: Rander,
    init() {
        this.ul = $(".randerbox");//盒子
        this.load_data()
            .then(function (res) {
                this.json = res.data.list;
                //console.log(res)
                this.rander_page();
            }.bind(this))
    },
    load_data() {//加载数据
        opts = {
            url: "http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=106888&_=1526528205879",
            dataType: "jsonp",
        }
        return $.ajax(opts);
    },
    rander_page() {//渲染页面
        var html = "";
        this.json.forEach(function (item) {
            //console.log(item);
            html += `<li class="goods">
                    <img src="${item.image}" alt="">
                    <div class="info">
                        <div class="part">
                            <div class="price">￥${item.discountPrice}</div>
                            <div class="collect">
                                <i class="icon-star"></i>${item.itemLikes}</div>
                        </div>
                        <a class="title" href="###">
                            <i class="icon-select"></i>${item.title}</a>
                    </div>
                    <button data-id=${item.adId}>带ID的按钮</button>
                    </li>`
        });
        this.ul.html(html);
    }
}
new Rander();

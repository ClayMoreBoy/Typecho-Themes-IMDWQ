Array.prototype.remove=function(value){var index=this.indexOf(value);if(index>-1)this.splice(index,1);};(function(global,setting){var KStyle=function(a,b){return KStyle.fn.init(a,b);};KStyle.fn=KStyle.prototype={construtor:KStyle,init:function(a,b){a=KStyle.selectAll(a);a.each=function(fn){return KStyle.each(a,fn);};a.image=function(){return KStyle.image(a);};a.lazy=function(bg){return KStyle.lazy(a,bg);};a.scrollTo=function(offset){return KStyle.scrollTo(a,offset);};return a;}};KStyle.each=function(data,fn){for(var i=0;i<data.length;i++){fn(data[i],i,data);}};KStyle.create=function(tag,prop){var obj=document.createElement(tag);if(prop){if(prop.id)obj.id=prop.id;if(prop.src)obj.src=prop.src;if(prop.href)obj.href=prop.href;if(prop.class)obj.className=prop.class;if(prop.text)obj.innerText=prop.text;if(prop.html)obj.innerHTML=prop.html;if(prop.child){if(prop.child.constructor===Array){KStyle.each(prop.child,(i)=>{obj.appendChild(i);});}
else{obj.appendChild(prop.child);}}
if(prop.attr){if(prop.attr.constructor===Array){KStyle.each(prop.attr,(i)=>{obj.setAttribute(i.name,i.value);});}
else if(prop.attr.constructor===Object){obj.setAttribute(prop.attr.name,prop.attr.value);}}
if(prop.parent)prop.parent.appendChild(obj);}
return obj;};KStyle.select=function(obj){switch(typeof obj){case "object":return obj;break;case "string":return document.querySelector(obj);break;}};KStyle.selectAll=function(obj){switch(typeof obj){case "object":return obj;break;case "string":return document.querySelectorAll(obj);break;}};var notice={wrap:KStyle.create("notice"),list:[]};KStyle.notice=function(content,attr){var item=KStyle.create("div",{class:"ks-notice",html:"<span class='content'>"+content+"</span>",parent:notice.wrap});notice.list.push(item);if(!document.querySelector("body > notice"))document.body.appendChild(notice.wrap);if(attr&&attr.time){setTimeout(notice_remove,attr.time);}
else{var close=KStyle.create("span",{class:"close",parent:item});close.onclick=notice_remove;}
if(attr&&attr.color){item.classList.add(attr.color);}
function notice_remove(){item.classList.add("remove");notice.list.remove(item);setTimeout(function(){try{notice.wrap.removeChild(item);item=null;}
catch(err){}
if(document.querySelector("body > notice")&&notice.list.length===0){document.body.removeChild(notice.wrap);}},300);}};var image_box={img:KStyle.create("img"),prev:KStyle.create("div",{class:"ks-prev"}),next:KStyle.create("div",{class:"ks-next"}),ball:KStyle.create("div",{class:"ks-ball"})};image_box.wrap=KStyle.create("div",{class:"ks-image",child:[image_box.prev,image_box.img,image_box.next,image_box.ball]});KStyle.image=function(selector){var current=0;var get_images=KStyle.selectAll(selector);var actions={ori:function(obj,num){obj.setAttribute("ks-image","active");obj.onclick=function(){current=num;actions.set();document.body.appendChild(image_box.wrap);};},set:function(){var img=get_images[current];current===0?image_box.prev.classList.add("ended"):image_box.prev.classList.remove("ended");current===get_images.length-1?image_box.next.classList.add("ended"):image_box.next.classList.remove("ended");if(img.getAttribute("ks-original")!==null){image_box.img.src=img.getAttribute("ks-original");}
else if(img.src){image_box.img.src=img.src;}
else{console.error("This image has no valid tag!");}
image_box.wrap.classList.add("loading");}};KStyle.each(get_images,function(item,id){if(item.src||item.getAttribute("ks-original")){actions.ori(item,id);}});image_box.img.onclick=function(){image_box.wrap.classList.add("remove");setTimeout(function(){try{document.body.removeChild(image_box.wrap);image_box.wrap.classList.remove("remove");}
catch(err){}},300);};image_box.img.onload=function(){image_box.wrap.classList.remove("loading");};image_box.prev.onclick=function(){if(current-1>=0)current--;actions.set();};image_box.next.onclick=function(){if(current+1<get_images.length)current++;actions.set();};};KStyle.lazy=function(elements,bg){elements=KStyle.selectAll(elements);var list=[];var action={setFront:function(item){if(item.intersectionRatio>0){item.target.src=item.target.link;item.target.setAttribute("ks-lazy","finished");obs.unobserve(item.target);}},setBack:function(item){if(item.boundingClientRect.top<=window.innerHeight+100){var img=new Image();img.src=item.target.link;img.onload=function(){item.target.setAttribute("ks-lazy","finished");item.target.style.backgroundImage="url("+item.target.link+")";};obs.unobserve(item.target);}}};if(global.IntersectionObserver){var obs=new IntersectionObserver(function(changes){if(bg){changes.forEach(function(t){action.setBack(t);});}
else{changes.forEach(function(t){action.setFront(t);});}});KStyle.each(elements,function(item){item.link=item.getAttribute("ks-thumb")||item.getAttribute("ks-original");if(!item.getAttribute("ks-lazy"))obs.observe(item);})}
else{function back(){KStyle.each(list,function(item){var check=item.el.getBoundingClientRect().top<=window.innerHeight;if(check&&!item.showed){action.setBack(item.el);list.remove(item);}});}
function front(){KStyle.each(list,function(item){var check=item.el.getBoundingClientRect().top<=window.innerHeight;if(check&&!item.showed){action.setFront(item.el);list.remove(item);}});}
KStyle.each(elements,function(item){item.link=item.getAttribute("ks-thumb")||item.getAttribute("ks-original");if(!item.getAttribute("ks-lazy"))list.push({el:item,link:item.link});});bg?back():front();bg?document.addEventListener("scroll",back):document.addEventListener("scroll",front);}};KStyle.ajax=function(prop){if(!prop.url)prop.url=document.location.href;if(!prop.method)prop.method="GET";if(prop.method==="POST"){var data=new FormData();for(var d in prop.data){data.append(d,prop.data[d]);}}
else if(prop.method==="GET"){var url=prop.url+"?";for(var d in prop.data){url+=d+"="+prop.data[d]+"&";}
prop.url=url.substr(0,url.length-1);}
var request=new XMLHttpRequest();request.open(prop.method,prop.url);if(prop.crossDomain){request.setRequestHeader("X-Requested-With","XMLHttpRequest");}
if(prop.header){for(var i in prop.header){request.setRequestHeader(prop.header[i][0],prop.header[i][1]);}}
request.send(data);request.onreadystatechange=function(){if(request.readyState===4){if(request.status===200||request.status===304){if(prop.type){switch(prop.type){case "text":prop.success(request.responseText);break;case "json":prop.success(JSON.parse(request.response));break;}}
else{prop.success?prop.success(request):console.log(prop.method+" 请求发送成功");}}
else{prop.failed?prop.failed(request):console.log(prop.method+" 请求发送失败");}
request=null;}};return request;};KStyle.scrollTo=function(el,offset){el=KStyle.selectAll(el);el.forEach(function(t){t.onclick=function(e){var l=e.target.pathname;var c=window.location.pathname;var t=e.target.href.match(/#[\s\S]+/);if(t)t=t[0];t=ks.select(t);if(c===l){e.preventDefault();var top=t?(offset?t.offsetTop-offset:t.offsetTop):0;"scrollBehavior"in document.documentElement.style?global.scrollTo({top:top,left:0,behavior:"smooth"}):global.scrollTo(top,0);}
else{console.log(c,l);}}})};global.ks=KStyle;console.log("%c Kico Style %c https://paugram.com ","color: #fff; margin: 1em 0; padding: 5px 0; background: #3498db;","margin: 1em 0; padding: 5px 0; background: #efefef;");})(window);
var paul = new function () {
    var that = this;
    var ajax = {
        note: {},
        gallery: {}
    };
    this.getByName = function (name) {
        return document.getElementsByName(name)[0];
    };
    this.add_zero = function (num) {
        return num < 10 ? "0" + num : num;
    };
    var head = {
        wrap: ks.select("header")
    }
    ks.select("toggle").onclick = function (){
        head.wrap.classList.toggle("active");
    }
    ks("header nav a").each(function(t){
        t.onclick = head.wrap.classList.remove("active");
    });
    this.side = function () {
        var el = {
            top: ks.select("action .top"),
            player: ks.select("action .player")
        };
el.top.onclick=function(){window.scrollTo(0,0);};
        window.onscroll=function(){var scroll=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;scroll>=window.innerHeight/1.5?el.top.classList.add("active"):el.top.classList.remove("active");animate();};
    };   
    this.init = function () {
        if(ks.select(".paul-news")) this.indexPage();
        if(ks.select(".paul-note")) this.notePage();
        if(ks.select(".paul-gallery")) this.galleryPage();
        this.side();
        if(typeof _hmt !== 'undefined') _hmt.push(['_trackPageview', location.pathname + location.search]);
        ks.image("article img, .paul-say img, .project-screenshot img, .gallery-item");
    };
    var pjax = new Pjax({
        elements: "a[href]:not([target=_blank])",
        selectors: [
            "title", "meta[name=description]", "meta[property]", "main", "action"
        ],
        timeout: 10000,
        cacheBust: false
    });  
    document.addEventListener('pjax:send', function (){
        document.body.classList.add("loading");
        head.wrap.classList.remove("active");
    });
    document.addEventListener('pjax:complete', function (){
        document.body.classList.remove("loading");
        ks.lazy("img");
ks.lazy(".gallery-item",true);
        paul.init();
scrollToTop();
    });
    document.addEventListener('pjax:error', function (){
        ks.notice("服务器超载请稍后重试", {color: "red"});
    });
};
function openmusiclist(){
document.getElementById("musiclist").setAttribute("class","paul-music active");
document.getElementById("moremusic").setAttribute("style","display:none");
};
function openbangumilist(){
document.getElementById("morebangumilist").setAttribute("style","padding-top:2em");
document.getElementById("morebangumi").setAttribute("style","display:none");
};
ks.lazy("img");
ks.lazy(".gallery-item",true);
paul.init();
function scrollToTop(duration = 100) {
    let easeingFunction = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    let originScrollY = pageYOffset;
    let originScrollX = pageXOffset;
    let originTime = Date.now();
    let passedTime = 0;
    let _scrollToTop = () => {
        if (passedTime < duration) {
            passedTime = Date.now() - originTime;
            requestAnimationFrame(_scrollToTop);
            scrollTo(originScrollX, originScrollY * (1 - easeingFunction(passedTime / duration)));
        }
    };
    _scrollToTop();
};
function animate(){document.body.style.backgroundPositionY=-parseInt(scrollY/10)+"px";playable=true;};
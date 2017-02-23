
declare var $:any, ajaxForm: any, content: any, href: string;
var url = location.href

/* JQuery and handlers */
$("#draggable-message-form").draggable({containment: "body"});


$(document).ready(function(){
    $(".message-form")[0].reset();
    
}).on("click", ".reply-link", (e: any)=>{
    e.stopImmediatePropagation();
    let num = e.target.href.substring(e.target.href.lastIndexOf("#") + 1)
    if(location.href.lastIndexOf("/thread") < 0){
        location.href = cleanUrl(location.href, "/thread/"+num);
    }
    $(".message-form").css("display", "block");
    $(".message-field").append("@" + num);
    return false;

}).on("click", ".reply-anchor", (e: any)=>{
    $("#"+e.target.href)[0].scrollIntoView({behavior: "smooth"});
}).on("click", "#new-post", (e: any)=>{  
    $(".message-form").css("display", "block");
});

$(".message-form").not(".hidden-input").ajaxForm({
    url: cleanUrl(url, "/message"), 
    type: "post",
    context: this,
    data: $(this).serialize(),
    complete: ()=>{location.reload();}
});

$("#cancel").on("click", (e: any)=>{
    e.preventDefault();
    $(".message-form").css("display", "none")
});

/* General util functions */
function cleanUrl(href: string, trail: string){
    let index = href.indexOf("#");
    return index >= 0? href.substring(0, index)+trail: href+trail;
}
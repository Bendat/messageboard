var url = location.href;
/* JQuery and handlers */
$("#draggable-message-form").draggable({ containment: "body" });
$(document).ready(function () {
    $(".message-form")[0].reset();
}).on("click", ".reply-link", (e) => {
    e.stopImmediatePropagation();
    let num = e.target.href.substring(e.target.href.lastIndexOf("#") + 1);
    if (location.href.lastIndexOf("/thread") < 0) {
        location.href = cleanUrl(location.href, "/thread/" + num);
    }
    $(".message-form").css("display", "block");
    $(".message-field").append("@" + num);
    return false;
}).on("click", ".reply-anchor", (e) => {
    $("#" + e.target.href)[0].scrollIntoView({ behavior: "smooth" });
}).on("click", "#new-post", (e) => {
    $(".message-form").css("display", "block");
});
$(".message-form").not(".hidden-input").ajaxForm({
    url: cleanUrl(url, "/message"),
    type: "post",
    context: this,
    data: $(this).serialize(),
    complete: () => { location.reload(); }
});
$("#cancel").on("click", (e) => {
    e.preventDefault();
    $(".message-form").css("display", "none");
});
/* General util functions */
function cleanUrl(href, trail) {
    let index = href.indexOf("#");
    return index >= 0 ? href.substring(0, index) + trail : href + trail;
}
//# sourceMappingURL=init.js.map
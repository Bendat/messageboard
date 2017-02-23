$("#draggable-message-form").draggable({ containment: "body" });
let threadUrl = window.content.location.href.substring(0, window.content.location.href.lastIndexOf("#")) + "/thread.json";
let urlTo = window.content.location.href.substring(0, window.content.location.href.lastIndexOf("#")) + "/message";
$(document).ready(function () {
    $(".message-form")[0].reset();
}).on("click", ".reply-link", (e) => {
    e.stopImmediatePropagation();
    $(".message-form").css("display", "block");
    $(".message-field").append("@" +
        e.target.href.substring(e.target.href.lastIndexOf("#") + 1));
    return false;
});
$(".message-form").not(".hidden-input").ajaxForm({
    url: urlTo,
    type: "post",
    context: this,
    data: $(this).serialize(),
    complete: () => { location.reload(); }
});
$("#cancel").on("click", (e) => {
    e.preventDefault();
    $(".message-form").css("display", "none");
});
//# sourceMappingURL=init.js.map
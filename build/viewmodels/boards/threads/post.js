define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    class Post {
        constructor(data) {
            this.imageTitle = ko.computed(() => {
                return this.imageName + "." + this.imageExt;
            });
            this.id = data["id"];
            this.parentId = data["parent_id"];
            this.userId = data["user_id"];
            this.timestamp = data["timestamp"];
            this.text = data["text"];
            this.imageId = data["image_id"];
            this.imageName = data["image_name"];
            this.imageExt = data["image_ext"];
            this.board = data["board"];
        }
    }
    exports.Post = Post;
});
//# sourceMappingURL=post.js.map
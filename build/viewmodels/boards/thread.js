define(["require", "exports", "knockout", "post"], function (require, exports, ko, post_1) {
    "use strict";
    class ThreadViewModel {
        get id() { return this._id; }
        get posts() { return this._posts; }
        get childIds() { return this._childIds; }
        /**
         * Creates a new ThreadViewModel instance.
         */
        constructor() {
            this._id = ko.observable(null);
            this._posts = ko.observableArray([]);
            this._childIds = [];
        }
        /**
         * Constructs Post objects from JSON data and stores them.
         * @param {Object} thread A json object representing the posts.
         * @param {String} textStatus The Status Code of the request.
         * @param {Object} jqXJHR a Jquery XMLHttpRequest
         * @return {number} The number of posts in this request.
         */
        addPosts(thread, textStatus = null, jqXJHR = null) {
            thread = typeof thread === "string" ? JSON.parse(thread) : thread;
            for (let post of thread) {
                if (!post["parent_id"]) {
                    this.id(post["id"]);
                }
                // These are used by functions in the Post class
                // to parse messages, so this object is run through twice.
                this.childIds.push(post["id"]);
            }
            for (let post of thread) {
                this.posts.push(new post_1.Post(post, this));
            }
            return this.posts().length;
        }
    }
    exports.ThreadViewModel = ThreadViewModel;
});
//# sourceMappingURL=thread.js.map
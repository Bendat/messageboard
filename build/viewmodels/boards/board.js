define(["require", "exports", "knockout", "thread"], function (require, exports, ko, thread_1) {
    "use strict";
    class BoardViewModel {
        constructor(title, description) {
            this.Title = ko.observable(title);
            this.Description = ko.observable(description);
            this.Boards = ko.observableArray([]);
            this.Threads = ko.observableArray([]);
            this.id = ko.observable(title);
        }
        addBoardsList(list, textStatus = null, jqXJHR = null) {
            list = JSON.parse(list);
            for (let board of list) {
                this.Boards.push(board["name"]);
            }
        }
        addBlurbs(list, textStatus = null, jqXJHR = null) {
            list = JSON.parse(list);
            for (let thread of list) {
                let thr = new thread_1.ThreadViewModel();
                thr.addPosts(thread);
                this.Threads.push(thr);
            }
        }
    }
    exports.BoardViewModel = BoardViewModel;
});
//# sourceMappingURL=board.js.map
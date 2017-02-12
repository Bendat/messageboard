requirejs.config({
    paths: {
        "knockout": "../bower_components/knockout/dist/knockout"
    }
});
define("viewmodels/threads/thread", ["require", "exports"], function (require, exports) {
    "use strict";
    class Thread {
    }
    exports.Thread = Thread;
});
define("viewmodels/boards/board", ["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    class BoardViewModel {
        constructor(title, description) {
            this.Title = ko.observable(title);
            this.Description = ko.observable(description);
        }
    }
    exports.BoardViewModel = BoardViewModel;
    ko.applyBindings(new BoardViewModel("Tech", "Technology and IT"));
});
//# sourceMappingURL=index.js.map
define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    class BoardViewModel {
        constructor(title, description) {
            this.Title = ko.observable(title);
            this.Description = ko.observable(description);
            this.Boards = ko.observableArray(BoardsNav.Boards);
        }
    }
    exports.BoardViewModel = BoardViewModel;
    //To be replaced by db call
    class BoardsNav {
    }
    BoardsNav.Boards = [
        "Any", "Tech", "Prog", "Tv", "Music"
    ];
    ko.applyBindings(new BoardViewModel("Tech", "Technology and IT"));
});
//# sourceMappingURL=board.js.map
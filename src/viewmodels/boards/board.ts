import * as ko from "knockout";
import {Thread} from "../threads/thread";
export class BoardViewModel{
    public Title: KnockoutObservable<string>;
    public Description: KnockoutObservable<string>;
    public Threads: KnockoutObservableArray<Thread>;
    public Boards: KnockoutObservableArray<String>;

    constructor(title: string, description: string){
        this.Title = ko.observable(title);
        this.Description = ko.observable(description);
        this.Boards = ko.observableArray(BoardsNav.Boards);
    }
}

//To be replaced by db call
class BoardsNav{
    public static Boards: string[] = [
        "Any", "Tech", "Prog", "Tv", "Music"
    ];
}
ko.applyBindings(new BoardViewModel("Tech", "Technology and IT"))
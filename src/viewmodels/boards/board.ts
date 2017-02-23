import * as ko from "knockout";
import {ThreadViewModel} from "thread";

export class BoardViewModel{
    public id: KnockoutObservable<string>;
    public Title: KnockoutObservable<string>;
    public Description: KnockoutObservable<string>;
    public Threads: KnockoutObservableArray<ThreadViewModel>;
    public Boards: KnockoutObservableArray<String>;

    constructor(title: string, description: string){
        this.Title = ko.observable(title);
        this.Description = ko.observable(description);
        this.Boards = ko.observableArray([]);
        this.Threads = ko.observableArray([]);
        this.id = ko.observable(title);
    }

    public addBoardsList(list: any, textStatus: string = null, jqXJHR: any = null){
        list = JSON.parse(list);
        for(let board of list){
            this.Boards.push(board["name"]);
        }
    }

    public addBlurbs(list: any, textStatus: string = null, jqXJHR: any = null){
        list = JSON.parse(list);
        for(let thread of list){
            let thr = new ThreadViewModel();
            thr.addPosts(thread);
            this.Threads.push(thr);
        }
    }
    
}

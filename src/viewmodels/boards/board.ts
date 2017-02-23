import * as ko from "knockout";
import {ThreadViewModel} from "thread";
/**
 * A viewmodel representing a topic board.
 */
export class BoardViewModel{
    //TODO convert to properties.
    public id: KnockoutObservable<string>;
    public Title: KnockoutObservable<string>;
    public Description: KnockoutObservable<string>;
    public Threads: KnockoutObservableArray<ThreadViewModel>;
    public Boards: KnockoutObservableArray<String>;

    /**
     * Creates a new BoardViewModel instance.
     * @param {string} title The Name of the current board.
     * @param {string} description A description of the current board.
     */
    constructor(title: string, description: string){
        this.Title = ko.observable(title);
        this.Description = ko.observable(description);
        this.Boards = ko.observableArray([]);
        this.Threads = ko.observableArray([]);
        this.id = ko.observable(title);
    }

    /**
     * Populates the list of available boards to navigate to. Used with ajax calls.
     * @param {Object} list The JSON object containing the board list.
     */
    public addBoardsList(list: any, textStatus: string = null, jqXJHR: any = null){
        list = JSON.parse(list);
        for(let board of list){
            this.Boards.push(board["name"]);
        }
    }

    /**
     * Adds a thread fragment to the boards homepage, showing part of its discussion. Used with ajax calls.
     * @param {Object} list A JSON object containing data about the posts to be displayed.
     */
    public addBlurbs(list: any, textStatus: string = null, jqXJHR: any = null){
        list = JSON.parse(list);
        for(let thread of list){
            let thr = new ThreadViewModel();
            thr.addPosts(thread);
            this.Threads.push(thr);
        }
    }
    
}

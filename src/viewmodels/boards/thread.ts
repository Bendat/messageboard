import * as ko from "knockout";
import {Post} from "post";
/**
 * A viewmodel object representing a thread, a self contained discussion containing messages and images.
 * @property {KnockoutObservable<number>} id The id of this thread (same as the first post associated with it).
 * @property {KnockoutObservableArray<Post>} posts An array of Post object to be displayed.
 * @property {Array<string>} childIds The ids of all children associated with this thread.
 */
export class ThreadViewModel{
    private  _id: KnockoutObservable<number>;
    private _posts: KnockoutObservableArray<Post>;
    private _childIds: Array<string>;
    
    public get id(): KnockoutObservable<number> {return this._id;}
    public get posts(): KnockoutObservableArray<Post> {return this._posts; } 
    public get childIds(): Array<String> {return this._childIds;}

    /**
     * Creates a new ThreadViewModel instance.
     */
    constructor(){
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
    public addPosts(thread: any, textStatus: string = null, jqXJHR: any = null): number{
        thread = typeof thread === "string" ?JSON.parse(thread): thread;
        for(let post of thread){
            if(!post["parent_id"]){
                this.id(post["id"])
            }
            // These are used by functions in the Post class
            // to parse messages, so this object is run through twice.
            this.childIds.push(post["id"]);
        }

        for(let post of thread){
            this.posts.push(new Post(post, this));
        }
        return this.posts().length;
    }
}

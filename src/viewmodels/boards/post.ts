import * as ko from "knockout";
import {ThreadViewModel} from "thread";

/**
 * A object representing an message/post that a user has submitted.
 */
export class Post{
    public id: KnockoutObservable<number>;
    public parentId: KnockoutObservable<number>;
    public userId: KnockoutObservable<number>;
    public timestamp: KnockoutObservable<string>;
    public text: KnockoutObservable<string>;
    public imageId: KnockoutObservable<string>;
    public imageName: KnockoutObservable<string>;
    public imageExt: KnockoutObservable<string>;
    public board: KnockoutObservable<string>;

    public imageLink: KnockoutObservable<string>;

    private parent: ThreadViewModel;

    /**
     * Creates a new Post instance.
     * @param {Object} data A JSON object containing the Posts information.
     * @param {number|string} data.id The id of the post.
     * @param {number|string|null} data.parent_id The id of the thread/parent post.
     * @param {number|string} data.user_id The id of the user who created this post.
     * @param {string} data.timestamp The timestamp of when the post was created.
     * @param {string} data.text The body text of the post.
     * @param {string|null} data.image_id The filename the image is stored with.
     * @param {string|null} data.image_name The original name of the file (for display purposes).
     * @param {string|null} data.image_ext The file extension of the image.
     * @param {string} data.board The board this post is associated with.
     * @param {ThreadViewModel} parent The parent object of this post.
     */
    constructor(data: any, parent: ThreadViewModel){
        this.parent = parent;
        this.id = ko.observable(data["id"]);
        this.parentId = ko.observable(data["parent_id"]);
        this.userId = ko.observable(data["user_id"]);
        this.timestamp = ko.observable(data["timestamp"]);
        this.text = ko.observable(this.makeLinks(data["text"]));
        this.imageId = ko.observable(data["image_id"]);
        this.imageName = ko.observable(data["image_name"]);
        this.imageExt = ko.observable(data["image_ext"]);
        this.board = ko.observable(data["board"]);
        this.imageLink = ko.observable(this.imageId()+"."+this.imageExt());
    }

    /* 
    * Converts reply links ( @123 ) to navigatable links
    * if a matching post exists.
    */
    private makeLinks(text: string): string{
        let pattern = /(@)(\d+)/g;
        let res = text.match(pattern);
        if(!res){
            return text;
        }
        for(let match of res){
            let num = match.replace("@", "");
            if(this.parent.childIds.indexOf(num)>=0){
                let link = `<a class="reply-anchor" href="#${num}">${match}</a>`
                text = text.replace(match, link);
            }
        }
        return text;
    }

}


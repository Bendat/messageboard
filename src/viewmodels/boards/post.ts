import * as ko from "knockout";
import {ThreadViewModel} from "thread";

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

    private makeLinks(text: string): string{
        
        let pattern = /(@)(\d+)/g;
        let m;
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


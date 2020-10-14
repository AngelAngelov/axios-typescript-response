export class Post{
    constructor(obj:any = {}){
        this.id = obj.id;
        this.userId = obj.userId;
        this.title = obj.title;
        this.body = obj.body;
    }

    id: number;
    userId: number;
    title: string;
    body: string;
}

export class PostWithoutConstructor{
    id: number = 0;
    userId: number = 0;
    title: string = '';
    body: string = '';
}
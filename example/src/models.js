"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithoutConstructor = exports.Post = void 0;
class Post {
    constructor(obj = {}) {
        this.id = obj.id;
        this.userId = obj.userId;
        this.title = obj.title;
        this.body = obj.body;
    }
}
exports.Post = Post;
class PostWithoutConstructor {
    constructor() {
        this.id = 0;
        this.userId = 0;
        this.title = '';
        this.body = '';
    }
}
exports.PostWithoutConstructor = PostWithoutConstructor;

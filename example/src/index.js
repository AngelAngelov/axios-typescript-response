"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const http_1 = __importDefault(require("./http"));
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
http_1.default
    .get(postsUrl, models_1.Post, true)
    .then((response) => console.log("Array of object wwith type Post", response));
http_1.default.get(`${postsUrl}/1`, models_1.Post, true)
    .then((response) => console.log("Object wwith type Post", response));
http_1.default.get(`${postsUrl}/1`, models_1.PostWithoutConstructor)
    .then(result => console.log("Post with no constructor", result));
http_1.default.get(postsUrl, models_1.PostWithoutConstructor)
    .then(result => console.log("No Constructor Array", result));
const newPost = {
    title: "foo",
    body: "bar",
    userId: 1,
};
http_1.default.post(postsUrl, newPost, models_1.Post)
    .then(result => console.log("Post Result", result));

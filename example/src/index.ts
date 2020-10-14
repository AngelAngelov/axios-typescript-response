import { Post, PostWithoutConstructor } from "./models";
import http from "./http";

const postsUrl = "https://jsonplaceholder.typicode.com/posts";

http
    .get<Post>(postsUrl, Post, true)
    .then((response) => console.log("Array of object wwith type Post", response));

http.get<Post>(`${postsUrl}/1`, Post, true)
    .then((response) => console.log("Object wwith type Post", response))

http.get<PostWithoutConstructor>(`${postsUrl}/1`, PostWithoutConstructor)
    .then(result => console.log("Post with no constructor", result))

http.get<PostWithoutConstructor>(postsUrl, PostWithoutConstructor)
    .then(result => console.log("No Constructor Array", result))

const newPost = {
    title: "foo",
    body: "bar",
    userId: 1,
};

http.post<PostWithoutConstructor>(postsUrl, newPost, Post)
    .then(result => console.log("Post Result", result));
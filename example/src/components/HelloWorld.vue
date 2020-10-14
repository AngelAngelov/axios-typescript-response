<template>
  <div>
    <h3>Post</h3>
    <pre v-if="post">
      {{ post }}
    </pre>
    <h3>Posts</h3>
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <b>{{ index + 1 }}.</b>&nbsp;<span>{{ post.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { Post, PostWithoutConstructor } from "../models/Post";
import http from "../http/http";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  posts: Post[] = [];
  post: Post = new Post();

  async mounted() {
    http
      .get<Post>("https://jsonplaceholder.typicode.com/posts", Post, true)
      .then((response) => (this.posts = response));

    http
      .get<Post>("https://jsonplaceholder.typicode.com/posts/1", Post, true)
      .then((response) => (this.post = response))
      .catch((err: any) => console.log("No post"));

    const post2 = await http.get<PostWithoutConstructor>(
      "https://jsonplaceholder.typicode.com/posts/1",
      PostWithoutConstructor
    );
    console.log("No Constructor", post2);

    const posts2 = await http.get<PostWithoutConstructor>(
      "https://jsonplaceholder.typicode.com/posts",
      PostWithoutConstructor
    );
    console.log("No Constructor Array", posts2);

    const newPost = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    const postResponse = await http.post<PostWithoutConstructor>(
      "https://jsonplaceholder.typicode.com/posts",
      newPost,
      PostWithoutConstructor
    );

    console.log("Post Result", postResponse);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

# axios-typescript-response
Get axios AJAX response in typescript class objects

## Supported RESTfull verbs 
* GET
* DELETE
* POST
* PUT

## Parameters
> **http.get<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined)**
> * url: API url
> * type: Expected data type to be returned from the API 
> * useConstructor: Indicates if the class constructor should be used (false by default)
> * config: Axios configuration if needed
  
> **http.post<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined): Promise<any>**
> * url: API url
> * payload: Data that will be put in the request body
> * type: Expected data type to be returned from the API 
> * useConstructor: Indicates if the class constructor should be used (false by default)
> * config: Axios configuration if needed
  
## Usage

### Typescript Class with default constructor
```
class Post{
    id: number = 0;
    userId: number = 0;
    title: string = '';
    body: string = '';
}
```

```
http
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1", Post)
  .then((response) => console.log(response instanceof Post))
  
  //result in console is true

axios
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data instanceof Post))
  
  //result in console is false
```

### Typescript Class with constructor

```
class Post{
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
```

```
http
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1", Post, true)
  .then((response) => console.log(response instanceof Post))
  
  //result in console is true

axios
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data instanceof Post))
  
  //result in console is false
```

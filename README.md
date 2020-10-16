# axios-typescript-response
Get axios AJAX response in typescript class objects

## Install

> * **npm install axios-typescript-response**

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
import Http from 'axios-typescript-response';

...

http
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1", Post)
  .then((response) => console.log(response instanceof Post)) //output: true

//Calling the function without type parameter returns axios default function
http
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data instanceof Post)) //output: false
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
import Http from 'axios-typescript-response';

...

http
  .get<Post>("https://jsonplaceholder.typicode.com/posts/1", Post, true)
  .then((response) => console.log(response instanceof Post)) //output: true

//Calling the function without type parameter returns axios default function
http
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data instanceof Post)) //output: false
```

### Use axios interceptors

To add additional axios configuration, you must import the class instance and create the http object after the configuration is added.

```
import store from '../store/store';
import router from '../router/router';
import Http from 'axios-typescript-response';

Http.axiosInstance.interceptors.request.use(config => {
    debugger
    config.baseURL = store.getters.baseUrl;

    //Auth token
    const token = store.state.user!.token;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    //Culture
    const lang = store.getters.Language;
    config.headers["Accept-Language"] = lang || 'bg';
    config.headers["Accept"] = '*/*';

    return config;
});

// Add a 401 response interceptor
Http.axiosInstance.interceptors.response.use(response => {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        store.dispatch('logout').then(() => {
            router.push('/login');
        });
    } else {
        return Promise.reject(error);
    }
});

export default Http;
```

import React, { Component } from 'react';
import axios from 'axios'; //importing axios into the component after you run npm install axios(1)

import './App.css';

import Header from './Header/Header' //importing Header from the header.js file into app.js(1)
import Compose from './Compose/Compose' //importing compose from the compose.js file into app.js(1)
import Post from './Post/Post' //importing Post from the post.js file into app.js(1)

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`) //making a GET request to the api(1)
    .then( results => {  //^^ the GET request will return an array of post objects(1)
      this.setState({ 
        posts: results.data
      })
    })
  }
  //^^^^ this will update state, and add it to App.js's post array(1). this will fetch the array of posts as the component mounts.(1)//we need to capture this returned array and set it onto posts on App.js's state above that is set to an empty array(1)

  updatePost(id, text) { //updating the updatePost method, to send a put request into the correct endpoint. will need to work for any post. use function PARAMETERS
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}) //make a put reqeust to the api. uses query to determine id, and body to determine text. because they will be different each time, we should use and id and text parameter. when using axios.put the second arguement is the body
    .then(results => {
      this.setState({
        posts: results.data
      })
    })
  
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn={this.createPost}/>

          {
            posts.map( post => ( // we rendered a post component for every post in the posts array on state. when using map, we need a unique key property. we will use the id of the post(1)
            <Post 
            key={post.id} 
            id={post.id} 
            text={post.text} 
            date={post.date} 
            updatePostFn={this.updatePost} 
            deletePostFn= {this.deletePost}/> //updating the map to send the following props into post. text and date. API documentation states that a post object has an id, text and date property. we can access them by using post.text and post.date. we still need to render them in the post component(2)  we also passed the updatePost method down a a prop called updatePostFn into the posts map
          ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;

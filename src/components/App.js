import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

let baseUrl = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchFn = this.searchFn.bind(this)
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts`)
    .then(res => {
      this.setState({posts: res.data})
    })
  }

  updatePost(id, text) {
  axios.put(`${baseUrl}/posts?id=${id}`,{text})
  .then( res => {
    this.setState({posts: res.data})
  })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${id}`)
    .then( res => {
      this.setState({posts: res.data})
    })
  }

  createPost(text) {
    axios.post(`${baseUrl}/posts`, {text})
    .then( res => {
      this.setState({posts: res.data})
    })
  }

  searchFn(text){
    const input = encodeURIComponent(text)
    if(!text){
      axios.get(`${baseUrl}/posts`)
    .then(res => {
      this.setState({posts: res.data})
    })} else{
    axios.get(`${baseUrl}/posts/filter?text=${input}`)
    .then( res => {
      this.setState({posts: res.data})
    })
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.searchFn}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map( post => 
          <Post text={post.text} 
                date={post.date} 
                key={post.id}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}/>)}
        </section>
      </div>
    );
  }
}

export default App;
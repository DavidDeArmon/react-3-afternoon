import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

const BASE_URL = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts=this.searchPosts.bind(this)
  }
  
  componentDidMount() {
    axios.get(BASE_URL+'/posts').then(results=>{
    console.log(results)
    this.setState({posts:results.data})
    }
    )
  }

  updatePost(id, text) {
    axios.put(BASE_URL+'/posts?id='+id,{text}).then(results=>{
      console.log(results)
      this.setState({posts: results.data})
    })
  }

  deletePost(id) {
    axios.delete(BASE_URL+'/posts?id='+id).then(results=>{
      console.log(results)
      this.setState({posts:results.data})
    })
  }

  createPost(text) {
    axios.post(BASE_URL+'/posts?id=',{text}).then(results=>{
      this.setState({posts:results.data})
    })
  }
  searchPosts(newArr){
    this.setState({posts:newArr})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header posts={posts} searchPosts={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map((e)=>{
              console.log(e)
              return <Post key={e.id}  text={e.text} date={e.date} id={e.id} updatePostFn={this.updatePost} deletePostFn={this.deletePost}></Post>
            })

          }
        </section>
      </div>
    );
  }
}

export default App;

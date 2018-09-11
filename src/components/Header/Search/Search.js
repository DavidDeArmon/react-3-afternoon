import React, { Component } from 'react';
import axios from 'axios'

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()
    this.state={
      userinput:'',
      posts:[]
    }
    this.filtersPosts=this.filtersPosts.bind(this)
    this.componentDidMount=this.componentDidMount.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
   componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results=>{
      console.log(results)
      this.setState({posts:results.data})
    })
   }
   
handleChange(event){    
    this.setState({userinput:event})
  }

  filtersPosts(){
  let newArr=this.state.posts
 
  newArr=newArr.filter(post=>post.text.includes(this.state.userinput))
  console.log(newArr)  
  return this.props.searchPosts(newArr)
  }
  

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e)=>this.handleChange(e.target.value)}/>

          <SearchIcon id="Search__icon" onClick={this.filtersPosts} />
        </div>
        
      </section>
    )
  }
}
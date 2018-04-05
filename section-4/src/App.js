import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Table from './components/Table';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY;
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list, 
      searchTerm: DEFAULT_QUERY
    }

    // bind the function to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
  }
  // set top stories
  setTopStories(result){
    this.setState({result:result});
  }

  // fetch top stories
  fetchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
      .then(response => response.json())
      .then(result => this,setTopStories(search))
      .catch(err => err);
  }

  // componet did mount
  componentDidMount(){
    this.fetchTopStories(this.state.searchTerm);
  }
  render() {
    const{result, searchTerm} = this.state;
    if(!result){return null;}
    console.log(this);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {
          
        }
      </div>
    );
  }
}

export default App;

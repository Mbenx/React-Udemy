import React, { Component } from 'react';
import list from './list';
import logo from './logo.svg';
import './App.css';

// filter the result by search
function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.includes(searchTerm);
  }
}


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      list : list,
      searchTerm: ''
    }

    // bind functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);

  }
  /*
  removeItem(id){
    console.log('remove.item');
    // using javascript filter method
    // we can filter out the clicked item and render the updated list
    function isNotId(item){
      return item.objectID !== id;
    }

    // create a new updates list
    const updatedList = this.state.list.filter(isNotId);
    // assign the new updated list  to the list using setState method
    this.setState({list: updatedList});

  }
  */

  removeItem(id){
    console.log('remove.item');
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list : updatedList});
  }

  searchValue(event){
    // console.log(event);
    this.setState({ searchTerm: event.target.value});
  }

  render() {

    console.log(this);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <form>
          <input type="text" onChange={this.searchValue} />
        </form>

       {
          this.state.list.filter( isSearched(this.state.searchTerm) ).map(item => 
            <div key={item.objectID}>
                <h1><a href={item.url}>{item.title}</a> by {item.author}</h1>
                <h4>{item.num_comments} Comments | {item.points} Points</h4>
                <button type="button" 
                      onClick={() => this.removeItem(item.objectID)}

                >
                    Remove
                 </button>
            </div>          
        )
       }
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

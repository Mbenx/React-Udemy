import React, { Component } from 'react';
import list from './list';
import {Grid, Row} from 'react-bootstrap';
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
      list,
      searchTerm: ''
    }

    // bind functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);

  }
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

    const { list , searchTerm } = this.state;

    console.log(this);

    return (
      <div className="App">

        <Grid>
          <Row>
            <div className="jumbotron">
            <Search
              onChange={this.searchValue}  
              value={ searchTerm }
            >Search here...</Search>
            </div>
          </Row>
        </Grid>
        
        <Table 
          list={list}
          searchTerm={searchTerm}
          removeItem={this.removeItem}
        />       
        
      </div>
    );
  }
}

const Search = ({onChange,value,children}) => {
  return(
    <div>
      <form>
        {children}
        <input type="text" 
        onChange={onChange}  
        value={value}
        />
      </form>
    </div>
  )
}

const Table = ({list,searchTerm,removeItem}) => {
  return(
    <div>
      {
        list.filter( isSearched(searchTerm) ).map(item => 
          <div key={item.objectID}>
              <h1><a href={item.url}>{item.title}</a> by {item.author}</h1>
              <h4>{item.num_comments} Comments | {item.points} Points</h4>
              <Button
              type="button" 
              onClick={() => removeItem(item.objectID)}>
                    Remove me
              </Button>
          </div>          
      )
     }
    </div>
  )
}

const Button = ({onClick,children}) => <button onClick={onClick}>{children}</button>


export default App;

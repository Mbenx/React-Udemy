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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Search
          onChange={this.searchValue}  
          value={ searchTerm }
        >Search here...</Search>

        <Table 
          list={list}
          searchTerm={searchTerm}
          removeItem={this.removeItem}
        />       
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class Search extends Component{
  render(){
    const {onChange,value,children} = this.props;
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
}

class Table extends Component{
  render(){
    const {list,searchTerm,removeItem} = this.props;
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
}

// class Button extends Component{
//   render(){
//     const{onClick,type,children} = this.props;
//     return(
//       <div>
//         <button 
//           type={type} 
//           onClick={onClick}>
//             {children}
//         </button>
//       </div>
//     )
//   }
// }

// old version function 
// function Button({onClick, children}){
//   return(
//       <button
//         onClick={onClick}>
//         {children}
//       </button>
//   )
// }

// ES6 function

const Button = ({onClick,children}) => <button onClick={onClick}>{children}</button>


export default App;

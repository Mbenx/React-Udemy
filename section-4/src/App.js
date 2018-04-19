import React, { Component } from 'react';
// import list from './list';
import {Grid, Row, FormGroup} from 'react-bootstrap';

// deafult parameters to fetch data from the API
const DEFAULT_QUERY = 'React';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 20;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'histPerPage=';

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
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    // bind functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  //set top stories
  setTopStories(result){
    // get the hits and page from result
    const { hits,page } = result;
    // meaning page is not 0, button has been clicked page might be 1 or 2
    // old hits are already available in the state
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updateHits = [...oldHits, ...hits];
    this.setState({result: {hits: updateHits, page}});
  }

  // fetch top stories
  fetchTopStories(searchTerm, page){
    // beacause hist per page err 500
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
    // &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
    &${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setTopStories(result))
    .catch(err => err);
  }

  // componentDidMount
  componentDidMount(){
    this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
  }

  // on search submit function
  onSubmit(event){
    this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  removeItem(id){

    // old version
    // console.log('remove.item');
    // const isNotId = item => item.objectID !== id;
    // const updatedList = this.state.result.hits.filter(isNotId);
    // this.setState({result: Object.assign({}, this.state.result, {hits: updatedList})});
  
    // new version
    const {result} = this.state;
    const updatedList = result.hits.filter(item => item.objectID !== id);
    this.setState({result: {...result, hits: updatedList}});
  }

  searchValue(event){
    // console.log(event);
    this.setState({ searchTerm: event.target.value});
  }

  render() {

    const { result , searchTerm } = this.state;
    const page = (result && result.page) || 0;
    // if (!result){
    //   return null;
    // }
    console.log(this);

    return (
      <div>

        <Grid fluid>
          <Row>
            <div className="jumbotron text-center">
            <Search
              onChange={this.searchValue}  
              value={ searchTerm }
              onSubmit = {this.onSubmit}
            >News App</Search>
            </div>
          </Row>
        </Grid>
        {result &&
          <Table 
            list={result.hits}
            searchTerm={searchTerm}
            removeItem={this.removeItem}
          />
        }
        <div className="text-center alert">
          <Button
            className="btn btn-success"
            onClick={ () => this.fetchTopStories(searchTerm, page + 1)}
          >
            Load more  
          </Button>
        </div>      
        
      </div>
    );
  }
}

const Search = ({onChange,value,children,onSubmit}) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <h1 style={{ fontWeight: 'bold'}}>{children}</h1>
          <hr style={{ border: '2px solid black', width: '100px'}}/>
          
          <div className="input-group">
          
          <input 
          className="form-control width100 searchForm"
          type="text" 
          onChange={onChange}  
          value={value}
          />

          <span className="input-group-btn">
            <button
              className="btn btn-primary searchBtn"
              type="submit"
            >
              Search
            </button>
          </span>

          </div>
        </FormGroup>
      </form>
    </div>
  )
}

const Table = ({list,searchTerm,removeItem}) => {
  return(
    <div className="col-sm-10 col-sm-offset-1">
      {
        list.filter( isSearched(searchTerm) ).map(item => 
          <div key={item.objectID}>
              <h1><a href={item.url}>{item.title}</a> by {item.author}</h1>
              <h4>{item.num_comments} Comments | {item.points} Points
              <Button
              className="btn btn-danger btn-xs"
              type="button" 
              onClick={() => removeItem(item.objectID)}>
                    Remove me
              </Button>
              </h4> <hr/>
          </div>          
      )
     }
    </div>
  )
}

const Button = ({onClick,children,className=''}) => 
<button className={className} onClick={onClick}>{children}</button>


export default App;

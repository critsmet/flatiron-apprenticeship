import React, { Component } from 'react';
import SearchField from './SearchField'
import './App.css';

class App extends Component {

  state = {
    user: null,
    searchField: ''
    }

  updateUser = search => {
    fetch('http://www.api.github.com/users/' + search)
    .then(res => res.json())
    .then(res => this.setState(prevState => {
      return {
        ...prevState,
        user: res.data
      }
    }))
  }

  updateSearchField = search => {
    this.setState(prevState => {
      return {
        ...prevState,
        searchField: search
      }
    })
  }

  timeout = null

  handleUpdateSearchField = search => {
    clearTimeout(this.timeout)
    this.updateSearchField(search)
      this.timeout = setTimeout(function() {
        this.updateUser(search)
   }, 500);
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <img id="github-logo" alt="github logo" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"/>
          <span>GitHub Mini Profile</span>
          <SearchField handleUpdateSearchField={this.handleUpdateSearchField}/>
          { this.state.user !== null && <div>hi</div> }
        </div>
      </div>
    );
  }
}

export default App;

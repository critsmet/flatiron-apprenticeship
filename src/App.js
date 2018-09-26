import React, { Component } from 'react';
import SearchField from './SearchField'
import UserDisplay from './UserDisplay'
import './App.css';

class App extends Component {

  state = {
    user: null,
    searchField: ''
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

  handleErrors = (res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }

  handleUpdateSearchField = search => {

    const updateUser = search => {
      search === '' ? this.setState(prevState => ({...prevState, user: null})) :
      fetch('https://api.github.com/users/' + search)
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => this.setState(prevState => {
        return {
          ...prevState,
          user: res
        }
      }))
      .catch(error => alert("Please enter a valid GitHub username"))
    }

    clearTimeout(this.timeout)
    this.updateSearchField(search)
      this.timeout = setTimeout(function() {
        updateUser(search)
   }, 500);
 }

  render() {

    return (
      <div className="App">
        <div className="header">
          <img id="github-logo" alt="github logo" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"/>
          <span>GitHub Mini Profile</span>
          <SearchField handleUpdateSearchField={this.handleUpdateSearchField}/>
          { this.state.user !== null && <UserDisplay user={this.state.user} /> }
        </div>
      </div>
    );
  }
}

export default App;

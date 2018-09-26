import React from 'react'

export default class UserDisplay extends React.Component {

  state = {repos: []}

  fetchUserRepos = () => {
    fetch(this.props.user.repos_url)
    .then(res => res.json())
    .then(res => this.setState({repos: res}))
  }

  componentDidMount(){
    this.fetchUserRepos()
  }

  componentDidUpdate(prevProps){
    this.props.user !== prevProps.user && this.fetchUserRepos()
  }

  render() {

    const { user } = this.props

    const formattedRepos = this.state.repos.map(repo => {
      return <div key={repo.name}><a href={repo.html_url}>{repo.name}</a></div>
    })

    return (
      <div id="user-display">
        <div id="left-content">
          <a href={user.html_url}>
            <img alt={user.login + "photo"} src={user.avatar_url}/>
          </a>
          <div>
            {user.name && <div>{user.name}<br/><br/></div>}
            {user.bio && <div>{user.bio}<br/><br/></div>}
            {user.location && <div>{user.location}<br/><br/></div>}
            {user.blog && <a href={"http://" + user.blog}>{user.blog}</a>}
          </div>
        </div>
        <div id="right-content">
          some repositories:
          {formattedRepos}
        </div>
      </div>
    )
  }
}

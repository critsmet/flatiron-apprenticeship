import React from 'react'

const SearchField = props => {
  return (
      <input id="search-field" onChange={(e) => props.handleUpdateSearchField(e.target.value)} type="text" placeholder="enter a github username here"/>
  )
}

export default SearchField

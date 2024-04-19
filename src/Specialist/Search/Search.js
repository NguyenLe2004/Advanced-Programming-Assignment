import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
const Search = () => {

  return (
    <span className='searchBlock'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input placeholder='temp'/>
    </span>
  )
}

export default Search;

import React from 'react'
import "./DisplayDetailInfo.css"
const DisplayDetailInfo = ({citizenID}) => {
  console.log("here",citizenID)
  return (
    <div className='detail-block' >
      {citizenID}
    </div>
  )
}

export default DisplayDetailInfo;
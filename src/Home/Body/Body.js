import React from 'react'
import BodyNotAdmin from './BodyNotStaff/BodyNotAdmin'
import BodyStaff from './BodyStaff/BodyStaff'
const Body = ({role}) => {
  return (
    <div>
      {
        role==="null"  ? (
          <BodyNotAdmin />
        ) : (
          <BodyStaff role={role} />
        )
      }
      {/* <BodyNotAdmin/> */}
    </div>
  )
}

export default Body

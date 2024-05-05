import React from 'react'
import CarouselPart from './CarouselPart/CarouselPart'
import StatComponent from './StatComponent/StatComponent'
import CardComponent from './CardComponent/CardComponent'
import Review from './Review/Review'
const BodyNotStaff = () => {
  return (
    <div>
      <CarouselPart/>
      <StatComponent/>
      <CardComponent/>
      <Review/>
    </div>
  )
}

export default BodyNotStaff

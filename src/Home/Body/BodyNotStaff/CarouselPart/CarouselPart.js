import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./CarouselPart.css"
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import hospital_staff_1 from "../../../../Image/hospital_staff_1.jpeg"
import hospital_staff_2 from "../../../../Image/hospital_staff_2.jpeg"
import hospital_staff_3 from "../../../../Image/hospital_staff_3.jpeg"



const CarouselPart = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
    <Carousel style={{position:"relative",left:"50vw",width:"90vw",top:"10vh",borderRadius:"10px",overflow:"hidden",boxShadow:"0px 0px 10px 10px rgb(204, 230, 255,0.5)"}}  activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item  interval={3000}>
        <img style={{width:"100%",height:"60vh"}} src={hospital_staff_1} alt='image' />
      </Carousel.Item>
      <Carousel.Item  interval={3000}>
        <img style={{width:"100%",height:"60vh"}} src={hospital_staff_2} />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img style={{width:"100%",height:"60vh"}} src={hospital_staff_3} />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CarouselPart;

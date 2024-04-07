import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import hospital from "../../../../src/img/hospital.webp";
import image from "../../../../src/img/i1.jpg"

// import ExampleCarouselImage from 'components/ExampleCarouselImage';
const CarouselPart = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src='https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg' className='firstImg' alt='hospital1' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={hospital} className='firstImg' alt='hospotal2' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image} className='firstImg' alt='hospotal3' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
    

  );
}

export default CarouselPart;

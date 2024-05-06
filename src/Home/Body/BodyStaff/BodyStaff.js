import React, {useEffect, useState} from 'react'
import IntroPart from './IntroPart/IntroPart'
import ButtonGroup from './ButtonGroup/ButtonGroup'
import DashBoard from './DashBoard/DashBoard'
const BodyStaff = ({role}) => {
    const [shouldRenderDashboard, setShouldRenderDashboard] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight*0.55;
  
        if (scrollPosition > windowHeight ) {
          setShouldRenderDashboard(true);
        } else {
          setShouldRenderDashboard(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <div style={{minHeight: "200vh",display:"flex",alignItems:"center",flexDirection:"column"}}>
        <IntroPart />
        <ButtonGroup/>
        {shouldRenderDashboard && <DashBoard />}
    </div>
  )
}

export default BodyStaff
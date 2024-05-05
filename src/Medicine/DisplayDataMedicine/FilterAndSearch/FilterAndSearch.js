import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col,FloatingLabel } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"

const FilterAndSearch = ({setDataMedicineDisplay, dataMedicineDisplay}) => {
    const [isClickSearchIcon , setIsClickSearchIcon ] =useState(false)
    const searchBlockRef = useRef(null)
    const handleClickOutside = (event) => {
        if (searchBlockRef.current && !searchBlockRef.current.contains(event.target)) {
            setIsClickSearchIcon(false);
        }
      };
    useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
    }, []);
  return (
    <div className='search-filter-container' >
        <span className='search-block' ref={searchBlockRef}>
            <Form className={`search-form ${isClickSearchIcon ? 'active' : ""}`}>
                <Form.Group >
                     
            <Form.Control.Feedback type="invalid">
             Tên không hợp lệ
            </Form.Control.Feedback>
                </Form.Group>
            </Form>
            <span className={`search-icon ${isClickSearchIcon ? 'active' : ""}`} onClick={() => setIsClickSearchIcon(true)} >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
        </span>
        <span>
            <div style={{ border:"1px red solid",display:"flex"}}>
            <FloatingLabel
          controlId="floatingSelectGrid"
          label="Trạng thái"
        >
          <Form.Select aria-label="Floating label select example" onChange={(event) => {
          }}>
            <option></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Hạn sử dụng"
        >
            <Form.Control type='date' />
        </FloatingLabel>
            </div>
        </span>
    </div>
  )
}

export default FilterAndSearch

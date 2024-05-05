import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"
import moment from 'moment';
const FilterAndSearch = ({setDataMedicineDisplay, dataMedicineDisplay}) => {
    const [isClickSearchIcon , setIsClickSearchIcon ] =useState(false)
    const [searchValue, setSearchValue] = useState("");
    const searchBlockRef = useRef(null)
    const handleClickOutside = (event) => {
        if (searchBlockRef.current && !searchBlockRef.current.contains(event.target)) {
            setIsClickSearchIcon(false);
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchByName(searchValue);
        }
    }
    const searchByName =(name) =>{
        if(name===""){
            setDataMedicineDisplay(dataMedicineDisplay)
        }
        const searchedData = dataMedicineDisplay.filter(item => item.name === name);
        setDataMedicineDisplay(searchedData);
    }
    const filterDataByStatus = (status) => {
        if (status === "") {
            setDataMedicineDisplay(dataMedicineDisplay);
        } else {
            const filteredData = dataMedicineDisplay.filter(item => item.status === status);
            setDataMedicineDisplay(filteredData);
        }
    }
    const filterDataByExpire = (time) => {
        if (time === "") {
          setDataMedicineDisplay(dataMedicineDisplay);
        } else {
            const Date = moment();
            const filteredData = dataMedicineDisplay.filter(item => {
                const expireDay = moment(item.arrivalDate)
                const expire = expireDay.diff(Date, 'years');
                if (time === "> 10 năm") {
                    return expire > 10;
                } else if (time === "<= 10 năm") {
                    return expire <= 10;
                }
            });
            setDataMedicineDisplay(filteredData);
        }
    }
    const filterDataByCount = (count) => {
      if (count === "") {
          setDataMedicineDisplay(dataMedicineDisplay);
      } else if(count ==="> 5000") {
        const amountThreshold = parseInt(count.split(" ")[1]);
          const filteredData = dataMedicineDisplay.filter(item => item.amount > amountThreshold);
          setDataMedicineDisplay(filteredData);
      }
      else{
        const amountThreshold = parseInt(count.split(" ")[1]);
        const filteredData = dataMedicineDisplay.filter(item => item.amount <= amountThreshold);
          setDataMedicineDisplay(filteredData);
      }
  }
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
                    <Form.Control type='search' placeholder='Nhập tên thuốc'  pattern="^[a-zA-Z0-9]+$"
                             onChange={(e) => setSearchValue(e.target.value)}
                             onKeyDown={handleKeyDown}
                           />
            <Form.Control.Feedback type="invalid">
             Tên không hợp lệ
            </Form.Control.Feedback>
                </Form.Group>
            </Form>
            <span className={`search-icon ${isClickSearchIcon ? 'active' : ""}`} onClick={() => {
                setIsClickSearchIcon(true)
                }} >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
        </span>
        <span>
            <div style={{ border:"1px red solid"}}>
                <Form style={{display:"flex"}}>
                    <Row>
                    <Col>
                        <Form.Group>
                        <Form.Select onChange={(e) => {
                                        filterDataByStatus(e.target.value);
                                    }}>
                                        <option value="">Trạng thái</option>
                                        <option value="Hết thuốc">Hết thuốc</option>
                                        <option value="Sẵn sàng">Sẵn sàng</option>
                                        <option value="Hết hạn">Hết hạn</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Form.Select onChange={(e) => {
                                        filterDataByExpire(e.target.value);
                                    }}>
                                        <option value="">Hạn sử dụng</option>
                                        <option value="> 10 năm">Trên 10 năm</option>
                                        <option value="<= 10 năm">Dưới 10 năm</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                        <Form.Select onChange={(e) => {
                                        filterDataByCount(e.target.value);
                                    }}>
                                        <option value="">Số lượng</option>
                                        <option value="> 5000">Trên 5000</option>
                                        <option value="<= 5000">Dưới 5000</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            {/* <Form.Label>dsfjkgasfghdsfkuydgs</Form.Label> */}
                            <Form.Control type='date' placeholder='fsgdfs' />
                        </Form.Group>
                    </Col>
                    </Row>
                </Form>
                
            </div>
        </span>
    </div>
  )
}

export default FilterAndSearch

import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"
import moment from 'moment';
const FilterAndSearch = ({setDataEquipmentDisplay, dataEquipment}) => {
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
            setDataEquipmentDisplay(dataEquipment)
        }
        const searchedData = dataEquipment.filter(item => item.name === name);
        setDataEquipmentDisplay(searchedData);
    }
    const filterDataByStatus = (status) => {
        if (status === "") {
            setDataEquipmentDisplay(dataEquipment);
        } else {
            const filteredData = dataEquipment.filter(item => item.status === status);
            setDataEquipmentDisplay(filteredData);
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
                    <Form.Control type='search' placeholder='Nhập tên thiết bị'  pattern="^[a-zA-Z0-9]+$"
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
            <div style={{marginBottom:"2vh",marginLeft:"2vw"}}>
                <Form style={{display:"flex"}}>
                    <Row>
                    <Col>
                        <Form.Group>
                        <Form.Select onChange={(e) => {
                                        filterDataByStatus(e.target.value);
                                    }}>
                                        <option value="">Trạng thái</option>
                                        <option value="Đang sử dụng">Đang sử dụng</option>
                                        <option value="Sẵn sàng">Sẵn sàng</option>
                                        <option value="Đang bảo trì">Đang bảo trì</option>
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

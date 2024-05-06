import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"
import moment from 'moment';
const FilterAndSearch = ({setDataMedicineDisplay, dataMedicineDisplay}) => {
    const [isClickSearchIcon , setIsClickSearchIcon ] =useState(false)
    const [searchValue, setSearchValue] = useState("");
      const [statusFilter, setStatusFilter] = useState("");
    const [expireFilter, setExpireFilter] = useState("");
    const [countFilter, setCountFilter] = useState("");

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
    const filterData = () => {
        let filteredData = dataMedicineDisplay;

        if (statusFilter !== "") {
            filteredData = filteredData.filter(item => item.status === statusFilter);
        }

        if (expireFilter !== "") {
            const Date = moment();
            filteredData = filteredData.filter(item => {
                const expireDay = moment(item.arrivalDate);
                const expire = expireDay.diff(Date, 'years');
                if (expireFilter === "> 10 năm") {
                    return expire > 10;
                } else if (expireFilter === "<= 10 năm") {
                    return expire <= 10;
                }
            });
        }

        if (countFilter !== "") {
            if (countFilter === "> 5000") {
                filteredData = filteredData.filter(item => item.amount > 5000);
            } else if (countFilter === "<= 5000") {
                filteredData = filteredData.filter(item => item.amount <= 5000);
            }
        }

        setDataMedicineDisplay(filteredData);
    };

    useEffect(() => {
        filterData();
    }, [statusFilter, expireFilter, countFilter]);

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
            <div style={{marginBottom:"2vh",marginLeft:"2vw"}}>
                <Form style={{display:"flex"}}>
                    <Row>
                    <Col>
                        <Form.Group>
                        <Form.Select onChange={(e) => setStatusFilter(e.target.value)}>
                                        <option value="">Trạng thái</option>
                                        <option value="Hết thuốc">Hết thuốc</option>
                                        <option value="Sẵn sàng">Sẵn sàng</option>
                                        <option value="Hết hạn">Hết hạn</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                    <Form.Select onChange={(e) => setExpireFilter(e.target.value)}>
                                        <option value="">Hạn sử dụng</option>
                                        <option value="> 10 năm">Trên 10 năm</option>
                                        <option value="<= 10 năm">Dưới 10 năm</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                        <Form.Select onChange={(e) => setCountFilter(e.target.value)}>
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

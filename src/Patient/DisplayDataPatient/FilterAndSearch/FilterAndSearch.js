import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"
const FilterAndSearch = ({setDataPatientDisplay, dataPatient}) => {
    const [isClickSearchIcon , setIsClickSearchIcon ] =useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const searchBlockRef = useRef(null)
    const handleClickOutside = (event) => {
        if (searchBlockRef.current && !searchBlockRef.current.contains(event.target)) {
            setIsClickSearchIcon(false);
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchByCitizenID(searchValue);
        }
    }
    const searchByCitizenID =(citizenID) =>{
        if(citizenID===""){
            setDataPatientDisplay(dataPatient)
        }
        const searchedData = dataPatient.filter(item => item.citizenID === citizenID);
        setDataPatientDisplay(searchedData);
    }
    const filterData = () => {
        let filteredData = dataPatient;

        if (statusFilter !== "") {
            filteredData = filteredData.filter(item => item.status === statusFilter);
        }

        if (genderFilter !== "") {
            filteredData = filteredData.filter(item => item.gender === genderFilter);
        }

        if (ageFilter !== "") {
            filteredData = filteredData.filter(item => {
                const ageOfPatient = (item.age)
                if (ageFilter === "< 18 tuổi") {
                    return ageOfPatient < 18;
                } else if (ageFilter === ">= 18 tuổi") {
                    return ageOfPatient >= 18;
                }
            });
        }

        setDataPatientDisplay(filteredData);
    };
    useEffect(() => {
        filterData();
    }, [statusFilter, genderFilter, ageFilter]);
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
                    <Form.Control type='search' placeholder='Nhập CCCD'  pattern="^\d{12}"
                             onChange={(e) => setSearchValue(e.target.value)}
                             onKeyDown={handleKeyDown}
                           />
            <Form.Control.Feedback type="invalid">
             CCCD không hợp lệ
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
                                        <option value="Hoàn thành điều trị">Hoàn thành điều trị</option>
                                        <option value="Đang điều trị">Đang điều trị</option>
                                        <option value="Chưa điều trị">Chưa điều trị</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                    <Form.Select onChange={(e) => setGenderFilter(e.target.value)}>
                                        <option value="">Giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>        
                    <Form.Select onChange={(e) => setAgeFilter(e.target.value)}>
                                        <option value="">Tuổi</option>
                                        <option value="< 18 tuổi">Dưới 18 tuổi</option>
                                        <option value=">= 18 tuổi">Trên 18 tuổi</option>
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

import React, { useRef, useState, useEffect } from 'react'
import { Form, Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./FilterAndSearch.css"
import moment from 'moment';
const FilterAndSearch = ({setDataMedicalStaffDisplay, dataMedicalStaff, position}) => { 
    const [isClickSearchIcon , setIsClickSearchIcon ] =useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("");
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
            setDataMedicalStaffDisplay(dataMedicalStaff)
        }
        const searchedData = dataMedicalStaff.filter(item => item.citizenID === citizenID);
        setDataMedicalStaffDisplay(searchedData);
    }
    const filterData = () => {
        let filteredData = dataMedicalStaff;

        if (statusFilter !== "") {
            filteredData = filteredData.filter(item => item.status === statusFilter);
        }

        if (genderFilter !== "") {
            filteredData = filteredData.filter(item => item.gender === genderFilter);
        }

        if (ageFilter !== "") {
            filteredData = filteredData.filter(item => {
                const ageOfPatient = (item.age)
                if (ageFilter === "< 35 tuổi") {
                    return ageOfPatient < 35;
                } else if (ageFilter === ">= 35 tuổi") {
                    return ageOfPatient >= 35;
                }
            });
        }

        if (specialtyFilter !== "") {
            filteredData = filteredData.filter(item => item.specialty === specialtyFilter);
        }

        setDataMedicalStaffDisplay(filteredData);
    };

    useEffect(() => {
        filterData();
    }, [statusFilter, genderFilter, ageFilter, specialtyFilter]);

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
                                        <option value="Sẵn sàng">Sẵn sàng</option>
                                        <option value="Đang làm việc">Đang làm việc</option>
                                        <option value="Nghỉ phép">Nghỉ phép</option>
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
                                        <option value="< 35 tuổi">Dưới 35 tuổi</option>
                                        <option value=">= 35 tuổi">Trên 35 tuổi</option>
                                    </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
  <Form.Group>
   <Form.Select onChange={(e) => setSpecialtyFilter(e.target.value)}>
      <option value="">Chuyên Khoa</option>
      {position === 'specialist' && (
        <>
          <option value="Nội">Nội</option>
          <option value="Ngoại">Ngoại</option>
          <option value="Tim mạch">Tim mạch</option>
          <option value="Sản">Sản</option>
          <option value="Da liễu">Da liễu</option>
          <option value="Tai mũi họng">Tai mũi họng</option>
          <option value="Y học cổ truyền">Y học cổ truyền</option>
        </>
      )}
      {position === 'nurse' && (
        <>
          <option value="Hộ sinh">Hộ sinh</option>
          <option value="Gây mê hồi sức ">Gây mê hồi sức</option>
          <option value="Điều dưỡng">Điều dưỡng</option>
        </>
      )}
      {position === 'support' && (
        <>
          <option value="Nhân viên sữa chữa">Nhân viên sữa chữa</option>
          <option value="Nhân viên bảo vệ">Nhân viên bảo vệ</option>
          <option value="Tư vấn viên">Tư vấn viên</option>
          <option value="Nhân viên vệ sinh">Nhân viên vệ sinh</option>
        </>
      )}
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

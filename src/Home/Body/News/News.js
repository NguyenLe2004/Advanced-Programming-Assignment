import React from 'react'
import News1 from '../../../img/news1.png'
import './News.css'
export default function News() {
  return (
    <div class="container">
    <div class="borderOfNews">
            <div class="item-eq-height">
                <div class="image">
                    <div class="img-container">
                        <a href="http://www.sgh.com.sg/news/patient-care/getting-skinnier-meant-getting-fitter-to-me-more-men-seeking-help-for-eating-disorders" 
                        title="THÔNG BÁO CÁC QUI ĐỊNH MỚI">
                            <img class ="adjustSize" alt="Cập nhật các qui định mới về hệ thống quản lí bệnh viện" 
                            src={News1} /> </a>
                    </div>
                </div>
                <div class="description">
                    <span class="category">Thông báo</span>
                    <h3><a href="http://www.sgh.com.sg/news/patient-care/getting-skinnier-meant-getting-fitter-to-me-more-men-seeking-help-for-eating-disorders" 
                    title="THÔNG BÁO CÁC QUI ĐỊNH MỚI">Cập nhật các qui định mới về hệ thống quản lí bệnh viện</a></h3>
                    <span class="date">30 Mar 2024 | Lưu ý</span>
                </div>
            </div>
        </div>
        <div class="borderOfNews">
            <div class="item-eq-height">
                <div class="image">
                    <div class="img-container">
                        <a href="http://www.sgh.com.sg/news/patient-care/getting-skinnier-meant-getting-fitter-to-me-more-men-seeking-help-for-eating-disorders" 
                        title="Cập nhật thông tin điều trị bệnh nhân">
                            <img class ="adjustSize" alt="Các thông tin mới nhất về việc điều trị bệnh nhân" 
                            src={News1} /> </a>
                    </div>
                </div>
                <div class="description">
                    <span class="category">Bệnh nhân</span>
                    <h3><a href="http://www.sgh.com.sg/news/patient-care/getting-skinnier-meant-getting-fitter-to-me-more-men-seeking-help-for-eating-disorders"
                     title="Cập nhật thông tin điều trị bệnh nhân">Các thông tin mới nhất về việc điều trị bệnh nhân</a></h3>
                    <span class="date">27 Mar 2024 | Bệnh nhân</span>
                </div>
            </div>
        </div>
        </div>
  )
}

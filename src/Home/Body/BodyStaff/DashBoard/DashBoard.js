import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,registerables } from "chart.js";
import { Doughnut,Bar,Line,PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);
const DashBoard = () => {
  const data_medical_staff = {
    labels: ['Bác sĩ', 'Y tá', 'Nhân viên hỗ trợ'],
    datasets: [
      {
        data: [120, 150, 200],
        // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const data_patient_status = {
    labels: ['Đã điều trị', 'Đang điều trị', 'Chưa điều trị'],
    datasets: [
      {
        data: [30, 130, 5],
        // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const data_patient = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9'],
    datasets: [
      {
        type: 'bar', // Loại biểu đồ cột
        label: 'Lượng khách',
        data: [200, 300, 400, 600, 570,500,620,700,800],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        type: 'line', // Loại biểu đồ đường
        label: 'Doanh thu',
        data: [500, 800, 200, 800, 800,700,1200,1100,1500],
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const data = {
    datasets: [
      {
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        label: 'Dataset 1',
      },
    ],
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  };
  // Cấu hình của biểu đồ
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{width:"100vw",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    <div style={{display:"flex"}}>

      <div style={{height:"fit-content", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" }} >
        <h1>Số lượng khách và doanh thu mỗi tháng</h1>
        <Bar height={600} width={1000} data={data_patient} options={options} />
      </div>
      <div style={{margin:"0 2vw"}}>
        <Doughnut width={350} height={350} data={data_patient_status} />
        <Doughnut width={350} height={350} data={data_medical_staff} />
        
      </div>
    </div>
    </div>
  )
}

export default DashBoard

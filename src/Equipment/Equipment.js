import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DisplayDataEquipment from "./DisplayDataEquipment/DisplayDataEquipment";


const Equipment = ({role}) => {
  const [dataEquipment, setDataEquipment] = useState([]);
  const getLastUsageDatetime = (usageHistory) => {
    let lastUse = usageHistory[usageHistory.length - 1];
    return lastUse.dateEnd + " " + lastUse.timeEnd;
  };

  const getLastUsageRoom = (usageHistory) => {
    if(!usageHistory.length) return "Chưa được sử dụng"
    let lastUse = usageHistory[usageHistory.length - 1];
    return lastUse.room;
  };
  const getNextMaintain = (regularMaintenance) => {
    const curDate = moment();
    for (let i = 0; i < regularMaintenance.length; ++i) {
      const maintain = regularMaintenance[i];
      const dateBegin = moment(maintain.dateBegin, "DD-MM-YYYY");
      if (dateBegin.isAfter(curDate)) return dateBegin.format("DD-MM-YYYY");
    }
    return "Chưa có lịch bảo trì";
  };
  const getEquipStatus = (equipment) => {
    const curDatetime = moment();
    for (let i = equipment.usageHistory.length - 1; i >= 0; --i) {
      const his = equipment.usageHistory[i];
      const datetimeBegin = moment(
        his.dateBegin + " " + his.timeBegin,
        "DD-MM-YYYY HH:mm"
      );
      const datetimeEnd = moment(
        his.dateEnd + " " + his.timeEnd,
        "DD-MM-YYYY HH:mm"
      );
      if (curDatetime.isAfter(datetimeEnd)) break;
      if (curDatetime.isAfter(datetimeBegin)) return "Đang sử dụng";
    }
    for (let i = equipment.regularMaintenance.length - 1; i >= 0; --i) {
      const maintain = equipment.regularMaintenance[i];
      const dateBegin = moment(maintain.dateBegin, "DD-MM-YYYY");
      const dateEnd = moment(maintain.dateEnd, "DD-MM-YYYY");
      if (curDatetime.isAfter(dateEnd)) {
        return "Sẵn sàng";
      }
      if (curDatetime.isAfter(dateBegin)) return "Đang bảo trì";
    }
    return "Sẵn sàng";
  };
  useEffect(() => {
    const getAllEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/equipments");
        let data = response.data;
        console.log(data)
        await Promise.all(
          data.map(async (obj) => {
            const usageHistoryPromise = await axios.get(
              `http://localhost:8080/v1/equipments/${obj.id}/usageHistory`
            );
            obj.usageHistory = usageHistoryPromise.data;
            console.log(obj.name,obj.usageHistory )
            obj.lastUsageDatetime = ( obj.usageHistory.length ? getLastUsageDatetime(obj.usageHistory) : "Chưa được sử dụng");
            obj.lastUsageRoom = ( obj.usageHistory.length ?getLastUsageRoom(obj.usageHistory) : "Chưa được sử dụng" );
            obj.nextMaintain = getNextMaintain(obj.regularMaintenance);
            obj.status = getEquipStatus(obj);
          })
        );

        setDataEquipment(data);
      } catch (error) { 
        console.log(error);
      }
    };

    getAllEquipment();
  }, []);
  return (
    <div style={{height:"100vh"}}>
      <DisplayDataEquipment dataEquipment={dataEquipment} role = {role} />
    </div>
  );
};

export default Equipment;

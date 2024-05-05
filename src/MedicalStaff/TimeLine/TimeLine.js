import Timeline  from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const TimeLine = ({dataMedicalStaff}) => {
    // let groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
    let groups =[]
    let items = []
    let count_1 =1;
    let count_2 = 1;
    dataMedicalStaff.forEach(obj => {
        groups.push({
            id : count_1,
            title : obj.lastMiddleName + " " + obj.firstName,
            stackItems: true,
            height: 50
        })
        obj.schedule.forEach(schedule => {
            items.push({
                id : count_2++,
                group : count_1,
                title: schedule.title,
                start_time: moment(schedule.dateBegin + " " + schedule.timeBegin,"DD-MM-YYYY HH:mm"),
                end_time : moment(schedule.dateEnd + " " + schedule.timeEnd,"DD-MM-YYYY HH:mm") 
            })
        }) 
 
        count_1++;
    });

    return (
        <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      />
      );
}

export default TimeLine

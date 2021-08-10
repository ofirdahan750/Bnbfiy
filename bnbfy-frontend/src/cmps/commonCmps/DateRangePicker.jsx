import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




export const DateRangePicker = ({onToggleChoose,setDate}) => {
    const [currDate, setCurrDate] = useState({
        startDate: null,
        endDate: null,
    })
    const setDateRange = (dates) => {
        const [start, end] = dates;
        setCurrDate({
            startDate: start,
            endDate: end
        })
        
        
        setDate(start, end)
    }
    return (
        <div>
            <DatePicker
                selected={null}
                onChange={(update) => {
                    setDateRange(update);
                }}
                startDate={currDate.startDate}
                endDate={currDate.endDate}
                selectsRange={true}
                minDate={new Date()}
                monthsShown={2}
                inline
            />
        </div>
    )
}
// export class DateRangePicker extends Component {

//     state = {
//         date: null,
//         startDate: null,
//         endDate: null,
//     }


//     setDateRange = (dates) => {
//         const [start, end] = dates;

//         this.setState({
//             startDate:
//                 start, endDate: end
//         })
//         // if (start && end) this.props.onToggleChoose('date-picker')
//         // this.props.setDate(start, end)
//     }

//     render() {
//         const { startDate, endDate } = this.state;
//         return (
//             <div>
//                 <DatePicker
//                     selected={null}
//                     onChange={(update) => {
//                         this.setDateRange(update);
//                     }}
//                     startDate={startDate}
//                     endDate={endDate}
//                     selectsRange={true}
//                     minDate={new Date()}
//                     monthsShown={2}
//                     inline
//                 />
//             </div>
//         )
//     }
// }

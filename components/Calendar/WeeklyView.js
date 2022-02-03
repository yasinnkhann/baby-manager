import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

// import 'react-datepicker/dist/react-datepicker.css';

// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import BasicDatePicker from './BasicDatePicker.js';

function WeeklyView(props) {
  // const [startDate, setSelectedDate] = useState(new Date());
  return (
    <div className='self-center'>
      <BasicDatePicker setSelectedDate={props.setSelectedDate} />
      {/* <DatePicker
    //   className='mt-20 bg-[#ffe4e8] rounded-lg mx-[45px]'
    //   selected={props.selectedDate}
    //   onChange={date => {
    //     props.setSelectedDate(date);
    //   }}
    /> */}
    </div>
  );
}

export default WeeklyView;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function WeeklyView(props) {
  // const [startDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      className='mt-20 bg-[#ffe4e8] rounded-lg mx-[45px]'
      selected={props.selectedDate}
      onChange={date => {
        props.setSelectedDate(date);
      }}
    />
  );
}

export default WeeklyView;

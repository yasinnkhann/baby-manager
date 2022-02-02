import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function WeeklyView(props) {
  // const [startDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      className='mt-20 bg-[#CEF5F7] rounded-lg'
      selected={props.selectedDate}
      onChange={date => {
        props.setSelectedDate(date);
      }}
    />
  );
}

export default WeeklyView;

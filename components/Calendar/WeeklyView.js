import React from 'react';
import loadable from '@loadable/component';

const BasicDatePicker = loadable(() => import('./BasicDatePicker.js'));

function WeeklyView(props) {
  return (
    <div className='flex justify-center mb-4'>
      <BasicDatePicker setSelectedDate={props.setSelectedDate} />
    </div>
  );
}

export default WeeklyView;

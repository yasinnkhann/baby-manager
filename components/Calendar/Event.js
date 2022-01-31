import react, { useState, useEffect } from 'react';
import DiningIcon from '@mui/icons-material/Dining';
import SleepingIcon from '@mui/icons-material/LocalHotel';

function Event(props) {
  function getDuration(startTime, endTime) {}

  return (
    <div className='mx-20 box bg-[#EFF1FA] flex gap-x-20  justify-start border border-gray-600/75'>
      <div className='event-left'>
        <div className='start-time'>{props.startTime}</div>
        {props.type === 'eat' ? (
          <div className='duration text-xs text-slate-400'> 30m </div>
        ) : (
          <div className='duration text-slate-400'>
            {' '}
            {getDuration(props.startTime, props.endTime)}{' '}
          </div>
        )}
      </div>
      <div className='divider border border-gray-400/50'></div>
      <div className='my-6 event-right'>
        <div className='right-subcontainer'>
          <div className='baby-name mr-7 font-bold '>{props.babyName}</div>
          {props.type === 'eat' ? <DiningIcon /> : <SleepingIcon />}
        </div>
      </div>
    </div>
  );
}
export default Event;

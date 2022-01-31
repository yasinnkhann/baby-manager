import react, { useState, useEffect } from 'react';
import DiningIcon from '@mui/icons-material/Dining';
import SleepingIcon from '@mui/icons-material/LocalHotel';

function Event(props) {
  function getDuration(startTime, endTime) {}

  return (
    <div className='rounded mb-2 mx-20 box bg-[#EFF1FA] flex gap-x-20  justify-start border border-gray-600/75'>
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
          {props.gender === 'male' ? (
            <div className='baby-name text-[#85C9EA] mr-7 font-bold'> {props.babyName}</div>
          ) : (
            <div className='baby-name text-[#FF92B1] mr-7 font-bold'> {props.babyName}</div>
          )}
          {props.type === 'eat' ? <DiningIcon /> : <SleepingIcon />}
          {props.babyName === 'JakeB' ? (
            <div className='food-calendar align-start'>
              <div className='food-type ml-6'>protein</div>
              <div className='food-type ml-6'>1000 grams</div>
            </div>
          ) : (
            <div className='food-calendar align-start'>
              <div className='food-type ml-6'>{props.typeOfFood}</div>
              <div className='food-type ml-6'>{props.foodAmount}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Event;

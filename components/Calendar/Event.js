import react, { useState, useEffect } from 'react';
import DiningIcon from '@mui/icons-material/Dining';
import SleepingIcon from '@mui/icons-material/LocalHotel';

function Event(props) {
  function getDuration(startTime, endTime) {}

  // const [line, setLine] = useState(false)

  // var redLine = false;

  // function setLineFunc() {
  //   setLine(true);
  //   return <div className ='red-line'></div>
  // }

  // useEffect(()=> {
  //   console.log('a')
  // }. [line])

  // var lineOutput = '';
  // if(line) {
  //   lineOutput = <div className = 'line'></div>
  //   setLine(false);
  // }

  if (new Date().getTime() / 1000 < props.eventStartTime) {
    if (props.line === 'not set') {
      () => {
        props.handleLine(index, 'not set');
      };
    }
  }

  return (
    <>
      <div className='rounded mb-2  box bg-[#EFF1FA] flex gap-x-20  justify-start border border-gray-600/75'>
        <div className='event-left'>
          <div className='start-time'>{props.startTime}</div>
          {props.type === 'eat' ? (
            <div className='duration text-slate-400'>
              {' '}
              {getDuration(props.startTime, props.endTime)}{' '}
            </div>
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
            {!props.gender ? (
              <div className='baby-name text-[#85C9EA] mr-7 font-bold'> {props.babyName}</div>
            ) : (
              <div className='baby-name text-[#FF92B1] mr-7 font-bold'> {props.babyName}</div>
            )}
            {props.type === 'eat' ? <DiningIcon /> : <SleepingIcon />}
            {props.babyName === 'JakeB' ? (
              <div className='food-calendar align-start'>
                <div className='food-type ml-6'>protein</div>
                <div className='food-amount ml-6'>1000 grams</div>
              </div>
            ) : (
              <div className='food-calendar align-start'>
                {props.type === 'eat' ? (
                  <div>
                    <div className='food-type ml-6'>{props.typeOfFood}</div>
                    {props.foodMetric ? (
                      <div className='food-amount ml-6'>{`${props.foodAmount} ${props.foodMetric}`}</div>
                    ) : (
                      <div className='food-amount ml-6'>{`${props.foodAmount}`}</div>
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Event;

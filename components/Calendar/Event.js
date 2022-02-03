import react, { useState, useEffect } from 'react';
import DiningIcon from '@mui/icons-material/Dining';
import SleepingIcon from '@mui/icons-material/LocalHotel';
import { Paper } from '@mui/material';

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

  var lineOutput = '';
  if (new Date().getSeconds() < props.eventStartTime) {
    console.log('props.line', props.line);
    if (props.line[0] === 'not set') {
      console.log('running', props.line);

      props.handleLine(props.index, 'set line');
    }
    if (props.line === 'set at line') {
      if (index === props.line[1]) {
        lineOutput = <div className='line'></div>;
        props.handleLine(props.index, 'already set');
      }
    }
  }

  console.log(props.line);

  return (
    <>
      <Paper
        elevation={6}
        className='px-5 py-6 w-[100%]  mb-5 content-center my-[1%] flex flex-row justify-between items-center  shrink'
      >
        {/* <div className='rounded mb-2  box bg-[#DCEBFE] flex gap-x-20  justify-start border border-gray-600/75'> */}
        <div className='event-left'>
          <div className='text-[#A020F0] ml-1'>{props.startTime}</div>
          {props.type === 'eat' ? (
            <div className=' text-slate-400'>
              {' '}
              {getDuration(props.startTime, props.endTime)}{' '}
            </div>
          ) : (
            <div className=' text-slate-400'>
              {' '}
              {getDuration(props.startTime, props.endTime)}{' '}
            </div>
          )}
        </div>
        {/* <div className='border-solid border-2 border-pink-500'> */}
        {/* <div className='flex border-solid border-2 border-pink-500'> */}

        <div className='baby-name text-[#164e63] font-bold'> {props.babyName}</div>

        {props.type === 'eat' ? <DiningIcon /> : <SleepingIcon />}
        {props.babyName === 'JakeB' ? (
          <div className='food-calendar align-start'>
            <div className='food-type ml-6'>protein</div>
            <div className='food-amount ml-6'>1000 grams</div>
          </div>
        ) : (
          <div>
            {props.type === 'eat' ? (
              <div className='self-center flex flex-row flex-wrap'>
                <div>{`${props.foodAmount} ${props.foodMetric}`}</div>
                <div>{`${props.typeOfFood}`}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </Paper>
    </>
  );
}
export default Event;

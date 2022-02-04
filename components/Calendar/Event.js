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
    if (props.line[0] === 'not set') {
      props.handleLine(props.index, 'set line');
    }
    if (props.line === 'set at line') {
      if (index === props.line[1]) {
        lineOutput = <div className='line'></div>;
        props.handleLine(props.index, 'already set');
      }
    }
  }

  return (
    <>
      <Paper elevation={6} className=' content-center'>
        <div className='w-[325px] h-[60px] lg:w-[500px] md:w-[500px] rounded mb-2  flex justify-start gap-5'>
          <div className='start-time self-center text-[#A020F0] ml-3'>
            {props.startTime}
            <div className='divider ml-2 inline-block h-[50%] self-center border border-[#AA336A] opacity-25'></div>
          </div>

          <div className='baby-name self-center text-[#85C9EA] font-[600]'>
            {' '}
            {props.babyName}
          </div>
          {props.type === 'eat' ? (
            <DiningIcon className='self-center' />
          ) : (
            <SleepingIcon className='self-center' />
          )}

          {props.babyName === 'Jake' && props.type === 'eat' ? (
            <div className='food-type self-center '>
              {`protein, `}
              <div className='food-amount self-center'>{`1000 grams`}</div>
            </div>
          ) : (
            <>
              {props.type === 'eat' ? (
                <div className='food-type self-center '>
                  {`${props.typeOfFood}, ${props.foodAmount} ${props.foodMetric}`}
                  {/* {props.foodMetric ? (
                    <div className='food-amount self-center '>{`${props.foodAmount} ${props.foodMetric}`}</div>
                  ) : (
                    <div className='food-amount self-center'>{`${props.foodAmount}`}</div>
                  )} */}
                </div>
              ) : (
                ''
              )}
            </>
          )}
        </div>
      </Paper>
    </>
  );
}
export default Event;

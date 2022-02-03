import react, { useState, useEffect } from 'react';
import Event from './/Event.js';
import Link from 'next/link';
import BasicSelect from './BasicSelect.js';
import ColorToggleButton from './ColorToggleButton.js';
var events = [
  { babyName: 'Daniel', gender: 'male', type: 'sleep', startTime: '6AM', endTime: '12PM' },
  {
    babyName: 'Alissa',
    gender: 'female',
    type: 'eat',
    typeOfFood: 'milk',
    foodAmount: '28oz',
    startTime: '8AM',
  },
  { babyName: 'Derek', gender: 'male', type: 'sleep', startTime: '9AM', endTime: '12PM' },
  {
    babyName: 'JakeB',
    gender: 'male',
    type: 'eat',
    typeOfFood: 'milk',
    foodAmount: '28oz',
    startTime: '11AM',
  },
  { babyName: 'Ryan', gender: 'female', type: 'sleep', startTime: '3PM', endTime: '12PM' },
  {
    babyName: 'Yasin',
    gender: 'male',
    type: 'eat',
    typeOfFood: 'formula',
    foodAmount: '28oz',
    startTime: '4PM',
  },
  { babyName: 'Edward', gender: 'male', type: 'sleep', startTime: '7PM', endTime: '12PM' },
  {
    babyName: 'Hatha',
    gender: 'male',
    type: 'eat',
    typeOfFood: 'milk',
    foodAmount: '28oz',
    startTime: '9PM',
  },
  {
    babyName: 'Ryne',
    gender: 'male',
    type: 'eat',
    typeOfFood: 'formula',
    foodAmount: '28oz',
    startTime: '10PM',
  },
];

// useEffect(()=> {

// })

function ListView(props) {
  // const [date, setDate] = useState(currentDate());

  // function currentDate() {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();
  //   today = mm + '/' + dd + '/' + yyyy;
  //   return today;
  // }

  const [line, setLine] = useState(['not set', null]);

  const [view, setView] = useState('upcoming');

  function handleLine(index, status) {
    console.log(index);
    if (status === 'set line') {
      setLine(['set at index', index]);
    }
    if (status === 'already set') {
      setLine(['already set', index]);
    }
  }

  function convertToTime(seconds) {
    var seconds = seconds - 28800;
    var date = new Date(1970, 0, 1); // Epoch
    date = new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
      })
    );
    date.setSeconds(seconds);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    console.log(strTime);
    return strTime;
  }

  function handleToggleChange(view) {
    debugger;
    console.log(view);
    setView(view);
  }

  return (
    //   <div className='list-view-container mt-20 mb-10'>
    //     {console.log(props.sortedDayEvents)}
    //   {props.sortedDayEvents.map((event, i) => {
    //     return (
    //       <Event
    //         key={i}
    //         typeOfFood={event.foodType}
    //         foodAmount={event.foodAmount}
    //         type={event.type}
    //         babyName={event.babyName}
    //         startTime={event.startTime}
    //       />   border-solid border-4 border-blue-500
    //     );
    //   })}
    // </div>
    <>
      {/* {console.log('a',view, props.upcomingEvents.length)} */}
      {(view === 'upcoming' && props.upcomingEvents.length === 0) ||
      (view === 'completed' && props.pastEvents.length === 0) ? (
        <div>
          <div className='flex'>
            <div className='ml-10 mt-7 text-lg text-[#EFF1FA] mr-5'>
              {props.selectedDate.toDateString().slice(0, -5)}
            </div>
            <div className='ml-10 mt-5'>
              <ColorToggleButton handleToggleChange={handleToggleChange} />
            </div>
            {/* <button onClick = {() => setView('upcoming') }>Upcoming</button>
            <button onClick = {() => setView('completed') }>Completed</button>
            <button onClick = {() => setView('all') }>View All</button> */}
          </div>
          <div className='no-events mt-[20px] ml-5 text-[#A020F0]'>
            Oops, your calendar is empty.{' '}
            <div className='underline inline'>
              {' '}
              <br></br> <br></br>
              <Link className='text-[#A020F0]' href='/addBaby'>
                "Add A Baby"
              </Link>{' '}
            </div>
            {'or go to '}{' '}
            <div className='underline inline'>
              {' '}
              <Link href='/overview'> "Baby Overview"</Link>{' '}
            </div>{' '}
            to add feed/sleep events.
          </div>
        </div>
      ) : (
        <div>
          <div className='flex'>
            <div className='ml-10 mt-7 text-lg text-[#EFF1FA] mr-5'>
              {props.selectedDate.toDateString().slice(0, -5)}
            </div>
            <div className='ml-10 mt-5'>
              <ColorToggleButton handleToggleChange={handleToggleChange} />
            </div>
            {/* <button onClick = {() => setView('upcoming') }>Upcoming</button>
            <button onClick = {() => setView('completed') }>Completed</button>
            <button onClick = {() => setView('all') }>View All</button> */}
          </div>

          <div className='list-view-container mr-10 mt-5 mb-10'>
            {props.sortedDayEvents.map((event, i, array) => {
              console.log(event.status, view);
              if (view === 'all') {
                return (
                  <Event
                    key={i}
                    handleLine={handleLine}
                    index={i}
                    line={line}
                    arrayLength={array.length}
                    foodMetric={event.foodMetric}
                    typeOfFood={event.foodType}
                    foodAmount={event.foodAmount}
                    type={event.type}
                    babyName={event.babyName}
                    eventStartTime={event.startTime.seconds}
                    startTime={convertToTime(event.startTime.seconds)}
                  />
                );
              } else {
                if (view === event.status) {
                  return (
                    <Event
                      key={i}
                      handleLine={handleLine}
                      index={i}
                      line={line}
                      arrayLength={array.length}
                      foodMetric={event.foodMetric}
                      typeOfFood={event.foodType}
                      foodAmount={event.foodAmount}
                      type={event.type}
                      babyName={event.babyName}
                      eventStartTime={event.startTime.seconds}
                      startTime={convertToTime(event.startTime.seconds)}
                    />
                  );
                }
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default ListView;

import react, { useState, useEffect } from 'react';
import Event from './/Event.js';
import Link from 'next/link';

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

  function handleLine(index, status) {
    console.log(index);
    if (status === 'not set') {
      setLine([set, index]);
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
    //       />
    //     );
    //   })}
    // </div>
    <>
      {props.sortedDayEvents.length === 0 ? (
        <div className='no-events'>
          No events on schedule.{' '}
          <Link className='text-[#00008B]' href='/addBaby'>
            {' '}
            "Add A Baby"
          </Link>{' '}
          or <Link href='/overview'> go to "Baby Overview" to add a feed/sleep event.</Link>
        </div>
      ) : (
        <div className='list-view-container mr-10 mt-10 mb-10'>
          {props.sortedDayEvents.map((event, i, array) => {
            return (
              <Event
                key={i}
                index={i}
                line={line === i}
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
          })}
        </div>
      )}
    </>
  );
}
export default ListView;

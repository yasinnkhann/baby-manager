import react, { useState, useEffect } from 'react';
import Event from './/Event.js';

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

function ListView() {
  const [date, setDate] = useState(currentDate());

  function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  return (
    <div className='list-view-container mt-20 mb-10'>
      {events.map((event, i) => {
        return (
          <Event
            key={i}
            gender={event.gender}
            typeOfFood={event.typeOfFood}
            foodAmount={event.foodAmount}
            type={event.type}
            babyName={event.babyName}
            startTime={event.startTime}
          />
        );
      })}
    </div>
  );
}
export default ListView;

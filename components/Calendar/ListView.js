import react, { useState, useEffect } from 'react';
import Event from './/Event.js';

var events = [
  { babyName: 'Daniel', type: 'sleep', startTime: '9AM', endTime: '12PM' },

  {
    babyName: 'Daniel',
    type: 'eat',
    typeOfFood: 'milk',
    foodAmount: '28oz',
    startTime: '1PM',
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
    <div className='listview-container mt-20'>
      {events.map((event, i) => {
        return (
          <Event
            key={i}
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

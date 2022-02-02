import WeeklyView from '../components/Calendar/WeeklyView.js';
import ListView from '../components/Calendar/ListView.js';
import { db } from '../firebaseConfig.js';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, where } from 'firebase/firestore';

function Calendar() {
  const [selectedDate, setDate] = useState(new Date());
  // const [allEvents, setAllEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [sortedDayEvents, setSortedDayEvents] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  function sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  // var orderEvents = async ()=> {
  //   console.log('dayEvents in orderEvents()', dayEvents  )
  //   var sortedDayEvents = dayEvents.sort( (a, b) => {
  //    return (a.startTime.seconds - b.startTime.seconds)
  //   })
  //   setSortedDayEvents(sortedDayEvents);
  // }

  useEffect(() => {
    //     // getUsers();
    //     // getCurrentUserID();
    if (user) {
      getCurrentUserBabyFeedingEvents();
      // getCurrentUserBabySleepingEvents();
      // orderEvents();
    }
  }, [user, selectedDate]); //eslint-disable-line
  //   // var getCurrentUserID = async () => {
  //   //   if (user) {
  //   //     console.log('userID: ', user.uid);
  //   //   }
  //   // }

  // var getUsers = async () => {
  //   const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", "test@email.com")));
  //   querySnapshot.forEach((doc) => {
  //     console.log((doc.data()));
  //   });
  // }

  // })

  const feedingEventsArray = [];
  const sleepingEventsArray = [];

  var getCurrentUserBabyFeedingEvents = async () => {
    try {
      const babies = collection(db, 'users', user.uid, 'babies');
      const querySnapshot = await getDocs(babies);
      const feedingEventsArray = [];

      querySnapshot.forEach(async doc => {
        // const feedingEvents = collection(db, "users", user.uid, "babies", doc.id);
        // const querySnapshot = await getDocs(feedingEvents);
        // console.log(babyName)
        const babyName = doc.data().babyName;

        // GET ALL FEEDING EVENTS FOR CURRENT BABY AND PUSH TO feedingEventsArray

        const feedingEvents = collection(
          db,
          'users',
          user.uid,
          'babies',
          doc.id,
          'feedingEvents'
        );
        const feedingQuerySnapshot = await getDocs(feedingEvents);
        feedingQuerySnapshot.forEach(doc => {
          var feedingEvent = doc.data();
          feedingEvent['babyName'] = babyName;
          feedingEvent['type'] = 'eat';
          feedingEventsArray.push(feedingEvent);
        });
        console.log('feedingEvents: ', feedingEventsArray);

        // GET ALL SLEEPING EVENTS FOR CURRENT BABY AND PUSH TO sleepingEventsArray

        const sleepingEvents = collection(
          db,
          'users',
          user.uid,
          'babies',
          doc.id,
          'sleepingEvents'
        );

        const sleepingQuerySnapshot = await getDocs(sleepingEvents);
        sleepingQuerySnapshot.forEach(doc => {
          var sleepingEvent = doc.data();
          sleepingEvent['babyName'] = babyName;
          sleepingEvent['type'] = 'sleep';
          sleepingEventsArray.push(sleepingEvent);
          // console.log(new Date(events[0].startTime.seconds * 1000));
        });

        console.log('sleepingEventsArray ', sleepingEventsArray);

        var combinedEvents = feedingEventsArray.flat().concat(sleepingEventsArray.flat());

        console.log('combinedEvents ', combinedEvents);

        var dayEvents = combinedEvents.filter(event => {
          var seconds = event.startTime.seconds;
          var date = new Date(seconds * 1000);
          return sameDay(date, selectedDate);
        });
        var sortedDayEvents = dayEvents.sort((a, b) => {
          return a.startTime.seconds - b.startTime.seconds;
        });
        setSortedDayEvents(sortedDayEvents);

        console.log('sortedEvents', sortedDayEvents);
      });
      // feedingEventsArray.push(feedingEventsData);
    } catch {
      console.log(error);
    }
  };

  var getCurrentUserBabySleepingEvents = async () => {
    try {
      const babies = collection(db, 'users', user.uid, 'babies');
      const querySnapshot = await getDocs(babies);

      querySnapshot.forEach(async doc => {
        console.log(babyName);

        // const feedingEvents = collection(db, "users", user.uid, "babies", doc.id);
        // const querySnapshot = await getDocs(feedingEvents);
        const babyName = doc.data().babyName;
        const sleepingEventsData = [];
        const sleepingEvents = collection(
          db,
          'users',
          user.uid,
          'babies',
          doc.id,
          'sleepingEvents'
        );
        const sleepingQuerySnapshot = await getDocs(sleepingEvents);
        sleepingQuerySnapshot.forEach(doc => {
          // console.log(doc.data())
          var sleepingEvent = doc.data();
          sleepingEvent['babyName'] = babyName;
          sleepingEvent['type'] = 'sleep';
          sleepingEventsData.push(sleepingEvent);
          // console.log(new Date(events[0].startTime.seconds * 1000));
        });
        console.log('sleepingEventsData ', sleepingEventsData);
        // console.log('allEvents ', allEvents);

        var combinedEvents = feedingEventsArray.flat().concat(sleepingEventsData.flat());
        console.log('combinedEvents ', combinedEvents);

        var dayEvents = combinedEvents.filter(event => {
          console.log(combinedEvents);
          var seconds = event.startTime.seconds;
          var date = new Date(seconds * 1000);
          return sameDay(date, selectedDate);
        });
        console.log('combined dayevents ', dayEvents);
        var sortedDayEvents = dayEvents.sort((a, b) => {
          return a.startTime.seconds - b.startTime.seconds;
        });
        console.log('sorted dayevents ', sortedDayEvents);
        setSortedDayEvents(sortedDayEvents);
      });
    } catch {
      console.log(error);
    }
  };

  var setSelectedDate = function (date) {
    console.log(date);
    setDate(date);
  };

  return (
    <div>
      <WeeklyView setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <div className='xsm:w-[300px] md:w-[600px]'>
        <ListView sortedDayEvents={sortedDayEvents} selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default Calendar;

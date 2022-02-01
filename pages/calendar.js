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
  const [dayEvents, setDayEvents] = useState([]);
  const [feedingEvents, setFeedingEvents] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  function sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  useEffect(() => {
    //     // getUsers();
    //     // getCurrentUserID();
    if (user) {
      getCurrentUserBabyFeedingEvents();
      getCurrentUserBabySleepingEvents();
    }
  }, [user]); //eslint-disable-line
  //   // var getCurrentUserID = async () => {
  //   //   if (user) {
  //   //     console.log('userID: ', user.uid);
  //   //   }
  //   // }
  var getCurrentUserBabyFeedingEvents = async () => {
    const babies = collection(db, 'users', user.uid, 'babies');
    const querySnapshot = await getDocs(babies);
    const eventsData = [];
    querySnapshot.forEach(doc => {
      // const feedingEvents = collection(db, "users", user.uid, "babies", doc.id);
      // const querySnapshot = await getDocs(feedingEvents);
      querySnapshot.forEach(async doc => {
        const feedingEvents = collection(
          db,
          'users',
          user.uid,
          'babies',
          doc.id,
          'feedingEvents'
        );
        const querySnapshot = await getDocs(feedingEvents);
        querySnapshot.forEach(doc => {
          eventsData.push(doc.data());
          setFeedingEvents(eventsData);
        });
      });
    });
  };

  var getCurrentUserBabySleepingEvents = async () => {
    const babies = collection(db, 'users', user.uid, 'babies');
    const querySnapshot = await getDocs(babies);
    querySnapshot.forEach(doc => {
      // const feedingEvents = collection(db, "users", user.uid, "babies", doc.id);
      // const querySnapshot = await getDocs(feedingEvents);
      const eventsData = [];
      querySnapshot.forEach(async doc => {
        const sleepingEvents = collection(
          db,
          'users',
          user.uid,
          'babies',
          doc.id,
          'sleepingEvents'
        );
        const querySnapshot = await getDocs(sleepingEvents);
        querySnapshot.forEach(doc => {
          // console.log(doc.data())
          eventsData.push(doc.data());
          // console.log(new Date(events[0].startTime.seconds * 1000));
          const testEvents = [...feedingEvents, ...eventsData];
          var dayEvents = testEvents.filter(event => {
            var seconds = event.startTime.seconds;
            var date = new Date(seconds * 1000);
            return sameDay(date, selectedDate);
          });
          console.log("today's events: ", eventsData);
          setDayEvents(dayEvents);
        });
      });
    });
  };

  //   // var getUsers = async () => {
  //   //   const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", "test@email.com")));
  //   //   querySnapshot.forEach((doc) => {
  //   //     console.log((doc.data()));
  //   //   });
  //   // }

  //   })
  return (
    <>
      <WeeklyView />
      <ListView />
    </>
  );
}

export default Calendar;

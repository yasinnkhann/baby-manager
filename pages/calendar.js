import WeeklyView from '../components/Calendar/WeeklyView.js';
import ListView from '../components/Calendar/ListView.js';
import { db } from '../firebaseConfig.js';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, where } from 'firebase/firestore';
import Head from 'next/head';

function Calendar() {
  const [selectedDate, setDate] = useState(new Date());
  // const [allEvents, setAllEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [sortedDayEvents, setSortedDayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [user, loading, error] = useAuthState(auth);

  function sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function categorizeStatus(seconds) {
    if (seconds < new Date().getTime() / 1000) {
      return 'completed';
    } else {
      return 'upcoming';
    }
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
        const babyName = doc.data().name;

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
          feedingEvent['status'] = categorizeStatus(doc.data().startTime.seconds);
          feedingEventsArray.push(feedingEvent);
        });

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
          sleepingEvent['status'] = categorizeStatus(doc.data().startTime.seconds);
          sleepingEventsArray.push(sleepingEvent);
          // console.log(new Date(events[0].startTime.seconds * 1000));
        });

        var combinedEvents = feedingEventsArray.flat().concat(sleepingEventsArray.flat());

        var dayEvents = combinedEvents.filter(event => {
          var seconds = event.startTime.seconds;
          var date = new Date(seconds * 1000);
          return sameDay(date, selectedDate);
        });
        var sortedDayEvents = dayEvents.sort((a, b) => {
          return a.startTime.seconds - b.startTime.seconds;
        });
        setSortedDayEvents(sortedDayEvents);

        var upcomingEvents = sortedDayEvents.filter(event => {
          return event.status === 'upcoming';
        });
        setUpcomingEvents(upcomingEvents);

        var pastEvents = sortedDayEvents.filter(event => {
          return event.status === 'completed';
        });
        setPastEvents(pastEvents);
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

        var dayEvents = combinedEvents.filter(event => {
          var seconds = event.startTime.seconds;
          var date = new Date(seconds * 1000);
          return sameDay(date, selectedDate);
        });
        var sortedDayEvents = dayEvents.sort((a, b) => {
          return a.startTime.seconds - b.startTime.seconds;
        });
        setSortedDayEvents(sortedDayEvents);
      });
    } catch {
      console.log(error);
    }
  };

  var setSelectedDate = function (date) {
    setDate(date);
  };

  return (
    <div className='my-[25%] lg:my-[7%] md:my-[14%]'>
      <Head>
        <title>BabyManager | Calendar</title>
      </Head>
      <WeeklyView setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <div className='xsm:w-[300px] md:w-[600px]'>
        <ListView
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
          sortedDayEvents={sortedDayEvents}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default Calendar;

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import loadable from '@loadable/component';

const WeeklyView = loadable(() => import('../components/Calendar/WeeklyView.js'));
const ListView = loadable(() => import('../components/Calendar/ListView.js'));

function Calendar() {
  const [selectedDate, setDate] = useState(new Date());
  const [sortedDayEvents, setSortedDayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [user, _, error] = useAuthState(auth);

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

  useEffect(() => {
    if (user) {
      getCurrentUserBabyFeedingEvents();
    }
  }, [user, selectedDate]); // eslint-disable-line

  const sleepingEventsArray = [];

  var getCurrentUserBabyFeedingEvents = async () => {
    try {
      const babies = collection(db, 'users', user.uid, 'babies');
      const querySnapshot = await getDocs(babies);
      const feedingEventsArray = [];

      querySnapshot.forEach(async doc => {
        const babyName = doc.data().name;

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
    } catch {
      console.log(error);
    }
  };

  var setSelectedDate = function (date) {
    setDate(date);
  };

  return (
    <div className='mt-[calc(var(--header-height)+4rem)] flex justify-center'>
      <Head>
        <title>BabyManager | Calendar</title>
      </Head>
      <div>
        <WeeklyView setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        <div>
          <ListView
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            sortedDayEvents={sortedDayEvents}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;

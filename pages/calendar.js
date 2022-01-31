import WeeklyView from '../components/Calendar/WeeklyView.js';
import ListView from '../components/Calendar/ListView.js';
import { db } from '../firebaseConfig.js';

import { collection, getDocs } from 'firebase/firestore';

const querySnapshot = await getDocs(collection(db, 'feedingEvents'));
querySnapshot.forEach(doc => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, ' => ', doc.data());
});

function Calendar() {
  return (
    <>
      <WeeklyView />
      <ListView />
    </>
  );
}

export default Calendar;

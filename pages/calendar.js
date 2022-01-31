import WeeklyView from '../components/Calendar/WeeklyView.js';
import ListView from '../components/Calendar/ListView.js';
import { db } from '../firebaseConfig.js';
import { useEffect } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, where } from 'firebase/firestore';

function Calendar() {
  //   const [user, loading, error] = useAuthState(auth);
  //   // var getCurrentUserID = async () => {
  //   //   if (user) {
  //   //     console.log('userID: ', user.uid);
  //   //   }
  //   // }

  //   var getCurrentUserBabies = async () => {
  //     if (user) {
  //       const babies = collection(db, "users", user.uid, "babies");
  //       const querySnapshot = await getDocs(babies);
  //       querySnapshot.forEach(async (doc) => {
  //         const feedingEvents = collection(db, "users", user.uid, "babies", doc.id);
  //         const querySnapshot = await getDocs(baby);
  //       });
  //     }
  //   }

  //   // var getUsers = async () => {
  //   //   const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", "test@email.com")));
  //   //   querySnapshot.forEach((doc) => {
  //   //     console.log((doc.data()));
  //   //   });
  //   // }

  //   useEffect(()=> {
  //     // getUsers();
  //     // getCurrentUserID();
  //     getCurrentUserBabies();
  //   })
  return (
    <>
      <WeeklyView />
      <ListView />
    </>
  );
}

export default Calendar;

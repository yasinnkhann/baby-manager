import { db } from '../../firebaseConfig.js';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
} from 'firebase/firestore';

export const getServerSidePaths = async () => {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  // const data = await res.json();

  // const paths = data.map(baby => {
  //   return {
  //     params: { id: baby.id.toString() },
  //   };
  // });

  // return {
  //   paths,
  //   fallback: false,
  // };

  ///////////////////////
  const babyRef = collection(db, 'baby');
  const data = await getDocs(babyRef);

  const babies = data.docs.map(doc => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getServerSideProps = async context => {
  const id = context.params.id;

  const feedRef = collection(db, 'baby', `${id}`, 'feedingEvents');
  const feedSnap = await getDocs(feedRef);

  const feedQuery = query(feedRef, orderBy('startTime', 'desc'));
  const feeds = await getDocs(feedQuery);
  const sortedFeeds = feeds.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const sleepRef = collection(db, 'baby', `${id}`, 'sleepingEvents');
  // const sleepSnap = await getDocs(sleepRef);

  const sleepQuery = query(sleepRef, orderBy('startTime', 'desc'));
  const sleeps = await getDocs(sleepQuery);
  const sortedSleeps = sleeps.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // const feeds = feedSnap.docs.map(doc =>
  //   ({ id: doc.id, ...doc.data()})
  // );

  // const sleeps = sleepSnap.docs.map(doc =>
  //   ({ id: doc.id, ...doc.data()})
  // )

  console.log('feeds:', sortedFeeds);
  console.log('sleeps:', sortedSleeps);

  return {
    props: { baby: JSON.stringify(feedSnap) },
  };

  // const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  // const data = await res.json();

  // return {
  //   props: { baby: data },
  // };
};

const Baby = ({ baby }) => {
  return (
    <div
      className='container mx-auto md:grid md:place-content-center'
      style={{ padding: '2rem' }}
    >
      <div className='md:sb-container md:grid-cols-1'>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center'>
          <div className='place-self-center'>
            <div style={{ backgroundColor: 'lightgreen', width: '150px', height: '150px' }}>
              Baby Picture
            </div>
          </div>
          <div>
            <b>{baby.name}</b>
            <div className='sb-buffer'></div>
            <b>Baby Asleep???</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Last Feed</b>
          </div>
          <div>
            <b>{baby.email}</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Next Feed</b>
          </div>
          <div>
            <b>{baby.phone}</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Last Nap</b>
          </div>
          <div>
            <b>{baby.username}</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Next Nap</b>
          </div>
          <div>
            <b>{baby.website}</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
          <div className='sb-buffer'>
            <button
              style={{ width: '300px' }}
              className='rounded-md border-2  border-emerald-400'
            >
              Add New Feed
            </button>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
          <div className='sb-buffer'>
            <button
              style={{ width: '300px' }}
              className='rounded-md border-2 border-emerald-400'
            >
              Add New Nap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const Baby = ({ baby }) => {
//   return(
//     <div>
//       <h1>{baby.name}</h1>
//     </div>
//   )
// }

export default Baby;

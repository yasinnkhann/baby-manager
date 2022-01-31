import Link from 'next/link';
import { db } from '../../firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(res => res.json())
//   .then(json => console.log(json));

export const getServerSideProps = async () => {
  // const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // const data = await res.json();

  // return {
  //   props: { baby: data },
  // };

  const babyRef = collection(db, 'baby');
  const data = await getDocs(babyRef);

  const babies = data.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { docs: JSON.stringify(babies) },
  };
};

const BabyIndex = ({ docs }) => {
  return (
    <>
      {/* {console.log(docs)} */}
      <div style={{ paddingTop: '100px' }}></div>
      {JSON.parse(docs).map((doc, index) => {
        return (
          <Link href={`/baby/${doc.id}`} key={doc.id}>
            <a>
              <h4>{doc.babyName}</h4>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default BabyIndex;

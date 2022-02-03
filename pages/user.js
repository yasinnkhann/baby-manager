import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig.js';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import Link from 'next/link';
import { Paper, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
const crypto = require('crypto');

export default function User() {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [authorizedUsers, setAuthorizedUsers] = useState([]);
  const router = useRouter();
  // console.log('authorizedUsers:', authorizedUsers);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      console.log('user:', user);
      getAuthorizedUsers().then(() => console.log('authorizedUsers:', authorizedUsers));
    }
  }, [user, loading]);

  const createInvitation = async token => {
    await addDoc(collection(db, 'invitations'), {
      inviter_id: user.uid,
      emailSentTo: email,
      token: token,
      accepted: false,
    });
  };

  const handleChange = () => {
    setEmail(event.target.value);
  };

  const handleInviteButton = async e => {
    e.preventDefault();
    const token = crypto.randomBytes(8).toString('hex');
    const body = {
      name: user.displayName,
      email: email,
      token: token,
    };
    createInvitation(token);
    const res = await fetch('/api/invite', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    alert('Invite Sent!');
  };

  let theme = createTheme({
    palette: {
      primary: {
        main: '#ec4899',
      },
      secondary: {
        main: '#be185d',
      },
    },
  });

  const getAuthorizedUsers = async () => {
    console.log('getAuthorizedUsers invoked...');
    // console.log('user:', user);
    // const q = query(collection(db, 'users', user.uid, 'authorized_users'));
    const q = collection(db, 'users', user.uid, 'authorized_users');
    const querySnapshot = await getDocs(q);
    console.log('querySnapshot:', querySnapshot);

    // const querySnapshot = await getDocs(db, 'users', user.uid, 'authorized_users');
    let authorizedUsersData = [];
    querySnapshot.forEach(async doc1 => {
      const docRef = doc(db, 'users', doc1.data().userId);
      const docSnap = await getDoc(docRef);
      console.log('docSnap.data():', docSnap.data());
      console.log(doc1.id, ' => ', doc1.data());
      console.log(`first: ${docSnap.data().firstName + ' last: ' + docSnap.data().lastName}`);
      authorizedUsersData.push(`${docSnap.data().firstName + ' ' + docSnap.data().lastName}`);

      setAuthorizedUsers(authorizedUsersData);

      // setAuthorizedUsers(authorizedUsersData);
    });
    // console.log('authorizedUsersData:', authorizedUsersData);
    // setAuthorizedUsers(authorizedUsersData);
    // return authorizedUsers;
  };

  return user ? (
    <ThemeProvider theme={theme}>
      <article>
        <section className='h-screen  flex flex-col justify-start mx-[10%] xs:my-[15%] my-[25%]'>
          <h1 className='font-medium self-center text-[30px] md:text-4xl lg:text-5xl mb-[5%]'>
            My Profile
          </h1>
          <Paper elevation={6} className='p-3 content-center mb-[10%]'>
            <div>
              <div>Name: {user.displayName}</div>
              <div>Email: {user.email}</div>
              <div>Phone Number: {user.phoneNumber}</div>
              <div>[List of names that are authorized to manage your baby details]</div>
            </div>
          </Paper>

          <div>
            <div>
              <form onSubmit={handleInviteButton}>
                <TextField
                  className='w-full '
                  label='Invite a user to manage your babies'
                  type='email'
                  color='primary'
                  onChange={handleChange}
                  variant='outlined'
                ></TextField>
                <div className='flex flex-row justify-between my-2'>
                  <Button
                    className='text-stone-900 bg-cyan-200  hover:bg-pink-500 h-[5%] mt-[3%] '
                    variant='contained'
                    type='submit'
                  >
                    Invite
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </article>
    </ThemeProvider>
  ) : null;
}

// return user ? (
//   <article>
//     <section className='h-screen  flex flex-col justify-center mx-[2%]'>
//       <div>User Profile</div>
//       <div>
//         <div>Name: {user.displayName}</div>
//         <div>Email: {user.email}</div>
//         <div>Phone Number: {user.phoneNumber}</div>
//       </div>
//       <div>
//         <br />
//         <div>Invite another user to manage your babies</div>
//         <div>
//           <form onSubmit={handleInviteButton}>
//             <input type='email' onChange={handleChange}></input>
//             <button type='submit'>Invite User</button>
//           </form>
//         </div>
//         <br />
//         <div>
//           <div>
//             Users that can manage your babies:
//             <div>User 1</div>
//             <div>User 2</div>
//             <div>User 3</div>
//             <br />
//             {authorizedUsers
//               ? authorizedUsers.map((user, index) => <div key={index}>{user}</div>)
//               : null}

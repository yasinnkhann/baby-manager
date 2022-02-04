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
  const [authorizedUsers, setAuthorizedUsers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      getAuthorizedUsers();
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
    const q = collection(db, 'users', user.uid, 'authorized_users');
    const querySnapshot = await getDocs(q);
    let authorizedUsersData = [];
    let tempData = [];

    querySnapshot.forEach(doc1 => {
      tempData.push(doc1.data());
    });
    for (let data of tempData) {
      var temp = {};
      const docRef = doc(db, 'users', data.userId);
      const docSnap = await getDoc(docRef);

      temp.firstName = docSnap.data().firstName;
      temp.lastName = docSnap.data().lastName;
      authorizedUsersData.push(temp);
    }
    setAuthorizedUsers(authorizedUsersData);
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
              <div>Users that can manage your babies:</div>
              <div>
                {authorizedUsers
                  ? authorizedUsers.map((user, index) => (
                      <div key={index}>{user.firstName + ' ' + user.lastName}</div>
                    ))
                  : null}
              </div>
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

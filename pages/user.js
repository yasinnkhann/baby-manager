import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig.js';
import { collection, doc, setDoc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { Paper, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const crypto = require('crypto');

export default function User() {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const getUserInfo = async () => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const createInvitation = async token => {
    // const docRef = await addDoc(collection(db, 'users', user.uid, 'invitations'), {
    //   emailSentTo: email,
    //   token: token,
    //   accepted: false,
    // });
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

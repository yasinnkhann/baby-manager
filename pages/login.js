import React, { useState } from 'react';
import Head from 'next/head';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider, db } from '../firebaseConfig.js';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { query } = useRouter();
  const inviteToken = query;
  // console.log('login form inviteToken:', inviteToken);

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({ ...loginInfo, hasChanged: true, [name]: value });
  };

  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const user = res.user;
      user.firstName = user.displayName.split(' ')[0];
      user.lastName = user.displayName.split(' ')[1];
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
      console.log('USER @ LOGIN: ', user);
      if (inviteToken) {
        router.push({
          pathname: '/overview',
          query: inviteToken,
        });
      } else {
        router.push('/overview');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      console.log('LOGGED IN @: ', userCredential);
      if (inviteToken) {
        router.push({
          pathname: '/overview',
          query: inviteToken,
        });
      } else {
        router.push('/overview');
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setLoginInfo({
      email: '',
      password: '',
    });
  };

  const goToRegisterPage = () => {
    if (inviteToken) {
      router.push(
        {
          pathname: '/register',
          query: inviteToken,
        },
        '/'
      );
    } else {
      router.push('/register');
    }
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

  return (
    <ThemeProvider theme={theme}>
      <div className='h-screen flex flex-col content-center font-["Rubik"]'>
        <Head>
          <title>BabyManager | Login</title>
        </Head>
        <div className='w-full max-w-xs m-auto bg-indigo-100/75 rounded p-5'>
          <Button
            onClick={googleSignIn}
            className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
            variant='contained'
          >
            Login with Google
          </Button>

          <fieldset>
            <form onSubmit={handleSubmit} className='font-["Rubik"]'>
              <TextField
                className='w-full mb-2 '
                type='email'
                color='primary'
                id='email'
                label='Email:'
                name='email'
                variant='filled'
                onChange={handleChange}
              ></TextField>

              <TextField
                className='w-full mb-2 '
                type='password'
                color='primary'
                id='password'
                label='Password:'
                name='password'
                variant='filled'
                onChange={handleChange}
              ></TextField>

              <Button
                className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
                type='submit'
              >
                Login
              </Button>
            </form>
          </fieldset>

          <div className='justify-self-center text-center'>
            <button onClick={goToRegisterPage} className='text-blue-500 hover:text-pink-700'>
              Don&apos;t have an account? Sign up here!
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

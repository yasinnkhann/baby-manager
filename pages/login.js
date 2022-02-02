import React, { useState } from 'react';
import Head from 'next/head';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider, db } from '../firebaseConfig.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { query } = useRouter();
  const inviteToken = query;
  if (inviteToken) {
    console.log('login form inviteToken:', inviteToken);
  }

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

  const registerButton = () => {
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
      <div className='h-screen  flex flex-col content-center font-["Rubik"]'>
        <Head>
          <title>Login</title>
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
              {/* <label htmlFor='email' className='block mb-2 text-pink-500 font-["Rubik"]'>
                Email:
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={loginInfo.email}
                onChange={handleChange}
                className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
              /> */}

              <TextField
                className='w-full mb-2 '
                type='email'
                color='primary'
                id='email'
                label='Email:'
                name='email'
                variant='filled'
                onChange={handleChange}
                required
              ></TextField>

              {/* <label htmlFor='password' className='block mb-2 text-pink-500'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={loginInfo.password}
                onChange={handleChange}
                className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
              /> */}

              <TextField
                className='w-full mb-2 '
                type='password'
                color='primary'
                id='password'
                label='Password:'
                name='password'
                variant='filled'
                onChange={handleChange}
                required
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
            <button onClick={registerButton}>Don&apos;t have an account? Sign up here!</button>
            {/* <Link href='/register'>
              <a className='text-blue-700 hover:text-pink-700 text-sm '>
                Don&apos;t have an account? Sign up here!
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

import Head from 'next/head';
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const { query } = useRouter();
  const inviteToken = query;
  // console.log('register form inviteToken:', inviteToken);

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo({ ...registerInfo, hasChanged: true, [name]: value });
  };

  const handleSubmit = async e => {
    const { email, password, confirmPassword } = registerInfo;
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(
          userDoc,
          {
            firstName: registerInfo.firstName,
            lastName: registerInfo.lastName,
            email: registerInfo.email,
            phoneNumber: registerInfo.phoneNumber ? registerInfo.phoneNumber : null,
            lastSeen: serverTimestamp(),
          },
          { merge: true }
        );
        await updateProfile(auth.currentUser, {
          displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
        });

        user.phoneNumber = registerInfo.phoneNumber;

        console.log('REGISTERED AS: ', user);
        if (inviteToken) {
          router.push(
            {
              pathname: '/',
              query: inviteToken,
            },
            '/'
          );
        } else {
          router.push('/');
        }
        setRegisterInfo({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    } else {
      alert('passwords do not match');
    }
  };

  const goToLoginPage = () => {
    if (inviteToken) {
      router.push(
        {
          pathname: '/login',
          query: inviteToken,
        },
        '/'
      );
    } else {
      router.push('/login');
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
      <Head>
        <title>BabyManager | Register</title>
      </Head>
      <div className='h-screen my-[10%] flex flex-col px-5 font-["Rubik"]'>
        <h1 className='text-blue-500 text-center text-xl mb-10 mt-[10%] '>
          Create an Account
        </h1>

        <form className='flex flex-col mx-10 font-["Rubik"]' onSubmit={handleSubmit}>
          <TextField
            className='w-full mb-2 '
            color='secondary'
            id='firstName'
            label='First Name:'
            name='firstName'
            variant='filled'
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            className='w-full mb-2'
            color='secondary'
            id='lastName'
            label='Last Name:'
            name='lastName'
            variant='filled'
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            className='w-full mb-2'
            type='email'
            color='secondary'
            id='email'
            label='Email:'
            name='email'
            variant='filled'
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            className='w-full mb-2'
            type='tel'
            color='secondary'
            id='phoneNumber'
            label='Phone Number (optional):'
            name='phoneNumber'
            variant='filled'
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            onChange={handleChange}
          ></TextField>

          <TextField
            className='w-full mb-2'
            type='password'
            color='secondary'
            id='password'
            label='Password:'
            name='password'
            variant='filled'
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            className='w-full  mb-2'
            type='password'
            color='secondary'
            id='confirmPassword'
            label='Confirm Password:'
            name='confirmPassword'
            variant='filled'
            onChange={handleChange}
            required
          ></TextField>

          <Button
            className='w-full p-2 my-2 bg-indigo-700 hover:bg-pink-700 text-white font-bold rounded'
            type='submit'
          >
            Register
          </Button>
        </form>

        <div className='justify-self-center text-center'>
          <button
            onClick={goToLoginPage}
            className='text-blue-500 hover:text-pink-700 text-sm'
          >
            Have an account? Login here!
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}

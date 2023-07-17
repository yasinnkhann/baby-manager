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

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { query } = useRouter();
  const inviteToken = query;

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({ ...loginInfo, hasChanged: true, [name]: value });
  };

  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
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

  return (
    <div className='h-screen flex flex-col content-center'>
      <Head>
        <title>BabyManager | Login</title>
      </Head>
      <div className='w-full max-w-xs m-auto bg-indigo-100/75 rounded p-5'>
        <button
          onClick={googleSignIn}
          className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded font-["Arial"]'
        >
          Login with Google
        </button>

        <fieldset>
          <form onSubmit={handleSubmit}>
            <label className='block mb-2 text-indigo-500' htmlFor='username'>
              Email:
            </label>
            <input
              className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
              type='email'
              id='email'
              label='Email:'
              name='email'
              onChange={handleChange}
            />

            <label className='block mb-2 text-indigo-500' htmlFor='password'>
              Password:
            </label>
            <input
              className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
              type='password'
              id='password'
              label='Password:'
              name='password'
              onChange={handleChange}
            />

            <button
              className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded font-["Arial"]'
              type='submit'
            >
              Login
            </button>
          </form>
        </fieldset>

        <div className='justify-self-center text-center'>
          <button
            className='text-blue-700 text-sm hover:text-pink-700'
            onClick={goToRegisterPage}
          >
            Don&apos;t have an account? Sign up here!
          </button>
        </div>
      </div>
    </div>
  );
}

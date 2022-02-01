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

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

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
      router.push(
        {
          pathname: '/',
          query: 'test query',
        },
        '/'
      );
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
      router.push('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setLoginInfo({
      email: '',
      password: '',
    });
  };

  return (
    <div className='h-screen my-[20%]'>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <button onClick={googleSignIn}>Login with Google</button>
        <br />
        <br />
        <fieldset>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              value={loginInfo.email}
              onChange={handleChange}
            />
            <br />
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              value={loginInfo.password}
              onChange={handleChange}
            />
            <br />
            <button>Login</button>
          </form>
        </fieldset>

        <Link href='/register'>
          <a>Don&apos;t have an accout? Sign up here!</a>
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Head from 'next/head';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, provider } from '../firebaseConfig.js';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  // const [user, setUser] = useState({});
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  // onAuthStateChanged(auth, currentUser => {
  //   setUser(currentUser);
  // });

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({ ...loginInfo, hasChanged: true, [name]: value });
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(res => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const user = res.user;
        console.log(token);
        console.log(user);
        router.push('/');
      })
      .catch(err => console.error(err));
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
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <button onClick={signIn}>Login with Google</button>
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

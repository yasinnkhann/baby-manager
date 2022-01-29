import React, { useState } from 'react';
import Link from 'next/link';
import { auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function Register() {
  const [user, setUser] = useState({});
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  //   const [createUserWithEmailAndPassword, user, loading, error] =
  //     useCreateUserWithEmailAndPassword(auth);

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
  });

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo({ ...registerInfo, hasChanged: true, [name]: value });
  };

  const handleSubmit = async e => {
    const { email, password, confirmPassword } = registerInfo;
    e.preventDefault();
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } else {
      alert('passwords do not match');
    }
    setRegisterInfo({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          name='email'
          value={registerInfo.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          name='password'
          value={registerInfo.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor='confirmPassword'>Confirm Password: </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={registerInfo.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button>Register</button>
      </form>
      <Link href='/login'>
        <a>Have an account? Login here!</a>
      </Link>
    </div>
  );
}

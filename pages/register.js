import React, { useState } from 'react';
import Link from 'next/link';
import { auth, db } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
        router.push('/');
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    } else {
      alert('passwords do not match');
    }
    setRegisterInfo({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className='h-screen my-[10%]'>
      <h1 className='text-blue-500 text-center text-xl'>Create an Account</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName' className='block mb-2 text-pink-500'>
          First Name:
        </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={registerInfo.firstName}
          onChange={handleChange}
          required
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <label htmlFor='lastName' className='block mb-2 text-pink-500'>
          Last Name:
        </label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={registerInfo.lastName}
          onChange={handleChange}
          required
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <label htmlFor='email' className='block mb-2 text-pink-500'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={registerInfo.email}
          onChange={handleChange}
          required
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <label htmlFor='phoneNumber' className='block mb-2 text-pink-500'>
          Phone Number (optional):
        </label>
        <input
          type='tel'
          id='phoneNumber'
          name='phoneNumber'
          value={registerInfo.phoneNumber}
          onChange={handleChange}
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <label htmlFor='password' className='block mb-2 text-pink-500'>
          Password:
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={registerInfo.password}
          onChange={handleChange}
          required
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <label htmlFor='confirmPassword' className='block mb-2 text-pink-500'>
          Confirm Password:
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={registerInfo.confirmPassword}
          onChange={handleChange}
          required
          className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
        />
        <br />
        <button className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'>
          Register
        </button>
      </form>
      <Link href='/login'>
        <a className='text-blue-500 hover:text-pink-700 text-sm float-left'>
          Have an account? Login here!
        </a>
      </Link>
    </div>
  );
}

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
      router.push('/');
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
    <div className='h-screen my-[10%]'>
      <Head>
        <title>Login</title>
      </Head>
      <div className='w-full max-w-xs m-auto bg-indigo-100 rounded p-5'>
        <button
          onClick={googleSignIn}
          className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
        >
          Login with Google
        </button>
        <br />
        <fieldset>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email' className='block mb-2 text-pink-500'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={loginInfo.email}
              onChange={handleChange}
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
              value={loginInfo.password}
              onChange={handleChange}
              className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
            />
            <br />
            <button className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'>
              Login
            </button>
          </form>
        </fieldset>

        <Link href='/register'>
          <a className='text-blue-700 hover:text-pink-700 text-sm float-left'>
            Don&apos;t have an account? Sign up here!
          </a>
        </Link>
        <Link href='/resetPassword'>
          <a className='text-blue-700 hover:text-pink-700 text-sm float-left'>
            Forgot Password?
          </a>
        </Link>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import Head from 'next/head';
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import { auth, provider, db } from '../firebaseConfig.js';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// export default function Login() {
//   const [loginInfo, setLoginInfo] = useState({
//     email: '',
//     password: '',
//   });
//   const router = useRouter();

//   const handleChange = ({ target: { name, value } }) => {
//     setLoginInfo({ ...loginInfo, hasChanged: true, [name]: value });
//   };

//   const googleSignIn = async () => {
//     try {
//       const res = await signInWithPopup(auth, provider);
//       const credential = GoogleAuthProvider.credentialFromResult(res);
//       const token = credential.accessToken;
//       const user = res.user;
//       user.firstName = user.displayName.split(' ')[0];
//       user.lastName = user.displayName.split(' ')[1];
//       const userRef = doc(db, 'users', user.uid);
//       await setDoc(
//         userRef,
//         {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           lastSeen: serverTimestamp(),
//         },
//         { merge: true }
//       );
//       console.log('USER @ LOGIN: ', user);
//       router.push('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         loginInfo.email,
//         loginInfo.password
//       );
//       console.log('LOGGED IN @: ', userCredential);
//       router.push('/');
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//     setLoginInfo({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <div className='h-screen my-[10%]'>
//       <Head>
//         <title>Login</title>
//       </Head>
//       <div className='w-full max-w-xs m-auto bg-indigo-100 rounded p-5'>
//         <button
//           onClick={googleSignIn}
//           className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
//         >
//           Login with Google
//         </button>
//         <br />
//         <fieldset>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor='email' className='block mb-2 text-pink-500'>
//               Email:
//             </label>
//             <input
//               type='email'
//               id='email'
//               name='email'
//               value={loginInfo.email}
//               onChange={handleChange}
//               className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
//             />
//             <br />
//             <label htmlFor='password' className='block mb-2 text-pink-500'>
//               Password:
//             </label>
//             <input
//               type='password'
//               id='password'
//               name='password'
//               value={loginInfo.password}
//               onChange={handleChange}
//               className='w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300'
//             />
//             <br />
//             <button className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'>
//               Login
//             </button>
//           </form>
//         </fieldset>

//         <Link href='/register'>
//           <a className='text-blue-700 hover:text-pink-700 text-sm float-left'>
//             Don&apos;t have an account? Sign up here!
//           </a>
//         </Link>
//       </div>
//     </div>
//   );
// }

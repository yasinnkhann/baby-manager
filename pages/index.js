import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig.js';
import LoadingPage from '../components/LoadingPage.js';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { query } = useRouter();
  const inviteToken = query;
  console.log(" '/' inviteToken", inviteToken);

  useEffect(() => {
    const updateUsers = async () => {
      if (user) {
        console.log('INDEX USER: ', user);
        console.log('DISPLAY NAME: ', user.displayName);
        const docRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(docRef);
        console.log('DOC SS', docSnapshot?.data());
        await setDoc(
          doc(db, 'users', user.uid),
          {
            firstName: docSnapshot?.data()?.firstName,
            lastName: docSnapshot?.data()?.lastName,
            email: user.email,
            phoneNumber: docSnapshot?.data()?.phoneNumber,
            lastSeen: serverTimestamp(),
          },
          { merge: true }
        );
      }
    };
    updateUsers();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('signed out!');
      // router.push('/login'); //uncomment after testing
      router.push('/login'); // Derek added, delete after testing
    } catch (err) {
      console.error(err);
    }
  };

  const handleUser = () => {
    if (loading) {
      return <LoadingPage />;
    }

    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }

    const registerButton = () => {
      if (inviteToken) {
        router.push({
          pathname: '/register',
          query: inviteToken,
        });
      } else {
        router.push('/register');
      }
    };

    if (user) {
      if (inviteToken) {
        router.push({
          pathname: '/overview', //Change to /overview after testing
          query: inviteToken,
        });
      } else {
        router.push('/overview'); //Change to /overview after testing
      }
    }

    if (!user) {
      // router.push('/login'); //uncomment after testing
      router.push('/login'); // Derek added, delete after testing
    }
  };

  return <>{handleUser()}</>;
}

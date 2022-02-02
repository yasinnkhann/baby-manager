import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/router';
const Coupons = () => {
  const [localCoupons, setLocalCoupons] = useState(null);
  const [onlineCoupons, setOnlineCoupons] = useState(null);
  const [currentLoc, setCurrentLoc] = useState(undefined);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      if (!currentLoc) {
        getLocation();
      }
      fetchCoupons();
    }
  }, [user, loading, currentLoc]); //eslint-disable-line

  const fetchCoupons = async () => {
    try {
      const { data: online } = await axios.get('https://api.discountapi.com/v2/deals', {
        params: {
          api_key: process.env.NEXT_PUBLIC_DISCOUNTS_API,
          category_slugs: 'baby',
          online: true,
        },
      });
      setOnlineCoupons(online.deals);
      if (currentLoc) {
        console.log('THISONE ::::', currentLoc);
        const { data: local } = await axios.get('https://api.discountapi.com/v2/deals', {
          params: {
            api_key: process.env.NEXT_PUBLIC_DISCOUNTS_API,
            location: currentLoc,
            category_slugs: 'baby',
          },
        });
        setLocalCoupons(local.deals);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLoc(pos);
        },
        () => {
          console.log('user denied permission');
          setCurrentLoc('denied');
        }
      );
    }
  };

  return (
    <div className='h-screen my-[10%]'>
      <Head>
        <title>Baby Manager | Coupons</title>
      </Head>
      <h1>Coupons</h1>
      <section>
        <p>Coupons</p>
      </section>
    </div>
  );
};

export default Coupons;

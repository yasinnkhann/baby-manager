import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);

  return (
    <>
      <Head>
        <title>Baby Manager | Coupons</title>
      </Head>
      <h1>Coupons</h1>
      <section>
        <p>Coupons</p>
      </section>
    </>
  );
};

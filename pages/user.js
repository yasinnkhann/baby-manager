import { useState } from 'react';
import Link from 'next/link';

export default function User() {
  const [email, setEmail] = useState('');

  const handleChange = () => {
    setEmail(event.target.value);
  };

  const handleInviteButton = async e => {
    e.preventDefault();

    const response = await fetch('/api/invite', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('data from api:', data);
    alert('Invite Sent!');
  };

  return (
    <article>
      <section className='h-screen my-[10%]'>
        <div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Phone Number</div>
        </div>
        <div>
          <div>[List of names that are authorized to manage your baby details]</div>
          <div>Invite another user to manage your babies</div>
          <div>
            <form onSubmit={handleInviteButton}>
              <input type='text' onChange={handleChange}></input>
              <button type='submit'>Invite User</button>
            </form>
            {/* <Link href='/'>
            <a>Invitation Link</a>
          </Link> */}
            <div>
              <button>Sign Out Button</button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

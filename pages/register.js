import React, { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo({ ...registerInfo, hasChanged: true, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('submitted!');
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

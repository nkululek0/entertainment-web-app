import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/authentication')({
  component: RouteComponent,
});

function RouteComponent() {
  const [authenticationType, setAuthenticationType] = useState<'login' | 'signup'>('login');

  return (
    <>
    <div className='authentication-container'>
      {
        authenticationType == 'login' &&
        <section className='authentication-wrapper'>
          <h2>Login</h2>
          <form className='authentication-form login-form'>
            <input type='email' className='form-input' placeholder='Email address'/>
            <input type='password' className='form-input' placeholder='Password'/>
            <button>Login to your account</button>
          </form>
          <div className='authentication-actions-container'>
            <p>Don't have an account?</p>
            <button onClick={ () => setAuthenticationType('signup') }>Sign Up</button>
          </div>
        </section>
      }
      {
        authenticationType == 'signup' &&
        <section className='authentication-wrapper'>
          <h2>Sign Up</h2>
          <form className='authentication-form signup-form'>
            <input type='email' className='form-input' placeholder='Email address'/>
            <input type='password' className='form-input' placeholder='Password'/>
            <input type='password' className='form-input' placeholder='Repeat password'/>
            <button>Create an account</button>
          </form>
          <div className='authentication-actions-container'>
            <p>Already have an account?</p>
            <button onClick={ () => setAuthenticationType('login') }>Login</button>
          </div>
        </section>
      }
    </div>
    </>
  );
};
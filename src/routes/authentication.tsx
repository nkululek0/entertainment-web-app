import { useState, useRef } from 'react';

import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { login, signUp } from '@/lib/supabase-client.ts';

import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/authentication')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [authenticationType, setAuthenticationType] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const loginInputs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null)
  };
  const signupInputs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    repeatPassword: useRef<HTMLInputElement>(null)
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const { data, error } = await login(loginInputs.email.current?.value ?? '', loginInputs.password.current?.value ?? '');

    if (error) {
      alert('Error logging in: ' + error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    console.log(data);
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (signupInputs.password.current?.value !== signupInputs.repeatPassword.current?.value) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(signupInputs.email.current?.value ?? '', signupInputs.password.current?.value ?? '');

    if (error) {
      alert('Error signing up: ' + error.message);
      setIsLoading(false);
      return;
    }

    // alert(`Check your email (${ signupInputs.email.current?.value }) to verify your account`);
    setIsLoading(false);
    setTimeout(() => navigate({ to: '/authentication' }), 4500);
  };

  return (
    <>
    <div className='authentication-container'>
      {
        authenticationType == 'login' &&
        <section className='authentication-wrapper'>
          <h2>Login</h2>
          <form className='authentication-form login-form' onSubmit={ handleLogin }>
            <input
              ref={ loginInputs.email }
              type='email'
              className='form-input'
              placeholder='Email address'
              defaultValue={ loginInputs.email.current?.value }
              required
            />
            <input
              ref={ loginInputs.password }
              type='password'
              className='form-input'
              placeholder='Password'
              defaultValue={ loginInputs.password.current?.value }
              required
            />
            <button type='submit'>
              {
                isLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Login to your account'
              }
            </button>
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
          <form className='authentication-form signup-form'  onSubmit={ handleSignup }>
            <input
              ref={ signupInputs.email }
              type='email'
              className='form-input'
              placeholder='Email address'
              defaultValue={ signupInputs.email.current?.value }
              required
            />
            <input
              ref={ signupInputs.password }
              type='password'
              className='form-input'
              placeholder='Password'
              defaultValue={ signupInputs.password.current?.value }
              required
            />
            <input
              ref={ signupInputs.repeatPassword }
              type='password'
              className='form-input'
              placeholder='Repeat password'
              defaultValue={ signupInputs.repeatPassword.current?.value }
              required
            />
            <button type='submit'>
              {
                isLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Create an account'
              }
            </button>
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
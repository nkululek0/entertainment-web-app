import { useState, useRef } from 'react';

import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { toast } from 'react-toastify';

import { login, signUp, setUserProfile, getUserProfile, sendPasswordResetLink } from '@/lib/supabase-client.ts';
import { useProfile } from '@/stores/profile';

import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/authentication')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [authenticationType, setAuthenticationType] = useState<'login' | 'signup' | 'forgot-password'>('login');
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
  const forgotPasswordInputs = {
    email: useRef<HTMLInputElement>(null)
  };
  const { setIsLoggedIn } = useProfile();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (signupInputs.password.current?.value !== signupInputs.repeatPassword.current?.value) {
      toast.error('Error signing up: Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(signupInputs.email.current?.value ?? '', signupInputs.password.current?.value ?? '');

    if (error) {
      toast.error(`Error signing up: ${ error.message }`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success('Signed up successfully, please check your email to verify your account');
    setAuthenticationType('login');
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const loginData = await login(loginInputs.email.current?.value ?? '', loginInputs.password.current?.value ?? '');

    if (!loginData) throw new Error('Error logging in');

    const { error } = loginData;

    if (error) {
      toast.error('Error logging in: ' + error.message);
      setIsLoading(false);
      return;
    }

    const { data } = await getUserProfile(loginData.data.user.email);

    if (!data) {
      const { error: userProfileError } = await setUserProfile(loginData.data.user.email);

      if (userProfileError) {
        toast.error('Error setting user profile: ' + userProfileError.message);
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    setIsLoggedIn(true);
    toast.success('Logged in successfully');
    navigate({ to: '/', search: { page: 1 } });
  };

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { error } = await sendPasswordResetLink(forgotPasswordInputs.email.current?.value ?? '');

    if (error) {
      toast.error(`Error sending password reset link: ${ error.message }`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success('Password reset link sent successfully, please check your email');
  }

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
          <div className='additional-actions-container'>
            <button onClick={ () => setAuthenticationType('forgot-password') } className='forgot-password-button'>Forgot Password</button>
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
      {
        authenticationType === 'forgot-password' &&
        <section className='authentication-wrapper'>
          <h2>Reset Password</h2>
          <form className='form forgot-password-form' onSubmit={ handleForgotPassword }>
            <input
              ref={ forgotPasswordInputs.email }
              type='email'
              className='form-input'
              placeholder='Email address'
              defaultValue={ forgotPasswordInputs.email.current?.value }
              required
            />
            <button type='submit'>
              {
                isLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Reset Password'
              }
            </button>
          </form>
          <div className='additional-actions-container'>
            <button onClick={ () => setAuthenticationType('login') } className='forgot-password-button'>Back to Login</button>
          </div>
        </section>
      }
    </div>
    </>
  );
};
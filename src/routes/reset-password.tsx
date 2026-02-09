import { useRef, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';

import { resetPassword } from '@/lib/supabase-client';
import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const formInputs = {
    password: useRef<HTMLInputElement>(null),
    repeatPassword: useRef<HTMLInputElement>(null)
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (formInputs.password.current?.value !== formInputs.repeatPassword.current?.value) {
      toast.error('Error resetting password: Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword(formInputs.password.current?.value ?? '');

    if (error) {
      toast.error(`Error resetting password: ${ error.message }`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success('Password reset successfully');
    navigate({ to: '/', search: { page: 1 } });
  };

  return (
    <>
    <div className='authentication-container'>
      <section className='authentication-wrapper'>
        <h2>Reset Password</h2>
        <form className='form' onSubmit={ handleFormSubmit }>
          <input
            ref={ formInputs.password }
            type='password'
            className='form-input'
            placeholder='Password'
            defaultValue={ formInputs.password.current?.value }
            required
          />
          <input
            ref={ formInputs.repeatPassword }
            type='password'
            className='form-input'
            placeholder='Repeat password'
            defaultValue={ formInputs.repeatPassword.current?.value }
            required
          />
          <button type='submit'>
            {
              isLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Submit'
            }
          </button>
        </form>
      </section>
    </div>
    </>
  );
};
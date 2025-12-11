import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/authentication')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='authentication-container'>
      <section className='authentication-wrapper'>
        <h4>Login</h4>
        <form className='form login-form'>
          <input type='email' className='form-input'/>
          <input type='password' className='form-input'/>
          <button>Login to your account</button>
          <div className='signup-container'>
            <p>Don't have an account?</p>
            <button>Sign Up</button>
          </div>
        </form>
      </section>
    </div>
  );
};
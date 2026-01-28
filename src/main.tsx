import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import { ToastContainer } from 'react-toastify';
import { ProfileProvider } from '@/stores/profile';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
};

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={5000}
        draggable={false}
        closeOnClick={false}
      />
    </StrictMode>,
  )
};
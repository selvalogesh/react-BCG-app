import React, { lazy, Suspense } from 'react';

const LazyLogin = lazy(() => import('./Login.js'));

const Login = props => (
  <Suspense fallback={null}>
    <LazyLogin {...props} />
  </Suspense>
);

export default Login;

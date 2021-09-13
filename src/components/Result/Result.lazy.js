import React, { lazy, Suspense } from 'react';
import Loading from '../../libs/loading';

const LazyResult = lazy(() => import('./Result'));

const Result = props => (
  <Suspense fallback={<Loading />}>
    <LazyResult {...props} />
  </Suspense>
);

export default Result;

import React, { lazy, Suspense } from 'react';
import Loading from '../../libs/loading';

const LazyAnalytics = lazy(() => import('./Analytics'));

const Analytics = props => (
  <Suspense fallback={<Loading />}>
    <LazyAnalytics {...props} />
  </Suspense>
);

export default Analytics;

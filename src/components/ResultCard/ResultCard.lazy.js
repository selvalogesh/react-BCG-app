import React, { lazy, Suspense } from 'react';
import Loading from '../../libs/loading';

const LazyResultCard = lazy(() => import('./ResultCard'));

const ResultCard = props => (
  <Suspense fallback={<Loading />}>
    <LazyResultCard {...props} />
  </Suspense>
);

export default ResultCard;

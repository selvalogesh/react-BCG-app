import React, { lazy, Suspense } from 'react';
import Loading from '../../libs/loading';

const LazyDropdownPicker = lazy(() => import('./DropdownPicker'));

const DropdownPicker = props => (
  <Suspense fallback={<Loading />}>
    <LazyDropdownPicker {...props} />
  </Suspense>
);

export default DropdownPicker;

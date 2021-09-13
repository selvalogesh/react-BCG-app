import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageNotFound.module.css';

const PageNotFound = () => (
  <div className={styles.PageNotFound} data-testid="PageNotFound">
    <h1>Oops! Page not found!</h1>
  </div>
);

PageNotFound.propTypes = {};

PageNotFound.defaultProps = {};

export default PageNotFound;

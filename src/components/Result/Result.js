import React from 'react';
import PropTypes from 'prop-types';
import styles from './Result.module.css';
import { Link } from 'react-router-dom';

import ResultCard from '../ResultCard';

const Result = (props) => {

  const dataArray = props.location.state;

  const populateCards = (dataArray) => dataArray.map((item, i) => <ResultCard key={i} data={item} />)

  return (
    <div className={styles.Result}>
      <h2>Result</h2>
      <br />
      <div className={styles["basic-grid"]}>
        {dataArray && dataArray.length !== 0 ? populateCards(dataArray) : null}
      </div>
      {dataArray && dataArray.length !== 0 ? null : <h5>Oops... Data not found! <Link to="/">Back</Link> </h5>}
    </div>
  );
}

Result.propTypes = {};

Result.defaultProps = {};

export default Result;

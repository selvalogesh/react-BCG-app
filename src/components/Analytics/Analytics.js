import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styles from './Analytics.module.css';

import Box from '@material-ui/core/Box';

import DropdownPicker from '../DropdownPicker';

const Analytics = () => {
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [region, setRegion] = useState('all');

  let data = {
    labels: xAxis,
    datasets: [
      {
        label: '# of Sales',
        data: yAxis,
        fill: false,
        backgroundColor: 'rgb(120, 142, 255)',
        borderColor: 'rgba(120, 142, 255, 1)',
      },
    ],
  };

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("https://python-bcg-backend.herokuapp.com/analytics/"+region+"/");
      response = await response.json()
      let x = []
      let y = []
      for(let item of response){
        x.push(item["year_month"]);
        y.push(item["count"]);
      }
      setXAxis(x);
      setYAxis(y);
    }
    fetchMyAPI()
  },[region])

  return(
  <div className={styles.Analytics}>    
    <Bar data={data} />
    <h5><Box component="div" display="inline" p={1} m={2} bgcolor="background.paper">Region:</Box>
    <DropdownPicker data={["all", "North", "South", "East", "West"]} setSelection={setRegion} fullWidth={false}/></h5>
  </div>
)};

Analytics.propTypes = {};

Analytics.defaultProps = {};

export default Analytics;

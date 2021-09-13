import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';

import Loading from '../../libs/loading';
import DropdownPicker from '../DropdownPicker'

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = (props) => {

  const [searching, setSearching] = useState(false);
  const [searchField, setSearchField] = useState("policyId");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmitForm = async (values) => {
    //sleep(500).then(alert(JSON.stringify(values, null, 2)))
    setSearching(true);
    let response = await fetch("https://python-bcg-backend.herokuapp.com/"+searchField+"/"+values["searchId"]);
    response = await response.json()
    //sleep(500).then(alert(JSON.stringify(response, null, 2)))
    props.history.push('/result',response)
  }

  const validationSchema = Yup.object({
    searchId: Yup.string()
      .max(10, 'Too Long!')
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      searchId: ''
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitForm,
  });

  return (
    <div className={styles.Login} data-testid="Login">
      <h2>Search</h2>

      <form className={styles.form} onSubmit={formik.handleSubmit}>

        <div>
          <TextField
            id="searchId"
            name="searchId"
            label="Policy or Customer Id"
            floatinglabeltext="Policy or Customer Id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.searchId}
            error={formik.touched.searchId && Boolean(formik.errors.searchId)}
            helperText={formik.touched.searchId && formik.errors.searchId}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div>
          <DropdownPicker data={["policyId", "customerId"]} setSelection={setSearchField} fullWidth={true}/>
        </div>

        <div>
          { searching ? <Loading />:<Button variant="contained" disabled={searching} color="primary" type="submit">Search</Button>}
        </div>

      </form>
    </div>
  );
}

Login.propTypes = {};

Login.defaultProps = {};


export default Login;
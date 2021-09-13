import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './ResultCard.module.css';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const ResultCard = ({ data }) => {

  const classes = useStyles();

  const [editable, setEditable] = useState(false);
  const [rowObject, setRowObject] = useState(data);
  const form = useRef();

  const keys = [
    // "Policy_Id",
    "Customer_Id",
    "Date_of_Purchase",
    "Fuel",
    "Vehicle_Segment",
    "Premium",
    "Bodily_Injury_Liability",
    "Personal_Injury_Protection",
    "Property_Damage_Liability",
    "Collision",
    "Comprehensive",
    "Gender",
    "Income_Group",
    "Region",
    "Marital_Status",
  ]

  const validationSchema = Yup.object({
    "Policy_Id": Yup.string().required('Required'),
    "Customer_Id": Yup.string().required('Required'),
    "Fuel": Yup.string().required('Required'),
    "Vehicle_Segment": Yup.string().required('Required'),
    "Premium": Yup.number().required('Required'),
    "Bodily_Injury_Liability": Yup.boolean().required('Required'),
    "Personal_Injury_Protection": Yup.boolean().required('Required'),
    "Property_Damage_Liability": Yup.boolean().required('Required'),
    "Collision": Yup.boolean().required('Required'),
    "Comprehensive": Yup.boolean().required('Required'),
    "Gender": Yup.string().required('Required'),
    "Income_Group": Yup.string().required('Required'),
    "Region": Yup.string().required('Required'),
    "Marital_Status": Yup.boolean().required('Required')
  });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const onSubmitForm = async (values) => {

    setRowObject(values);
    setEditable(!editable);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let temp = {...values};
    delete temp["_id"];
    delete temp["Date_of_Purchase"];
    let raw = JSON.stringify(temp);

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw
    };
    
    fetch("https://python-bcg-backend.herokuapp.com/policyId/"+rowObject["Policy_Id"]+"/", requestOptions)
    .then(response => response.json())
    .then(result => alert(JSON.stringify(result, null, 2)))
    .catch(error => console.log('error', error));
  }

  const formik = useFormik({
    initialValues: rowObject,
    validationSchema: validationSchema,
    onSubmit: onSubmitForm,
  });


  const populateTextFields = (keys) =>
    keys.map((key, i) => {

      if (key === "Date_of_Purchase") {
        const parseDate = (new Date(formik.values[key]["$date"])).toISOString().slice(0, 10);
        return (
          <div key={i} className={styles.element}>
            <InputLabel>{key}</InputLabel>
            <TextField
              id={key}
              name={key}
              disabled={true}
              //label={key}
              // floatinglabeltext={key}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={parseDate}
              error={formik.touched[key] && Boolean(formik.errors[key])}
              helperText={formik.touched[key] && formik.errors[key]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        );
      }

      return (
        <div key={i} className={styles.element}>
          <InputLabel>{key}</InputLabel>
          <TextField
            id={key}
            name={key}
            disabled={!editable}
            //label={key}
            // floatinglabeltext={key}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[key]}
            error={formik.touched[key] && Boolean(formik.errors[key])}
            helperText={formik.touched[key] && formik.errors[key]}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      );
    })

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Policy Id: {rowObject["Policy_Id"]}
          </Typography>

          <Typography gutterBottom variant="body2" component="div">
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              {populateTextFields(keys)}
              <div style={{ display: 'none' }}>
                <Button variant="contained" color="primary" ref={form} type="submit" />
              </div>
            </form>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => setEditable(!editable)}>
          Edit
        </Button>
        <Button disabled={!editable} size="small" color="primary" onClick={(e) => form.current.click()}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

ResultCard.propTypes = {};

ResultCard.defaultProps = {};

export default ResultCard;

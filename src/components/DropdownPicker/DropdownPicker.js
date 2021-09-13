import React from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';

import PropTypes from 'prop-types';
import styles from './DropdownPicker.module.css';

const DropdownPicker = ({data, setSelection, fullWidth}) => (
  <FormControl fullWidth={fullWidth}>
    <NativeSelect defaultValue="" onChange={(e) => setSelection(e.target.value)}>
      {data.map((item, i) => <option key={i} value={item}>{item}</option>)}
    </NativeSelect>
  </FormControl>
);

DropdownPicker.propTypes = {};

DropdownPicker.defaultProps = {};

export default DropdownPicker;

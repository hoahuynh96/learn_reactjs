import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  const [showPwd, setShowPwd] = useState(false);

  const toggleShowPwd = () => {
    setShowPwd((x) => !x);
  };

  return (
    <FormControl error={!!hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            id={name}
            type={showPwd ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={toggleShowPwd}>
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
          ></OutlinedInput>
        )}
      />
      <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;

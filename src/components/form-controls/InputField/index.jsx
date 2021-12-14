import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          margin="normal"
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={formState.errors[name]?.message}
        ></TextField>
      )}
    ></Controller>
  );
}

export default InputField;

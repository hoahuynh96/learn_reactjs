import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@mui/icons-material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  rootForm: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(1, 0, 2, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(2, 0, 1, 0),
  },

  progess: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('should enter least two words', 'Please enter least two words', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email.').email('Please enter a valid email address'),
    password: yup.string().required('Please enter your password').min(3, 'Please enter least three words'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password'), null], "Passwords don't match."),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.rootForm}>
      {isSubmitting && <LinearProgress className={classes.progess}></LinearProgress>}
      <Avatar className={classes.avatar}>
        <LockOpenOutlined></LockOpenOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>
        <PasswordField name="password" label="Password" form={form}></PasswordField>
        <PasswordField name="retypePassword" label="Retype Password" form={form}></PasswordField>

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          fullWidth
          size="large"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;

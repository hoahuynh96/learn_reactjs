import { makeStyles } from '@material-ui/core';
import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#fff',
    textDecoration: 'none',
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginUser = useSelector((state) => state.user.current);
  const isLoginUser = !!loginUser.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutClick = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.link} to="/">
              EZ Shop
            </Link>
          </Typography>

          <NavLink className={classes.link} to="/todos">
            <Button color="inherit">Todos</Button>
          </NavLink>

          {!isLoginUser && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoginUser && (
            <IconButton color="inherit" onClick={handleMenuClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown onBackdropClick open={open} onClose={handleClose}>
        <IconButton>
          <Close className={classes.closeBtn} onClick={handleClose} />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

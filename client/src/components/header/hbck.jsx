import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Highlight from '@material-ui/icons/Highlight';
import { connect } from 'react-redux';
import { toggleDarkTheme } from 'Actions/index';
import Login from '../login/login';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});


const styles = {
  grow: {
    flexGrow: 1,
  },
};

const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkTheme()),
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes, toggleDarkThemeHandler } = this.props;
    return (
      <AppBar position="static">
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <div className={classes.grow} />
            <Login />
            <IconButton onClick={toggleDarkThemeHandler}>
              <Highlight />
            </IconButton>
          </Toolbar>
        </MuiThemeProvider>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  toggleDarkThemeHandler: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));

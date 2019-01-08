import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  checkUserInCookie,
  clearError,
  clearSuccess,
} from 'Actions';
import CurrentRoute from './components/routing/current-route';
import Header from './components/header/header';
import Footer from './components/header/footer';
import Sidebar from './components/sidebar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
    },
    secondary: {
      light: '#bc477b',
      main: '#880e4f',
      dark: '#560027',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
    },
    secondary: {
      light: '#bc477b',
      main: '#880e4f',
      dark: '#560027',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function mapStateToProps(state) {
  return {
    locale: state.locale,
    darkThemeBool: state.darkTheme,
    user: state.user,
    error: state.notifications.error,
    success: state.notifications.success,
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    checkUser: () => dispatch(checkUserInCookie(document.cookie)),
    clearErrorHandler: () => dispatch(clearError()),
    clearSuccessHandler: () => dispatch(clearSuccess()),
  });
}


class App extends React.Component {
  componentDidMount = () => {
    const {
      user,
      checkUser,
    } = this.props;
    if (!user.token && !user.tokenFetched) {
      checkUser();
    }
  }

  componentDidUpdate = () => {
    const {
      error,
      enqueueSnackbar,
      intl,
      clearErrorHandler,
      clearSuccessHandler,
      success,
    } = this.props;
    if (error) {
      enqueueSnackbar(intl.formatMessage({ id: error }), { variant: 'error' });
      clearErrorHandler();
    }
    if (success) {
      enqueueSnackbar(intl.formatMessage({ id: success }), { variant: 'success' });
      clearSuccessHandler();
    }
  }


  render() {
    const { darkThemeBool } = this.props;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={darkThemeBool ? darkTheme : theme}>
          <CssBaseline>
            <Header />
            <Sidebar />
            <CurrentRoute />
            <Footer />
          </CssBaseline>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  darkThemeBool: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  checkUser: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  clearErrorHandler: PropTypes.func.isRequired,
  clearSuccessHandler: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};

App.defaultProps = {
  error: '',
  success: '',
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(injectIntl(((App)))));

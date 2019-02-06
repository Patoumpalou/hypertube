import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Switch,
  Menu,
  MenuItem,
  Typography,
  Button,
  withStyles,
  Grid,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const styles = {
  myPaper: {
    square: true,
  },
  menuItem: {
    paddingLeft: '25px',
    paddingRight: '25px',
  },
  field: {
    flexGrow: 1,
  },
  text: {
    marginRight: '10px',
  },
};

function DumbSettings({
  userName,
  firstName,
  lastName,
  email,
  locale,
  darkTheme,
  handleFieldChange,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  classes,
}) {
  return (
    <Grid container direction="column" justify="center">
      <Grid item>
        <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
          <Grid item className={classes.text}>
            <Typography><FormattedMessage id="settings.userName" /></Typography>
          </Grid>
          <Grid item className={classes.field}>
            <TextField fullWidth value={userName} onChange={e => handleFieldChange('userName', e.target.value)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
          <Grid item className={classes.text}>
            <Typography><FormattedMessage id="settings.firstName" /></Typography>
          </Grid>
          <Grid item className={classes.field}>
            <TextField fullWidth value={firstName} onChange={e => handleFieldChange('firstName', e.target.value)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
          <Grid item className={classes.text}>
            <Typography><FormattedMessage id="settings.lastName" /></Typography>
          </Grid>
          <Grid item className={classes.field}>
            <TextField fullWidth value={lastName} onChange={e => handleFieldChange('lastName', e.target.value)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
          <Grid item className={classes.text}>
            <Typography><FormattedMessage id="settings.email" /></Typography>
          </Grid>
          <Grid item className={classes.field}>
            <TextField fullWidth value={email} onChange={e => handleFieldChange('email', e.target.value)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
          <Grid item className={classes.text}>
            <Typography>
              <FormattedMessage id="settings.darkTheme" />
            </Typography>
          </Grid>
          <Grid item>
            <Switch onKeyPress={() => handleFieldChange('darkTheme', !darkTheme)} checked={darkTheme} value={darkTheme} onChange={() => handleFieldChange('darkTheme', !darkTheme)} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" wrap="nowrap" alignItems="center" justify="space-between">
            <Grid item>
              <Typography>
                <FormattedMessage id="settings.locale" />
              </Typography>
            </Grid>
            <Grid item>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={e => handleMenuOpen(e)}
              >
                {locale}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          marginThreshold={0}
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose()}
          PaperProps={{ square: true }}
        >
          <MenuItem className={classes.menuItem} onClick={() => handleMenuClose('en')}>en</MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => handleMenuClose('fr')}>fr</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}

DumbSettings.propTypes = {
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

DumbSettings.defaultProps = {
  anchorEl: null,
};

export default withStyles(styles)(DumbSettings);

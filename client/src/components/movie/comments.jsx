import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Avatar,
  Paper,
  TextField,
  Typography,
  form,
  FormControl,
  Input,
  InputLabel,
  Button,
  TableRow,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class Comments extends React.Component {
  componentWillMount() {
  }

  render() {
    const {
      comments,
    } = this.props;
    return (
      <div>
        <div>
          {comments.map(comment => (
            <Paper key={comment.timestamp}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <Avatar>W</Avatar>
                </Grid>
                <Grid item>
                <Typography noWrap>{comment.username}</Typography> 
                <Typography noWrap>{comment.comment}</Typography> 
                <Typography noWrap>{comment.timestamp}</Typography> 
                </Grid>
              </Grid>
            </Paper>
          ))}
          {/* Ajouter un commentaire */}
          
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

/* eslint-disable */
const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});
/* eslint-enable */

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

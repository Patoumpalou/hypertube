import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
} from '@material-ui/core';
import styled, { keyframes } from 'styled-components';

const growShrinkAnimation = keyframes`
0% {
  font-size: 24px;
  margin-top: 0px;
  color: #fff
  transform: rotate(-360deg)
}
50% {
  margin-top: 300px;
  font-size: 48px;
  color: #fff;
  transform: rotate(0deg)
}
100% {
  margin-top: 0px;
  font-size: 24px;
  color: #fff;
  transform: rotate(360deg)
}
`;

const growShrink = styled.p`
  animation: ${growShrinkAnimation} 1s ease infinite;
`;

function GrowShrink({
  movieName,
}) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Typography component={growShrink}>
          {movieName}
        </Typography>
      </Grid>
    </Grid>
  );
}

GrowShrink.propTypes = {
  movieName: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default (GrowShrink);

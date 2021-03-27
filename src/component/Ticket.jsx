import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import FlightBlock from './FlightBlock';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    price: {
      fontWeight: 'bold',
      color: '#00bfff',
      fonSize: 24,
    },
  };
});

const Ticket = React.memo(({ item }) => {
  const logo = `//pics.avs.io/99/36/${item.carrier}.png`;
  const classes = useStyles();

  return (
    <Box component={Paper} elevation={3} maxWidth="100%" p={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" className={classes.price}>
          {item.price} Р
        </Typography>
        <img alt="airline logo" src={logo} />
      </Box>
      <Grid container spacing={2}>
        {/* // В этом всегда два элемента, перелет туда и обратно */}
        {item.segments.map((el, idx) => (
          <Grid item xs={12}>
            <FlightBlock item={item.segments[idx]} key={`${el}_${idx}`} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

Ticket.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: {
      duration: PropTypes.number,
      stops: PropTypes.array,
      date: PropTypes.string,
      origin: PropTypes.string,
      destination: PropTypes.string,
    },
  }),
};

export default Ticket;

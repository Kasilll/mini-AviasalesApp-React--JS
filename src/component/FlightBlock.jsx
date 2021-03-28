import { Box, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { format, intervalToDuration } from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import React from 'react';
import { pluralize } from '../shared/utils';

const useStyles = makeStyles({
  title: {
    color: '#A0B0B9',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },
});

const FlightBlock = ({ item }) => {
  const classes = useStyles();
  const { duration, stops, date, origin, destination } = item;

  const newDate = new Date(date);

  const departureDate = new Date(newDate);
  const destinationDate = addMinutes(newDate, duration);
  const transplants = stops.length;

  const durationInterval = intervalToDuration({
    start: newDate,
    end: destinationDate,
  });

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box flex="1 1 auto" width={200}>
        <Typography variant="caption" className={classes.title}>
          {origin} - {destination}
        </Typography>
        <Typography variant="subtitle1">
          {format(departureDate, 'HH:mm')} - {format(destinationDate, 'HH:mm')}
        </Typography>
      </Box>
      <Box flex="1 1 auto" width={200}>
        <Typography variant="caption" className={classes.title}>
          В пути
        </Typography>
        <Typography variant="subtitle1">
          {!!durationInterval.days && `${durationInterval.days}д`} {!!durationInterval.hours && `${durationInterval.hours}ч`}{' '}
          {durationInterval.minutes}м
        </Typography>
      </Box>
      <Box flex="0 1 auto" width={200}>
        <Box variant="caption" className={classes.title}>
          {transplants || 'без'} {pluralize(transplants, ['переседка', 'пересадки', 'пересадок'])}
        </Box>
        <Box>
          <Typography variant="subtitle1">{stops.join(', ')}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

FlightBlock.propTypes = {
  duration: PropTypes.number,
  stops: PropTypes.array,
  date: PropTypes.string,
  origin: PropTypes.string,
  destination: PropTypes.string,
};

export default FlightBlock;

import React from 'react';
import { Box, Paper, FormControlLabel, Checkbox, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  title: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },
});

const Filters = React.memo(function Filters({ filters, selected, onChange }) {
  const classes = useStyles();

  const handleChange = item => {
    if (selected.includes(item.id)) {
      onChange([...selected.filter(i => i !== item.id)]);
    } else {
      onChange([...selected, item.id]);
    }
  };

  return (
    <Box component={Paper} elevation={3} width="100%" height={230} p={2}>
      <Typography className={classes.title} variant="subtitle1">
        Количество пересадок
      </Typography>
      {filters.map(item => {
        return (
          <FormControlLabel
            onChange={e => {
              handleChange(item);
            }}
            key={item.id}
            control={<Checkbox checked={selected.includes(item.id)} color="primary" />}
            label={item.title}
          />
        );
      })}
    </Box>
  );
});

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default Filters;

import { Box, Button, ButtonGroup, CircularProgress, Container, Grid } from '@material-ui/core';
import { sortBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import Filters from './component/Filters';
import Ticket from './component/Ticket';

async function subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets) {
  const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
  if (res.status >= 500) {
    // если пришла ошибка сервера, делаем запос повторно
    await subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets);
  } else if (res.status !== 200) {
  } else {
    // в случае получения билетов, оброватываем их
    const tickets = await res.json();
    setAllTicketsReceive(tickets.stop);
    setDataTickets([...dataTickets, ...tickets.tickets]);
  }
}

const enoughSteps = (ticket, count) => {
  const [there, back] = ticket.segments;
  return there.stops.length === count && back.stops.length === count;
};

const filters = [
  { id: 'all', title: 'Все', filterFn: ticket => true },
  {
    id: 'direct',
    title: 'Без пересадок',
    filterFn: ticket => enoughSteps(ticket, 0),
  },
  {
    id: '1step',
    title: '1 пересадка',
    filterFn: ticket => enoughSteps(ticket, 1),
  },
  {
    id: '2steps',
    title: '2 пересадки',
    filterFn: ticket => enoughSteps(ticket, 2),
  },
  {
    id: '3steps',
    title: '3 пересадки',
    filterFn: ticket => enoughSteps(ticket, 3),
  },
];

const getSortedTickets = (tickets, type) => {
  if (type === 'cheapest') {
    return sortBy(tickets, 'price');
  } else {
    // находим самый быстрый как самый малый среди сумм общей длины полета
    return sortBy(tickets, ticket => {
      const [there, back] = ticket.segments;
      const totalDuration = there.duration + back.duration;
      return totalDuration;
    });
  }
};

function App() {
  const [searchId, setSearchId] = useState('');
  const [dataTickets, setDataTickets] = useState([]);
  const [allTicketsReceive, setAllTicketsReceive] = useState(false);
  const [renderTickets, setRenderTickets] = useState([]);
  const [selected, setSelected] = useState(['all']);
  const [sorting, setSorting] = useState('fastest'); // fastest, cheapest

  useEffect(() => {
    fetch('https://front-test.beta.aviasales.ru/search')
      .then(r => r.json())
      .then(r => setSearchId(r.searchId));
  }, []);

  useEffect(() => {
    if (searchId && !allTicketsReceive) {
      subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets);
      // FIXME:  Рендер можно начать как только прилетели первые данные,
      // и пока не загужены все, показывать лоадер в конце
    } else setRenderTickets(dataTickets);
  }, [searchId, dataTickets]);

  useEffect(() => {
    // выберем те фильтры, которые нужны для выбора данных
    const selectedFilters = filters.filter(filter => selected.includes(filter.id));
    // выберем данные по фильтрам
    const ticketsToRender = dataTickets.filter(item => {
      // из выбранных фильтров применим функцию фильтрации всех фильтров по очереди
      // (получим массив прошел / непрошел),
      // и если подходит по одному из них, то оставляем
      return selectedFilters.map(ticket => ticket.filterFn(item)).some(i => i);
    });
    setRenderTickets(ticketsToRender);
  }, [selected]);

  const handleChange = ids => {
    setSelected(ids);
  };

  const handleSorting = type => {
    setSorting(type);
    setRenderTickets(getSortedTickets(renderTickets, type));
  };

  const sortingGroup = (
    <Grid item xs={12}>
      <ButtonGroup color="primary" size="large" fullWidth>
        <Button onClick={() => handleSorting('cheapest')} variant={sorting === 'cheapest' ? 'contained' : 'outlined'}>
          Самый дешевый
        </Button>
        <Button onClick={() => handleSorting('fastest')} variant={sorting === 'fastest' ? 'contained' : 'outlined'}>
          Самый быстрый
        </Button>
      </ButtonGroup>
    </Grid>
  );

  return (
    <div>
      <Container maxWidth="md">
        {allTicketsReceive && (
          <Box display="flex" justifyContent="space-between" pt={5}>
            <Filters filters={filters} selected={selected} onChange={handleChange} />
            <Box pl={4} width="100%">
              <Grid container spacing={3}>
                {sortingGroup}

                {renderTickets.slice(0, 20).map(item => (
                  <Grid item xs={12}>
                    {/* FIXME: забыл key в итераторе */}
                    <Ticket item={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {!allTicketsReceive && (
          <Box width="100%" pt={10} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;

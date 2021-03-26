import React from 'react'
import './App.scss'
import Filters from './component/Filters'
import Ticket from './component/Ticket'

async function subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets) {
	const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
	if (res.status >= 500) {
		// если пришла ошибка сервера, делаем запос повторно
		await subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets)
	} else if (res.status !== 200) {
	} else {
		// в случае получения билетов, оброватываем их
		const tickets = await res.json()
		setAllTicketsReceive(tickets.stop)
		setDataTickets([ ...dataTickets, ...tickets.tickets ])
	}
}

function App() {
	const [ searchId, setSearchId ] = React.useState('')
	const [ dataTickets, setDataTickets ] = React.useState([])
	const [ allTicketsReceive, setAllTicketsReceive ] = React.useState(false)
	const [ renderTickets, setRenderTickets ] = React.useState([])

	React.useEffect(() => {
		fetch('https://front-test.beta.aviasales.ru/search').then((r) => r.json()).then((r) => setSearchId(r.searchId))
	}, [])

	const [ renderTicket, setRenderTicket ] = React.useState([])

	React.useEffect(
		() => {
			if (searchId && !allTicketsReceive) {
				subscribeServerRequest(searchId, setAllTicketsReceive, setDataTickets, dataTickets)
			}
		},
		[ searchId, dataTickets ]
	)

	return (
		<div>
			<div className="wraper">
				<div className="content">
					<Filters renderTicket={renderTicket} setRenderTicket={setRenderTicket} dataTickets={dataTickets} />
					<div className="tickets">
						{allTicketsReceive ? dataTickets.slice(0, 20).map((el) => <Ticket dataTickets={el} />) : ''}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App

import React from 'react'
import '../Scss/Ticket.scss'
import Block from './Block'


const Ticket = React.memo(function Ticket({ dataTickets }) {
	const logo = `//pics.avs.io/99/36/${dataTickets.carrier}.png`

	return (
		<div className="ticket">
			<div className="ticket__title">
				<div className="price">{dataTickets.price}</div>
				<img className="airline-logo" src={logo} />
			</div>
			{dataTickets.segments.map((el, ind) => (
				<Block duration={dataTickets.segments[ind].duration} ticket={dataTickets} ind={ind} date={new Date(dataTickets.segments[ind].date)} />
			))}
		</div>
	)
})

export default Ticket

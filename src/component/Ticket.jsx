import React from 'react'
import '../Scss/Ticket.scss'
import Block from './Block'

const Ticket = React.memo(function Ticket({ renderTickets }) {
	const logo = `//pics.avs.io/99/36/${renderTickets.carrier}.png`

	return (
		<div className="ticket">
			<div className="ticket__title">
				<div className="price">{renderTickets.price}</div>
				<img className="airline-logo" src={logo} />
			</div>
			{renderTickets.segments.map((el, ind) => ( // В этом всегда два элемента, перелет туда и обратно
				<Block
					duration={renderTickets.segments[ind].duration}
					ticket={renderTickets}
					ind={ind}
					key={`${el}_${ind}`}
					departureDate={new Date(renderTickets.segments[ind].date)}
				/>
			))}
		</div>
	)
})

export default Ticket

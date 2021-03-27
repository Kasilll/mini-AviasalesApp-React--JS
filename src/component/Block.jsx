import React from 'react'
import '../Scss/Block.scss'

function calculateDurationHours(duration) {
	return Math.floor(duration / 60)
}

function calculateDurationMinute(duration) {
	return duration - Math.floor(duration / 60) * 60
}

function countTransplants(transplants) {
	if (transplants === 0) return 'нету пересадок'
	else if (transplants === 1) return '1 пересадка'
	else return `${transplants} пересадки`
}

export default function Block({ duration, ticket, ind, departureDate }) {
	const durationHours = calculateDurationHours(duration)
    const durationMinute = calculateDurationMinute(duration)
    const arrivalDate = new Date(departureDate.getTime() + duration * 60000)

	return (
		<div className="block">
			<div className="time" >
                {departureDate.getHours()}:{departureDate.getMinutes()} - {arrivalDate.getHours()} : {arrivalDate.getMinutes()}
            </div>
			<div className="duration">
				<div className="duration__text">В пути</div>
				<div className="duration_time">
					{durationHours > 0 ? `${durationHours}ч ${durationMinute}м` : `${durationMinute}м`}
				</div>
			</div>
			<div className="transplants">
				<div className="transplants__count">{countTransplants(ticket.segments[ind].stops.length)}</div>
				<div className="transplants__city">
					{ticket.segments[ind].stops ? (
						ticket.segments[ind].stops.map((el, index) => {
							if (index + 1 === ticket.segments[ind].stops.length) return el
							else return el + ','
						})
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

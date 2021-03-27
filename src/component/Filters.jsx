import React from 'react'
import '../Scss/Filters.scss'
import Switch from './Switch'

const Filters = React.memo(function Filters({ dataTickets, setRenderTickets }) {
	const [ checked, setChecked ] = React.useState({
		checkedAll: true,
		checkedDirect: false,
		checkedOneTransfer: false,
		checkedTwoTransfer: false,
		checkedTreeTransfer: false
	})

	const sortName = [ 'все', 'без пересадок', 'одна пересадка', 'две пересадки', 'три пересадки' ]

	React.useEffect(
		() => {
			if (checked.checkedAll) {
				setRenderTickets(dataTickets)
			} else if (checked.checkedDirect) {
				const ticket = dataTickets.filter(el => {
					return el.segments[0].stops.length === 0 && el.segments[1].stops.length === 0
				})
				setRenderTickets(ticket)
			} else if (checked.checkedOneTransfer) {
				const ticket = dataTickets.filter(el => {
					return el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1
				})
				setRenderTickets(ticket)
			} else if (checked.checkedTwoTransfer) {
				const ticket = dataTickets.filter(el => {
					return el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2
				})
				setRenderTickets(ticket)
			} else if (checked.checkedTreeTransfer) {
				const ticket = dataTickets.filter(el => {
					return el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3
				})
				setRenderTickets(ticket)
			}
		},
		[ checked ]
	)

	return (
		<div className="filters">
			<div className="filters__container">
				<h3>Количество пересадок</h3>
				{Object.keys(checked).map((el, ind) => (
					<Switch checked={checked} name={el} setChecked={setChecked} sortName={sortName[ind]} />
				))}
			</div>
		</div>
	)
})

export default Filters

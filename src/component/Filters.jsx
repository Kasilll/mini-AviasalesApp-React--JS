import React from 'react'
import '../Scss/Filters.scss'
import Switch from './Switch'

function sortAllTicket() {}

const Filters = React.memo(function Filters({ setRenderTicket, renderTicket, dataTickets }) {
	const [ checked, setChecked ] = React.useState({
		checkedAll: true,
		checkedDirect: false,
		checkedOneTransfer: false,
		checkedTwoTransfer: false,
		checkedTreeTransfer: false
	})

	const sortName = [ 'все', 'без пересадок', 'одна пересадка', 'две пересадки', 'три пересадки' ]

	// React.useEffect(() => {
	// 	if(checkedAll) {

	// 	}
	// }, [ checked ])

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

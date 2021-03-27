import React from 'react'
import '../Scss/Filters.scss'
import Switch from './Switch'

function shuffle(arr) { // функция премешимания массива
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const Filters = React.memo(function Filters({ dataTickets, setRenderTickets }) {
	const [ checked, setChecked ] = React.useState({
		checkedAll: true,
		checkedDirect: false,
		checkedOneTransfer: false,
		checkedTwoTransfer: false,
		checkedTreeTransfer: false
	})

	const sortName = [ 'все', 'без пересадок', 'одна пересадка', 'две пересадки', 'три пересадки' ]

	React.useEffect( // Вот здесь скорей всего накосячил... 
		() => {
			if (checked.checkedAll || !Object.values(checked).includes(true)) {   
				// если активен только один чекбокс "Все" или не один не активен - рендер всех элементов 
				setRenderTickets(dataTickets)
			} else {
				// по очереди падаем в активные элементы и собираем отфильтрованные данные, далее их перемешиваем
				const ticket = []
				if (checked.checkedDirect) { 
					const filterTicket = dataTickets.filter(el => {
						return el.segments[0].stops.length === 0 && el.segments[1].stops.length === 0
					})
					ticket.push(...filterTicket)
				}
				if (checked.checkedOneTransfer) {
					const filterTicket = dataTickets.filter(el => {
						return el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1
					})
					ticket.push(...filterTicket)
				}
				if (checked.checkedTwoTransfer) {
					const filterTicket = dataTickets.filter(el => {
						return el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2
					})
					ticket.push(...filterTicket)
				}
				if (checked.checkedTreeTransfer) {
					const filterTicket = dataTickets.filter(el => {
						return el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3
					})
					ticket.push(...filterTicket)	
				}
				setRenderTickets(shuffle(ticket))
			} 
		},
		[ checked ]
	)

	return (
		<div className="filters">
			<div className="filters__container">
				<h3>Количество пересадок</h3>
				{Object.keys(checked).map((el, ind) => (
					<Switch checked={checked} key = {`${el}_${ind}`}name={el} setChecked={setChecked} sortName={sortName[ind]} />
				))}
			</div>
		</div>
	)
})

export default Filters

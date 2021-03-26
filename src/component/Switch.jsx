import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default function Switch({ checked, name, setChecked, sortName }) {
	const handleChange = (event) => {
		setChecked({ ...checked, [event.target.name]: event.target.checked })
	}

	return (
		<FormControlLabel
			control={<Checkbox checked={checked[name]} onChange={handleChange} name={name} color="primary" />}
			label={sortName}
		/>
	)
}

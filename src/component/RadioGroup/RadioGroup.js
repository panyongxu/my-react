import React, { Component } from 'react'

export default function RadioGroup(props) {
	return (
		<div>
			{React.Children.map(props.children, (comp) => {
				return React.cloneElement(comp, { name: props.name })
			})}
		</div>
	)
}

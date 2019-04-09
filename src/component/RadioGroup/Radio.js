import React, { Component } from 'react'

export default function Radio({ children, ...rest }) {
	return (
		<label>
			<input type="radio" {...rest} />
			{children}
		</label>
	)
}

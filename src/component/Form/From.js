import React, { Component } from 'react'

function CreateFrom(Comp) {
	return class extends Component {
		render() {
			return <Comp></Comp>
		}
	}
}


class From extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				{/* {React.Children.map(this.props.children, (child) => {
					React.cloneElement(child, {})
					return child
				})} */}
				123
			</div>
		)
	}
}

const newFrom = CreateFrom(From)

export default newFrom

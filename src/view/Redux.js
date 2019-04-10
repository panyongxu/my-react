import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(
	(state) => ({ num: state }),
	(dispatch) => ({
		add: () => dispatch({ type: 'add' }),
		minus: () => dispatch({ type: 'minus' })
	})
)
class Redux extends Component {
	render() {
		return (
			<div>
				<p>{this.props.num}</p>
				<div>
					<button onClick={() => this.props.add()}>+</button>
					<button onClick={() => this.props.minus()}>-</button>
				</div>
			</div>
		)
	}
}

export default Redux

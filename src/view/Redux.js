import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
	(state) => ({ num: state.test }),
	{
		add: () => ({ type: 'add' }),
		minus: () => ({ type: 'minus' }),
		asyncAdd: () => (dispatch) => {
			setTimeout(() => {
				dispatch({ type: 'add' })
			}, 1000)
		}
	}
)
class Redux extends Component {
	render() {
		return (
			<div>
				<p>{this.props.num}</p>
				<div>
					<button onClick={() => this.props.add()}>+</button>
					<button onClick={() => this.props.minus()}>-</button>
					<button onClick={() => this.props.asyncAdd()}>AsyncAdd</button>
				</div>
			</div>
		)
	}
}

export default Redux

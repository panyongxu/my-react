import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/store'
import { Provider } from 'react-redux'

import Cat from './Cat'
import Cart from './Cart'
import RadioGroup from './component/RadioGroup/RadioGroup'
import Radio from './component/RadioGroup/Radio'
import Filter from './component/Filter/Filter'
import From from './component/Form/From'
import Input from './component/Form/Input'
import InputItem from './component/Form/InputItem'
import './index.css'
import FormItem from 'antd/lib/form/FormItem'
import Redux from './view/Redux'

function calculateWinner(squares) {
	const lines = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	]
	for (let i = 0; i < lines.length; i++) {
		const [ a, b, c ] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}

class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		)
	}
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}

class Game extends React.Component {
	constructor() {
		super()
		this.state = {
			history: [ { squares: Array(9).fill(null) } ],
			xIsNext: true,
			stepNumber: 0,
			rules: {
				uname: [ { required: true, message: '用户名必填' } ],
				pwd: [ { required: true, message: '密码必填' } ]
			}
		}
	}
	handleClick = (i) => {
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const current = history[history.length - 1]
		const squares = current.squares.slice()
		if (calculateWinner(squares) || squares[i]) {
			return
		}
		squares[i] = this.state.xIsNext ? 'x' : 'o'
		this.setState({
			history: history.concat([
				{
					squares: squares
				}
			]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		})
	}
	jumpTo = (index) => {
		this.setState({
			stepNumber: index,
			xIsNext: index % 2 ? false : true
		})
	}
	render() {
		const history = this.state.history
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)
		let status
		if (winner) {
			status = 'Winner: ' + winner
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		}
		const moves = history.map((step, move) => {
			const desc = move ? 'Move #' + move : 'Game start'
			return (
				<li key={move}>
					<span onClick={() => this.jumpTo(move)}>{desc}</span>
				</li>
			)
		})

		return (
			<div className="game">
				{/* <div className="game-board">
					<Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
				<Button /> */}
				{/* 购物车 */}
				<Cart />
				{/* <Cat></Cat> */}
				{/* 单选组件 */}
				<RadioGroup name="mvvm">
					<Radio value="Vue">Vue</Radio>
					<Radio value="React">React</Radio>
					<Radio value="Ang">Ang</Radio>
				</RadioGroup>
				{/* 过滤器组件 */}
				<Filter type="p">
					<p>我是P1</p>
					<span>我是span1</span>
					<p>我是P2</p>
					<span>我是span2</span>
				</Filter>
				{/* 表单 */}
				<From
					rules={this.state.rules}
					onSubmit={(data) => {
						console.log(data)
					}}
				>
					<FormItem name="账号" prop="uname">
						<Input />
					</FormItem>
					<FormItem name="密码" prop="pwd">
						<Input />
					</FormItem>
					<FormItem name="提交" htmlType="submit">
						<button />
					</FormItem>
				</From>
				<Redux />
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
	<Provider store={store}>
		<Game />
	</Provider>,
	document.getElementById('root')
)

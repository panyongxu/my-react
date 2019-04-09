import React from 'react'
import ReactDOM from 'react-dom'
import Cat from './Cat'
import Cart from './Cart'



import './index.css'


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
			stepNumber: 0
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
					<span  onClick={() => this.jumpTo(move)}>
						{desc}
					</span>
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
				<Cart></Cart>
				{/* <Cat></Cat> */}
			</div>
		)
	}
}


// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

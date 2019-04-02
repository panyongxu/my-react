import React, { Component } from 'react'

class Input extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="cart">
				{
					<div>
						<div>
							<label>商品:</label>
							<input
								type="text"
								value={this.props.name}
								onChange={(e) => this.props.onClick(e, 'name')}
							/>
						</div>
						<div>
							<label>价格:</label>
							<input
								type="text"
								value={this.props.price}
								onChange={(e) => this.props.onClick(e, 'price')}
							/>
						</div>
						<button onClick={this.props.addCart}>添加到购物车</button>
					</div>
				}
			</div>
		)
	}
}

// class CartList extends Component {
// 	constructor(props) {
// 		super(props)
// 	}
// 	render() {
// 		// let list = this.props.list.map((item, index) => {
// 		// 	return (
// 		// 		<li key={index}>
// 		// 		<span>名称:{item.name} </span>
// 		// 		<span>价格:{item.price} </span>
// 		// 		<span>
// 		// 			<button onClick={() =>this.props.remove(item)}>-</button> {item.count} <button onClick={() =>this.props.add(item)}>+</button></span>
// 		// 		</li>
// 		// 	)
//     // })

//     console.log(this.props.list);
// 		const list = [...this.props.list]

// 	}
// }
function CartList({ list, remove, add }) {
	return (
		<ul>
			{list.map((item, index) =>
				(<li key={index}>
					<span>名称:{item.name} </span>
					<span>价格:{item.price * item.count} </span>
					<span>
						<button onClick={() => remove(item)}>-</button> {item.count} <button onClick={() => add(item)}>+</button></span>
				</li>)
			)}

		</ul>
	)
}

export default class Cart extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			price: '',
			list: []
		}
	}
	change = (e, stateName) => {
		this.setState({
			[stateName]: e.target.value
		})
	}
	addCart = () => {
		const newList = [...this.state.list]
		newList.push({
			name: this.state.name,
			price: this.state.price,
			count: 1
		})
		this.setState({
			list: newList,
			name: '',
			price: ''
		})
	}
	add = (item) => {
		const newItem = [...this.state.list]
		const index = newItem.findIndex(x => x.name === item.name)

		const itm = newItem[index]
		if (itm) {
			newItem.splice(index, 1, { ...newItem[index], count: newItem[index].count + 1 })
		} else {
			newItem.push({ ...item, count: 1 })
		}

		this.setState({
			list: newItem
		})
	}
	remove = (item) => {
		const newItem = [...this.state.list]
		const index = newItem.findIndex(x => x.name === item.name)
		newItem.splice(index, 1, { ...newItem[index], count: newItem[index].count - 1 })
		this.setState({
			list: newItem
		})
	}
	render() {
		return (
			<div>
				<Input name={this.state.name} price={this.state.price} onClick={this.change} addCart={this.addCart} />
				<CartList list={this.state.list} remove={this.remove} add={this.add} />
			</div>
		)
	}
}

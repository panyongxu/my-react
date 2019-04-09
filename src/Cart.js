import React, { Component } from 'react'
import axios from 'axios'
import { isBoolean } from 'util'
axios.defaults.baseURL = 'http://localhost:8080/'

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
function Payment({ totalPrice }) {
	return (
		totalPrice > 0 && (
			<div>
				<span>代付款:{totalPrice}</span>
				<button onClick={() => alert('票子拿来!!!')}>付款</button>
			</div>
		)
	)
}

function CartList({ list, remove, add, onChecked }) {
	return (
		<ul>
			{list.map((item, index) => (
				<li key={index}>
					<input type="checkbox" checked={item.ischecked !== 'false' } onChange={() => onChecked(item)} />
					<span>名称:{item.name} </span>
					<span>单价:{item.price} </span>
					<span>
						<button onClick={() => remove(item)}>-</button> {item.count}{' '}
						<button onClick={() => add(item)}>+</button>
					</span>
					<span>总价:{item.price * item.count} </span>
				</li>
			))}
		</ul>
	)
}

export default class Cart extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			price: '',
			list: [],
			totalPrice: 0
		}
	}
	componentDidMount() {
		axios.get('/cartList').then(({data}) => {
			this.setState({
				list: data
			})
		})
	}
	total = (newItem) => {
		let allPrice = 0
		newItem.filter((x) => {
			if (x.ischecked) {
				allPrice += x.price * x.count
			}
		})
		this.setState({
			totalPrice: allPrice
		})
	}
	onChecked = (item) => {
		const newItem = [ ...this.state.list ]
		const index = newItem.findIndex((x) => x.name === item.name)
		newItem.splice(index, 1, { ...newItem[index], ischecked: !newItem[index].ischecked })
		this.setState({
			list: newItem
		})
		this.total(newItem)
	}
	change = (e, stateName) => {
		this.setState({
			[stateName]: e.target.value
		})
	}
	addCart = () => {
		const newList = [ ...this.state.list ]
		const index = newList.findIndex((item) => item.name === this.state.name)
		if (newList[index]) {
			newList[index].count++
		} else {
			newList.push({
				name: this.state.name,
				price: this.state.price,
				count: 1,
				ischecked: false
			})
			axios.get('/addCarts', {
				params: {
					name: this.state.name,
					price: this.state.price,
					count: 1,
					ischecked: false
				}
			})
		}
		if (this.state.name && this.state.price) {
			this.setState({
				list: newList,
				name: '',
				price: ''
			})
		} else {
			console.log('暂无商品')
		}
		this.total(newList)
	}
	add = (item) => {
		const newItem = [ ...this.state.list ]
		const index = newItem.findIndex((x) => x.name === item.name)

		const itm = newItem[index]
		if (itm) {
			newItem.splice(index, 1, { ...newItem[index], count: Number(newItem[index].count) + 1 })
		} else {
			newItem.push({ ...item, count: 1 })
		}

		this.setState({
			list: newItem
		})
		this.total(newItem)
	}
	remove = (item) => {
		let newItem = [ ...this.state.list ]
		const index = newItem.findIndex((x) => x.name === item.name)
		if (newItem[index].count > 1) {
			newItem.splice(index, 1, { ...newItem[index], count: Number(newItem[index].count) - 1 })
		} else {
			if (window.confirm('确定要出删除吗')) {
				newItem.splice(index, 1)
			}
		}

		this.setState({
			list: newItem
		})
		this.total(newItem)
	}
	render() {
		return (
			<div>
				<Input name={this.state.name} price={this.state.price} onClick={this.change} addCart={this.addCart} />
				<CartList list={this.state.list} remove={this.remove} add={this.add} onChecked={this.onChecked} />
				<Payment totalPrice={this.state.totalPrice} />
			</div>
		)
	}
}

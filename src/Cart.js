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

class CartList extends Component {
	constructor(props) {
		super(props)
	}
	render() {
    console.log(this.props.value);
		let list = this.props.value.map((item, index) => {
			return (
				<li key={index}>
					{item.name}: {item.price}
				</li>
			)
    })
    
    
		return list
	}
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
      price:this.state.price
    })
    
		this.setState({
      list: newList,
      name: '',
      price: ''
    })
	}
	render() {
		return (
			<div>
        <Input name={this.state.name} price={this.state.price} onClick={this.change} addCart={this.addCart} />
				<CartList value={this.state.list} />
			</div>
		)
	}
}

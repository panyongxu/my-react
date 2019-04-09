import React, { Component } from 'react'
import Input from './Input'

function CreateFrom(Comp) {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {}
			this.options = {}
		}
		// 单次验证
		validateField = (name) => {
			const rules = this.options[name].rules
			console.log(name,rules);
			rules.some(rule => {
				if(rule.required){
					if(this.state[name] != '') {
						
						return true
					}
					
				}
			})
		}
		// 点击事件提升
		handleChange = (e) => {
			const { name, value } = e.target
			console.log(this.options)
			this.setState({[name]: value},() => {
				this.validateField(name)
			})
		}
		// 创建input包装器
		getFieldDec = (field, option) => {
			this.options[field] = option
			return (Input) => (
				<div>
					<label>{field}</label>
					{React.cloneElement(Input, {
						name: field,
						value: this.state[field] || '',
						onChange: this.handleChange
					})}
				</div>
			)
		}
		render() {
			return <Comp {...this.props} getFieldDec={this.getFieldDec} />
		}
	}
}

class From extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { getFieldDec } = this.props
		return (
			<div>
				{getFieldDec('uname', {
					rules: [ { required: true, message: '用户名必填' } ]
				})(<Input />)}
				{getFieldDec('pwd', {})(<Input />)}
			</div>
		)
	}
}

const newFrom = CreateFrom(From)

export default newFrom

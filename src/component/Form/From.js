import React, { Component } from 'react'
import Schema from 'async-validator'
import { spawn } from 'child_process'

function CreateFrom(Comp) {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {}
			this.options = {}
		}
		// 单次验证
		validateField = (name) => {
			const rules = this.options[name].rules // 验证规则
			const value = this.state[name] // 验证数据
			let validateStatus = true
			rules &&
				rules.some((rule) => {
					const descriptor = { [name]: rule }
					const schema = new Schema(descriptor)
					schema.validate({ [name]: value }, (error, field) => {
						if (error) {
							this.setState({
								[name + 'message']: error[0].message
							})
							validateStatus = false
						}
					})
				})
			if (validateStatus) {
				this.setState({
					[name + 'message']: ''
				})
			}
			return validateStatus
		}
		// 筛选对象
		filter = (obj) => {
			let data = {}
			for (let key in obj) {
				if (key.indexOf('message') === -1) {
					data[key] = obj[key]
				}
			}
			return data
		}
		// 验证所有
		validate = (cb) => {
			// 所有验证数据
			const rules = this.options
			const rets = Object.keys(rules).map((ruleName) => {
				return this.validateField(ruleName)
			})
			const ret = rets.every((x) => x == true)

			cb(ret, this.filter(this.state))
		}
		// 点击事件提升
		handleChange = (e) => {
			const { name, value } = e.target
			this.setState({ [name]: value }, () => {
				this.validateField(name)
			})
		}
		// 提交按钮
		onSubmit = (cb) => {
			this.validate((vali, data) => {
				if (vali) {
					console.log('验证成功', data)
					cb(data)
				} else {
					console.log('提交失败')
				}
			})
		}
		// 创建FromItem包装器
		getFromItem = (name, field, option) => {
			this.options[field] = option
			// 判断表单是否必填
			const required = option.rules[0].required
			return (FromItem) => (
				<div>
					{required && <span className="required">*</span>}
					<label>{name}</label>
					{React.cloneElement(FromItem, {
						name: name,
						// 传递Input
						children: this.getFieldDec(field)(FromItem.props.children)
					})}
					{this.state[field + 'message'] && <p className="error">{this.state[field + 'message']}</p>}
				</div>
			)
		}
		// 创建Input包装器
		getFieldDec = (field) => {
			return (Input) => (
				<div>
					{React.cloneElement(Input, {
						name: field,
						value: this.state[field] || '',
						onChange: this.handleChange
					})}
				</div>
			)
		}
		// 创建提交按钮包装器
		getSubmit = (name, cb) => {
			return (Submit) => (
				<div>
					{React.cloneElement(Submit, {
						onClick: () => this.onSubmit(cb),
						children: name
					})}
				</div>
			)
		}
		render() {
			return (
				<Comp
					{...this.props}
					getFromItem={this.getFromItem}
					getSubmit={this.getSubmit}
					getFieldDec={this.getFieldDec}
					validate={this.validate}
				/>
			)
		}
	}
}

@CreateFrom
class From extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { getFromItem, getSubmit, onSubmit, children, rules } = this.props
		return (
			<div>
				{React.Children.map(children, (child) => {
					if (child.props.htmlType !== 'submit') {
						return getFromItem(child.props.name, child.props.prop, {
							rules: rules[child.props.prop]
						})(child)
					} else {
						const { name, children } = child.props
						return getSubmit(name, onSubmit)(children)
					}
				})}
			</div>
		)
	}
}

export default From

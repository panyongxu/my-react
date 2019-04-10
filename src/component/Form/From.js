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
			const status =
				rules &&
				!rules.some((rule) => {
					if (rule.required) {
						if (!this.state[name]) {
							this.setState({
								[name + 'message']: rule.message
							})
							return true
						}
					}
				})
			if (status) {
				this.setState({
					[name + 'message']: ''
				})
			}
			return status
		}
		// 筛选对象
		filter = (obj) => {
			let data = {}
			Object.keys(obj).map((key) => {
				if (key.indexOf('message') === -1) {
					data[key] = obj[key]
				}
			})
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
		// 创建input包装器
		getFieldDec = (name, field, option) => {
			this.options[field] = option
			return (Input) => (
				<div>
					<label>{name}</label>
					{React.cloneElement(Input, {
						name: field,
						value: this.state[field] || '',
						onChange: this.handleChange
					})}
					{this.state[field + 'message'] && <p className="error">{this.state[field + 'message']}</p>}
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
		const { getFieldDec, getSubmit, onSubmit, children, rules } = this.props
		return (
			<div>
				{React.Children.map(children, (child) => {
					if (child.props.htmlType !== 'submit') {
						return getFieldDec(child.props.name, child.props.prop, {
							rules: rules[child.props.prop]
						})(child.props.children)
					} else {
						const { name, children } = child.props
						return getSubmit(name, onSubmit)(children)
					}
				})}
			</div>
		)
	}
}

// const newFrom = CreateFrom(From)

export default From

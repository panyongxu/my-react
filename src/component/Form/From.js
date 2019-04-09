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
			const status = rules && !(rules.some(rule => {
				if (rule.required) {
					if (!this.state[name]) {
						this.setState({
							[name + 'message']: rule.message
						})
						return true
					}

				}
			}))
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
			Object.keys(obj).map(key => {
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
			const rets = Object.keys(rules).map(ruleName => {
				return this.validateField(ruleName)
			})
			const ret = rets.every(x => x == true)

			cb(ret, this.filter(this.state))
		}
		// 点击事件提升
		handleChange = (e) => {
			const { name, value } = e.target
			this.setState({ [name]: value }, () => {
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
			return <Comp {...this.props} getFieldDec={this.getFieldDec} validate={this.validate} />
		}
	}
}

class From extends Component {
	constructor(props) {
		super(props)
	}
	// 提交按钮
	onSubmit = () => {
		const { validate } = this.props
		validate((vali, data) => {
			if (vali) {
				console.log('验证成功', data)
			} else {
				alert('提交失败', data)
			}
		})
	}
	render() {
		const { getFieldDec } = this.props
		return (
			<div>
				{getFieldDec('uname', {
					rules: [{ required: true, message: '用户名必填' }]
				})(<Input />)}
				{getFieldDec('pwd', {
					rules: [{ required: true, message: '密码必填' }]
				})(<Input />)}
				<button onClick={this.onSubmit}>提交</button>
			</div>
		)
	}
}

const newFrom = CreateFrom(From)

export default newFrom

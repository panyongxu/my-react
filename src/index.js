import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'

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
import Router from './view/Router'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			rules: {
				uname: [
					{ required: true, message: '请输入账号名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				pwd: [ { required: true, message: '密码必填' } ]
			}
		}
	}
	render() {
		return (
			<div className="game">
				{/* 购物车 */}
				{/* <Route path="/form" component={Cart} /> */}
				{/* <Cat></Cat> */}
				{/* 单选组件 */}
				{/* <RadioGroup name="mvvm">
					<Radio value="Vue">Vue</Radio>
					<Radio value="React">React</Radio>
					<Radio value="Ang">Ang</Radio>
				</RadioGroup> */}
				{/* 过滤器组件 */}
				{/* <Filter type="p">
					<p>我是P1</p>
					<span>我是span1</span>
					<p>我是P2</p>
					<span>我是span2</span>
				</Filter> */}
				{/* 表单 */}
				<From
					rules={this.state.rules}
					onSubmit={(data) => {
						console.log(data)
					}}
				>
					<FormItem name="账号" prop="uname">
						<Input placeholder="请输入账号" />
					</FormItem>
					<FormItem name="密码" prop="pwd">
						<Input type="password" placeholder="请输入密码"/>
					</FormItem>
					<FormItem name="提交" htmlType="submit">
						<button />
					</FormItem>
				</From>
				<Redux />
				<Router />
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
)

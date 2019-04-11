import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

function About(params) {
	return (
		<div>
			<h3>个人中心</h3>
			<div>
				<Link to="/about/me">个人信息</Link>
				<Link to="/about/order">订单查询</Link>
			</div>
			<Switch>
				<Route path="/about/me" component={() => <div>Me</div>} />
				<Route path="/about/order" component={() => <div>order</div>} />
				<Redirect to="/about/me" />
			</Switch>
		</div>
	)
}
function Home(params) {
	return (
		<div>
			<h1>Home</h1>
			<ul>
				<li>
					<Link to="/detail/web">to web</Link>
				</li>
				<li>
					<Link to="/detail/node">to node</Link>
				</li>
			</ul>
		</div>
	)
}
function Detail(params) {
	console.log(params)
	let { history, match } = params
	return (
		<div>
			{' '}
			<p>进入{match.params.name}页面</p>
			<button onClick={() => history.goBack()}>后退</button>
			<button onClick={() => history.push('/about')}>跳转About</button>
		</div>
	)
}

const NoMatch = (params) => {
	let { location } = params
	return <div>404 .{location.pathname} 不存在</div>
}
const Index = (params) => {
	let { location } = params
	return <div>Index</div>
}
export default class Router extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<header>
						<Link to="/home">Home</Link>
						<Link to="/about">About</Link>
					</header>

					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/about" component={About} />
            <Route exact path="/" component={Index} />
						<Route path="/detail/:name" component={Detail} />
						<Route component={NoMatch} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

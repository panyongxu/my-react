import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

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
	return <div>Index</div>
}



@connect(
	(state) => ({ isLogin: state.user.isLogin })
)
class PrivateRoute extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { isLogin, component: Comp, ...rest } = this.props
		console.log(this.props);

		return (
			<Route {...rest}
				render={(props, state) =>
					isLogin ?
						(<Comp />)
						:
						(<Redirect to={{
							pathname: "/login",
							state: { redirect: props.location.pathname }
						}
						} />)
				}
			/>)
	}
}



@connect(
	(state) => ({
		isLogin: state.user.isLogin,
		isLoading: state.user.isLoading
	}),
	{
		ansycLogin: () => (dispatch) => {
			dispatch({ type: 'loading' })
			setTimeout(() => {
				dispatch({ type: 'login' })
			}, 1000)
		}
	}
)
class Login extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { isLoading, isLogin, ansycLogin, location } = this.props
		const redirect = (location.state && location.state.redirect) || '/'
		if (isLogin) {
			return <Redirect to={redirect} />;
		}
		return <div>
			<button onClick={ansycLogin} disabled={isLogin}>{
				!isLoading ? '登录' : '登录中'
			}</button>
		</div>
	}
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
						<Route exact path="/" component={Index} />
						<Route path="/home" component={Home} />
						{/* <Route path="/about" component={About} /> */}
						<Route path="/login" component={Login} />
						<PrivateRoute path="/about" component={About} />
						<Route path="/detail/:name" component={Detail} />
						<Route component={NoMatch} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

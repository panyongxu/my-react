import React, { Component } from 'react'

export default class Cat extends Component {
	constructor() {
		super()
		this.state = {
			locationMouse: {
				left: 0,
				top: 0
			}
		}
	}
	moveHouse = (e) => {
    this.setState({
      locationMouse: {
        left: e.clientX,
        top: e.clientY
      }
    })
  }
	render() {
		return (
			<div
				className="cat"
				style={{ width: '100%', height: '100%', background: '#eee', position: 'fixed' }}
				onMouseMove={this.moveHouse}
			>
				<Dom locationMouse={this.state.locationMouse}>
          {mouse => (
          <div 
            style={{ position: 'absolute', left: mouse.left, top: mouse.top }}
            >
					我是内容元素
				</div>)}
        </Dom>
			</div>
		)
	}
}

function Dom ({children,locationMouse}) { 
  return (
    <div>
      {children(locationMouse)}
    </div>
  )
}

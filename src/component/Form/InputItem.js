import React from 'react'

export default function InputItem(props) {
  return (
    <div>
      <label >{props.name}</label>
      {props.children}
    </div>
  )
}

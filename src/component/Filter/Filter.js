import React from 'react'

export default function Filter({children,type}) {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if(child.type === type) return child
      })}
    </div>
  )
}


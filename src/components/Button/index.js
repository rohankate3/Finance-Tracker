import React from 'react'
import './styles.css'
function Button({text,onClick,blue,loading}) {
  return (
    <div disabled={loading} className={blue ?'btn btn-blue':'btn'} onClick={onClick}>{text}</div>
  )
}

export default Button
import React from 'react'
import './styles.css'
function Header() {
    function logoutFnc() {
        alert("Logout!")
    }
    return (
        <div className='navbar'>
            <p className='logo'>Financly.</p>
            <p className='logo link' onClick={logoutFnc}>Logout</p>
        </div >
    )
}

export default Header
import React from 'react'
import logo from "../photos/logo.png"

function Navbar() {

  return (
    <>
      <nav className='w-full h-[12.3vh] bg-[#14141c] px-4 md:px-20'>
        <img src={logo} className='w-[12.3h] h-[12.3vh] rounded-full' alt="logo" />
      </nav>
    </>
  )
}

export default Navbar
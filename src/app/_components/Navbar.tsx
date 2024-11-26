'use client'
import { authcontext } from '@/_contexts/Authcontextme'
import { usercontext } from '@/_contexts/Usercontextme'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

export default function Navbar() {
  const {data}= useContext(usercontext)
  const {token,setToken}= useContext(authcontext)
 const {push}= useRouter()
function handleLogout(){
  localStorage.removeItem('token')
  setToken(null)
  push('/login')
}
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
  <Link className="navbar-brand" href="/">Navbar</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <div className="form-inline my-2 d-flex gap-2 my-lg-0">
      {token?<><Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center"href={'/profile'}>{data?.data?.user?.photo?<Image src={data&&data?.data?.user?.photo} width={35} height={37} style={{width:'35px'}} alt={'profile pic'} /> :null} <p className='p-0 m-0'> {data?data?.data?.user.name:<i className="fa-solid fa-spinner"></i>}</p></Link>

    <span className="btn btn-outline-danger my-2 my-sm-0 d-flex align-items-center" onClick={handleLogout}>Logout</span>
    </>
        
   : <><Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center" href={'/login'}>Login</Link>
   <Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center" href={'/register'}>register</Link></> }
      
      
    </div>
  </div>
</nav>

  )
}

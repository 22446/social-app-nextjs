'use client'
import { authcontext } from '@/_contexts/Authcontextme'
import { usercontext } from '@/_contexts/Usercontextme'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useContext } from 'react'

export default function Navbllank() {
  const {setToken}= useContext(authcontext)
  const {data}= useContext(usercontext)
  const {push}= useRouter()
    function handleLogout(){
        localStorage.removeItem('token')
        setToken(null)
        push('/login')
      }
  return (<>
    <Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center"href={'/profile'}>{data?.data?.user?.photo?<Image src={data?.data?.user?.photo} width={35} height={37} style={{width:'35px'}} alt={'profile pic'} /> :null} <p className='p-0 m-0'> {data?data?.data?.user?.name:<i className="fa-solid fa-spinner"></i>}</p></Link>

    <span className="btn btn-outline-danger my-2 my-sm-0 d-flex align-items-center" onClick={handleLogout}>Logout</span>
    </>
  )
}

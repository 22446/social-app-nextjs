import Link from 'next/link'
import React from 'react'

export default function Navauth() {
  return (
    <><Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center" href={'/login'}>Login</Link>
   <Link className="btn btn-outline-success my-2 my-sm-0 d-flex align-items-center" href={'/register'}>register</Link></> 
  )
}

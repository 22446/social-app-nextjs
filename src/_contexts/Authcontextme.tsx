'use client'
import React, { createContext, useState, useEffect } from 'react'

export const authcontext = createContext<any>({})

export default function Authcontextme({ children }: any) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if(localStorage.getItem('token')!==null){
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    }
  }, [])

  return <authcontext.Provider value={{ token, setToken }}>{children}</authcontext.Provider>
}

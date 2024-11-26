'use client'
import axios from 'axios'
import React, { createContext } from 'react'
import { useQuery } from 'react-query'
export const usercontext=createContext<any>({})
export default function Usercontextme({children}:any) {
    async function GetUserData(){
        return axios.get('https://linked-posts.routemisr.com/users/profile-data',{headers:{token:localStorage.getItem('token')}})
        .then(function(res){
          console.log(res)
          return res
        }).catch(function(err){
          console.log(err)
          return err
        })
       }
       const{data,isLoading}=useQuery({
        queryKey:'getuserInfo',
        queryFn:GetUserData
       })
 if(isLoading){
  <p>Loading..</p>
 }
  return (
    <usercontext.Provider value={{GetUserData,data,isLoading}}>{children}</usercontext.Provider>
  )
}

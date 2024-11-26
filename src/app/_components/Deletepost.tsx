'use client'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

export default  function Deletepost({id}:any) {
  const queryClient = useQueryClient()

   async function deletePost(){
     return await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{headers:{token:localStorage.getItem('token')}})
        .then(function(res){
            console.log(res)
      queryClient.invalidateQueries('getuserpost')
    
            return true
        }).catch(function(err){
            console.log(err)
            return false
        })
    }
  async function  handleDelete(){
    const flag=await deletePost()
    if(flag){
      toast.success('Post deleted successfully',{
        position:'top-right'
      })
    
      
    }else{
     toast.error('An error occurred during this action')
    }
    }
    
  return (
    <button className="btn btn-danger  w-100" onClick={handleDelete}>Delete<i className="fa-solid fa-trash text-light"></i></button>

  )
}

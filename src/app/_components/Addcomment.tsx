'use client'
import axios from "axios";
import React, { useRef, useState } from "react";

import { useQueryClient } from "react-query";
export default function Addcomment({id}:any) {
  const queryClient = useQueryClient()
  const text = useRef<HTMLInputElement>(null);
const[loading ,setLoading]= useState(false)
  async function addComments() {
    return await axios
      .post(`https://linked-posts.routemisr.com/comments`,{content:text.current?.value,post:id}, {
        headers: {
          token:localStorage.getItem('token'),
        },
      })
      .then(function (res) {
        console.log(res);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
  }
  async function handlePostComment() {
    setLoading(true)
  console.log(text.current?.value)
    const isFlage = await addComments();
    if (isFlage) {
      queryClient.invalidateQueries('getComments')
      setLoading(false)
    } else {
      console.log("false");
      setLoading(false)

    }
  }
  return (
    <div>
      <div className="d-flex algin-items-center my-2">
        <input
          ref={text}
          className="form-control p-2 w-100"
          type="text"
          placeholder="add comment"
        />
        <button className="btn btn-outline-dark p-2" disabled={loading} onClick={handlePostComment}>{loading?'Loading..':'add'}</button>
      </div>
    </div>
  );
}

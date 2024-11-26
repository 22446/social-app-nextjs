"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function Createpost() {
  const caption = useRef<HTMLInputElement>(null);
  const img = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient()


  async function addPost() {
      const postData = new FormData();
    const captionme = caption.current?.value || "";
    const imgme = img.current?.files?.[0];
    if (imgme) {
      postData.append("image", imgme);
    }
    postData.append("body", captionme);

    return await axios
      .post(
        "https://linked-posts.routemisr.com/posts",
        postData ,
        {
          headers: {
            token:localStorage.getItem('token'),
          },
        }
      )
      .then(function (res) {
        console.log(res);
      queryClient.invalidateQueries('getuserpost')

        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
  }

  async function handleadd() {
    const flag = await addPost();
    if (flag) {
      toast.success('Post Added successfully',{
        position:'top-right'
      })
    } else {
      toast.error('An error occurred during this action')
    }
  }
  const [visible, setVisible] = useState<boolean>(false);

  function handleClicked() {
    setVisible(!visible);
  }

  return (
    <div className="card my-3 w-75 mx-auto p-4 rounded d-flex justify-content-center">
      <div onClick={handleClicked} style={{cursor:"pointer"}}>
        <p className="text-muted">Whats in your mind...</p>
      </div>
      {visible ? (
        <div className="position-fixed z-3 top-0 bottom-0 end-0 start-0  d-flex align-items-center justify-content-center" onClick={()=>setVisible(false)} style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        
        <div className="w-50 mx-auto p-5 gap-2 rounded bg-white shadow d-flex flex-column " onClick={(e)=>e.stopPropagation()}>
          <h4>Create post</h4>
          <input
            ref={caption}
            placeholder="whats in your mind"
            className="form-control p-3"
          />

          <input
            ref={img}
            type="file"
            placeholder="Type something"
            className="form-control"
          />

          <button
            className="btn btn-success"
            onClick={() => {
              setVisible(false);
              handleadd();
            }}
          >
            post
          </button>
        </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

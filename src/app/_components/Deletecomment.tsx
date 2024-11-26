"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";

export default function Deletecomment({ id ,text}: any) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [clickedCommentId, setClickedCommentId] = useState<string | null>(null);
   const textinput = useRef<HTMLInputElement>(null);

  function handleClick(commentId: string) {
    setClickedCommentId((prevId) => (prevId === commentId ? null : commentId));
    console.log(text.current?.value)
  }
  async function updateComments() {
    return await axios
      .put(
        `https://linked-posts.routemisr.com/comments/${id}`,
        { content: textinput.current?.value },
        {
          headers: {
            token:localStorage.getItem('token'),
          },
        }
      )
      .then(function (res) {
        console.log(res);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
  }
  async function handleUpdateComment() {
    setLoading(true);
    console.log(text.current?.value);
    const isFlage = await updateComments();
    if (isFlage) {
      queryClient.invalidateQueries("getComments");
      setLoading(false);
    } else {
      console.log("false");
      setLoading(false);
    }
  }
  return (
    <div>
      <button onClick={() => handleClick(id)} className="btn btn-warning">
        update
      </button>
      {clickedCommentId == id ? (
        <div className="d-flex my-2">
          <input type="text" ref={textinput} defaultValue={text} className="form-control" />
          <button
            className="btn btn-outline-success"
            disabled={loading}
            onClick={handleUpdateComment}
          >
            Update
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}


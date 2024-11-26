"use client";
import { Comment } from "@/lib/interfaces/IpostInterface";
import axios from "axios";
import React, { useContext } from "react";
import ToggleableDemo from "./Toggleable";
import Addcomment from "./Addcomment";
import { useQuery } from "react-query";
import { usercontext } from "@/_contexts/Usercontextme";
import Updatecomment from "./Updatecomment";

export default function Comments({id}: any) {
  
 
  const res = useContext(usercontext);
  const { data, isLoading } = useQuery({
    queryKey: ["getComments", id],
    queryFn: getallcomments,
  });

  function getallcomments() {
    return axios.get(
      `https://linked-posts.routemisr.com/posts/${id}/comments`,
      {
        headers: {
          token:localStorage.getItem('token'),
        },
      }
    );
  }
  if (isLoading) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <div key={index} style={{ padding: "10px 0" }}>
            <div
              style={{
                height: "1.2rem",
                width: "30%",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginBottom: "10px",
                animation: "shimmer 1.5s infinite",
              }}
            ></div>

            <div
              style={{
                height: "1rem",
                width: "20%",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            ></div>

            <div
              style={{
                height: "1.5rem",
                width: "90%",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
              }}
            ></div>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #ccc",
                margin: "10px 0",
              }}
            />
          </div>
        ))}
      </div>
    );
  }



  return (
    <>
      <ToggleableDemo>
        {data?.data?.comments.map(function (comment: Comment) {
          return (
            <div key={comment._id}>
              <div className="p-2">
                <p className="fw-bold">{comment.commentCreator.name}</p>
                <p>{comment.createdAt}</p>
              </div>
              <div>
                <p>{comment.content}</p>
                {comment.commentCreator._id == res.data?.data?.user?._id ? (
                 <Updatecomment id={comment._id} text={comment.content}/>
                ) : (
                  ""
                )}
              </div>
              <hr />
            </div>
          );
        })}
      </ToggleableDemo>

      <Addcomment id={id} />
    </>
  );
}

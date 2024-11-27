'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Comments from './Comments'
import { Ipost } from '@/lib/interfaces/IpostInterface'
import Deletepost from './Deletepost'
import Updatepost from './Updatepost'
import Image from 'next/image'
import Createpost from './Createpost'
import { TailSpin } from 'react-loader-spinner'

export default function Userposts() {

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);


  function handleDropdown(postId: string) {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  }

  async function getUserpost() {
    return await axios.get(
      'https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts',
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(function (res) {
      console.log(res);
      return res;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: 'getuserpost',
    queryFn: getUserpost,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 60px)' }}>
        <TailSpin 
          visible={true}
          height="100vh"
          width="80"
          color="black"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ height:'100vh' }}
        />
      </div>
    );
  }
  return (
    <div>
      <Createpost />
      {data && data?.data.posts.length > 0 ? (
        data?.data.posts.map((post: Ipost) => (
          <div key={post.id}>
            <div className="container my-4">
              <div className="row">
                <div className="col-md-8 col-12 mx-auto shadow">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2 my-2">
                      <Image
                        src={post.user.photo}
                        width={40}
                        height={37}
                        alt=""
                        style={{ width: '40px' }}
                      />
                      <p className="p-0 m-0 fw-bold">{post.user.name}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDropdown(post._id)}
                        className="btn btn-light"
                        type="button"
                      >
                        ...
                      </button>
                      {dropdownOpen === post._id && (
                        <div className="m-0 p-0">
                          <Deletepost id={post._id} />
                          <Updatepost id={post._id} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p>{post.body}</p>
                  {post.image ? (
                    <Image
                      src={post.image}
                      className="w-100"
                      width={600}
                      height={500}
                      style={{ height: '500px' }}
                      alt="postimg"
                    />
                  ) : null}
                  <Comments id={post._id} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex align-items-center flex-column justify-content-center my-3">
          <h3 className="text-center">There's no post</h3>
          <p>Post your first now!</p>
        </div>
      )}
    </div>
  );
}

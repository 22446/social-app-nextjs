'use client'
import axios from "axios";
import { Ipost } from "@/lib/interfaces/IpostInterface";
import Comments from "./_components/Comments";
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import Createpost from "./_components/Createpost";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { authcontext } from "@/_contexts/Authcontextme";

export default function Home() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Ipost | null>(null);
  const [visible, setVisible] = useState(false); 
  const{token}= useContext(authcontext)
  useEffect(() => {
  
    if (!token) {
      router.push("/login");
    
  }
  }, [router, token]);


  const { data, isLoading } = useQuery('getposts', async () => {
    return await axios
      .get('https://linked-posts.routemisr.com/posts', { headers: { token: localStorage.getItem('token') } })
      .then((res) => res)
      .catch((err) => err);
  });

  function handleSelect(post: Ipost) {
    setSelectedPost(post);
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  if (!token) {
    return null;  
  }

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
      {data?.data?.posts.map((post: Ipost) => (
        <div key={post.id}>
          <div className="container my-4">
            <div className="row">
              <div className="col-md-8 col-12 mx-auto shadow">
                <div className="d-flex align-items-center gap-2 my-2">
                  <Image src={post.user.photo} alt={post.user.name} width={40} height={37}/>
                  <p className='p-0 m-0 fw-bold'>{post.user.name}</p>
                </div>
                <p>{post.body}</p>
                {post.image?<Image
                  src={post.image}
                 
                  width={600}
                  height={450}
                  style={{cursor: 'pointer' ,width:'100%',height:'auto'}}
                  alt={'imagebodu'}
                  onClick={() => handleSelect(post)} 
                />:null}
                
                <Comments id={post._id} />
              </div>
            </div>
          </div>
        </div>
      ))}

{visible && selectedPost && (
  <div
    className="position-fixed z-3 top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center"
    onClick={handleCloseModal}
    style={{
      backgroundColor: 'rgba(0,0,0,0.5)', 
      overflowY: 'auto', 
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="p-3 gap-2 rounded bg-white shadow d-flex flex-column mx-auto flex-md-row"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '90%',
            maxHeight: '90vh', 
            overflow: 'auto',
          }}
        >
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center mb-2">
              <Image src={selectedPost.user.photo} width={40} height={37} alt="" />
              <p className="p-0 m-0 ms-2">{selectedPost.user.name}</p>
            </div>
            <p>{selectedPost.body}</p>
            {selectedPost.image ? (
              <Image
                src={selectedPost.image}
                className="w-100"
                alt=""
                width={500}
                height={400}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto', 
                }}
              />
            ) : null}
          </div>

          <div className="col-12 col-md-6 d-flex flex-column justify-content-end">
            <Comments id={selectedPost._id} />
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

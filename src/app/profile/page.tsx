'use client';
import { usercontext } from '@/_contexts/Usercontextme';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Userposts from '../_components/Userposts';
import { TailSpin } from 'react-loader-spinner';
import Image from 'next/image';
import { authcontext } from '@/_contexts/Authcontextme';

export default function ProfilePage() {
  const { data } = useContext(usercontext);
  const router = useRouter();
  const{token}= useContext(authcontext)
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router,token]);
if(!token){
  return null
}
  return (
    <>
      {data?<><div style={{ minHeight: '50vh' }} className="bg-dark fw-bold d-flex align-items-center justify-content-center text-white flex-column">
        <Image src={data?.data.user.photo} width={120} height={120} alt={'usephoto'} />
        <p className="mt-2">Name: {data ? data?.data.user.name : 'loading'}</p>
        <p>Birth Date: {data ? data?.data.user.dateOfBirth : 'loading'}</p>
        <p>Gender: {data ? data?.data.user.gender : 'loading'}</p>
      </div>
      <Userposts /> </>: <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 60px)' }}>
      <TailSpin 
        
        visible={true}
        height="100vh"
        width="80"
        color="black"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{ height:'100vh' }}
        wrapperClass=""
      />
    </div>}
    </>
  );
}

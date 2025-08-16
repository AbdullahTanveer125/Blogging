"use client"
import Image from "next/image";




import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../Slices/userSlice";
import UserDetails from "@/components/userDetails";
import AllPosts from "@/components/AllPosts";
import Hero from "@/components/Hero";

export default function Home() {

  const { user, token } = useSelector((state) => state.user);

  console.log("In Home Page User= ", user)
  console.log("In Home Page Token= ", token)



  return (

    <div className="">

      {/* <UserDetails /> */}
      <Hero />
      <AllPosts />


    </div>
  );
}

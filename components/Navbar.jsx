import Link from 'next/link'
import React from 'react'
import { Space_Mono } from "next/font/google"
import { useState } from 'react'
import logo from '../public/logo.png';
import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import SigninButton from './SigninButton';


 

const spaceMono = Space_Mono({weight: ['700'], style: ['italic'], subsets:['latin']})
function Navbar() {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 2,
      link: "topArtists",
    },
    {
      id: 3,
      link: "topTracks",
    },
    {
      id: 4,
      link: "search",
    },
    
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <Link href="/"><img src="/logo.png" alt='logo' width={100} height={100} layout="responsive"/></Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{link}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
       
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
        
            <SigninButton/>
    </div>
  );

}

export default Navbar
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import DropDown from '@/components/DropDown'
import Card from '@/components/Card';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data:session} = useSession();
  const [x, setX] = useState('');
  const [profile, setProfile] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      if (session && session.accessToken)
      {
        console.log(session.accessToken);

        setX(session.accessToken);
        const response = await fetch('https://api.spotify.com/v1/me',
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        const data = await response.json();
        setProfile(data);
        console.log(data);
      }
    }
    fetchData()}, [session]);
    
  
  return (
    <div>
      <Navbar />
      <main className={`flex min-h screen flex-col items-center
       justify-between p-24 ${inter.className}`}>
        <div>Stats for Spotify Profile </div>
     <div>
      {profile.display_name}
     </div>
       </main>
    </div>
  )
}


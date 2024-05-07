import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import DropDown from '@/components/DropDown'
import Card from '@/components/Card';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [albums, setAlbums] = useState([]);
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
    

    useEffect(()=> {
      async function fetchData() {
          if (session && session.accessToken){
            const offset = 0; // Start from the beginning
            const limit = 50; // Limit to 200 results per page
            
            const response = await fetch(`https://api.spotify.com/v1/search?q=%25a%25&type=album&limit=${limit}&offset=${offset}`, {
              headers: {
                Authorization: `Bearer ${session.accessToken}`
              }
            });
            const data = await response.json();
              console.log(data);
              setAlbums(data.albums.items);
            }
           
      } fetchData();}, [session])
    const topAlbumList = albums?.map((item) => {
      return (
        <div className='opacity-50' key={item.id}>
          <img src={item.images[0].url} alt={item.name} />
        </div>
      )
    })
  
  return (
    <div>
      
      < main className={`${inter.className}`}>
      <div className='grid  grid-cols-10 grid-rows-3' >
{topAlbumList}
      
     </div>
     <div className='absolute inset-x-0 top-0 h-16 bg-opacity-0'>
     <Navbar />
     <div>Stats for Spotify Profile </div>


     </div>
      
     
       </main>
      
    </div>
  )
}


import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
function topArtists() {
  const router = useRouter();

    const {data:session} = useSession();    
    const [accessToken, setaccessToken] = useState(null);
    const [topArtists, settopArtists] = useState(null);

    useEffect(()=> {
        async function fetchData() {
            if (session && session.accessToken){
                setaccessToken(session.accessToken);
                const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50',{
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`
                  }
                });
                const data = await response.json();
                settopArtists(data.items);
              }
              else if (!session || !session.accessToken){
                router.push('/login');
                return;
            }
        } fetchData();}, [session])
console.log(topArtists);
const topArtistsList = topArtists?.map((artist) => {
    return (
      <div key={artist.id}>
        <h3 className="h3">{artist.name}</h3>
        <Link href={`/artist/${artist.id}`}> <img   src={artist.images[0].url} alt={artist.name} /></Link>
       
      </div>
    )
})
  return (
    <div>
      <Navbar/>
    <div className='grid  px-3 gap-4 grid-cols-3 grid-rows-3' >
    {topArtistsList}
    </div>
    </div>
  )
}

export default topArtists
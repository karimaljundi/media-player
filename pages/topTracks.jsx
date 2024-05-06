import React from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
function topTracks() {
  const router = useRouter();

    const {data:session} = useSession();    
    const [accessToken, setaccessToken] = useState(null);
    const [trackResult, setTracksResult] = useState(null);

    useEffect(()=> {
        async function fetchData() {
            if (session && session.accessToken){
              console.log(session);
                setaccessToken(session.accessToken);
                const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50',{
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`
                  }
                });
                const data = await response.json();
                console.log(data);
                setTracksResult(data.items);
              }
              else if (!session || !session.accessToken){
                router.push('/login');
                return;
            }
        } fetchData();}, [session])
      console.log(accessToken);
console.log(trackResult);

const topTracksList = trackResult?.map((track) => {
  let artistsNames = track.artists.map((artist) => artist.name).join(', ');
  return (
    <div className='flex' key={track.id}>
      <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2"><Link href={track.external_urls.spotify}>{track.name}</Link></div>
      <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">{artistsNames}</div>
      {track.preview_url ? <Link className="flex-1 text-gray-700 text-center px-4 py-2 m-2" href={track.preview_url}>Preview</Link>: <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">No preview available</div>}
    </div>
  )
});
 
  return (
    <div>

        <Navbar/>

    <div className="grid gap-4 grid-cols-3 grid-rows-3">
    <span>01</span>
            </div>


        {topTracksList}
        
        </div>
  )
}

export default topTracks
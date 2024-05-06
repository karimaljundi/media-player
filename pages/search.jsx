import React from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/DropDown';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/router';
function search() {
  const router = useRouter();
  const {data:session} = useSession();    
  const [accessToken, setaccessToken] = useState(null);
  const [searchValue, setSearchValue] = useState(" ");
  const [dropDownValue, setDropDownValue] = useState("dropdown");
  const [searchResults, setSearchResults] = useState(null);
  const [resultsList, setResultsList] = useState(null);

  useEffect(()=> {
      async function fetchData() {
          if (session && session.accessToken){
              setaccessToken(session.accessToken);
              const response = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}+&type=${dropDownValue}`,{
                headers: {
                  Authorization: `Bearer ${session.accessToken}`
                }
              });
              const data = await response.json();
              console.log(searchValue)
              if (dropDownValue === 'album') {
                setSearchResults(data.albums);
                const topAlbumList = searchResults?.items.map((item) => {
                  return (
                    <div key={item.id}>
                      <h3 className="h3">{item.name}</h3>
                      <Link href={`/artist/${item.id}`}> <img   src={item.images[0].url} alt={item.name} /></Link>    
                    </div>
                  )
              })
              setResultsList(topAlbumList);
              }
              else if (dropDownValue === 'artist') setSearchResults(data.artists);
              else if (dropDownValue === 'playlist') {
                setSearchResults(data.playlists);
                console.log(searchResults);
          
                const topPlaylistList = searchResults?.items.map((item) => {
                  return (
                    <div key={item.id}>
                      <h3 className="h3">{item.name}</h3>
                      <Link href={`/artist/${item.id}`}> <img   src={item.images[0].url} alt={item.name} /></Link>    
                    </div>
                  )
              })
              setResultsList(topPlaylistList);
              }
              else if (dropDownValue === 'track'){ 
                setSearchResults(data.tracks);
                const topTracksList = searchResults?.items.map((track) => {
                  console.log(track);
                  let artistsNames = track.artists.map((artist) => artist.name).join(', ');
                  return (
                    <div className='flex' key={track.id}>
                      <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2"><Link href={track.external_urls.spotify}>{track.name}</Link></div>
                      <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">{artistsNames}</div>
                      {track.preview_url ? <Link className="flex-1 text-gray-700 text-center px-4 py-2 m-2" href={track.preview_url}>Preview</Link>: <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">No preview available</div>}
                    </div>
                  )
               });
                setResultsList(topTracksList);
              }
              
            }
            else if (!session || !session.accessToken){
              router.push('/login');
              return;
          }
      } fetchData();}, [searchValue , dropDownValue, session]);
      
      console.log(searchResults);
     
  return (
    <div>
      <div >
        <Navbar/></div>

  <div className='flex justify-center items-center py-20 pl-40'>
 <input type="text" onChange = {(event)=> setSearchValue(event.target.value)} placeholder="Search.." />
 <Dropdown className='ml-1' selectedOption={dropDownValue} setSelectedOption={setDropDownValue}/>
</div>


      
    {dropDownValue==='playlist' ? <div className='grid  px-3 gap-4 grid-cols-3 grid-rows-3' >{resultsList}</div>: <div></div>}
    {dropDownValue==='track' ? resultsList: <div></div>}
    {dropDownValue==='album' ? <div className='grid  px-3 gap-4 grid-cols-3 grid-rows-3' >{resultsList}</div>: <div></div>}
    </div>
  )
}

export default search
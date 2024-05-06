import React from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/DropDown';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/router';

function Card() {
    const router = useRouter();
  const {data:session} = useSession();    
  const [accessToken, setaccessToken] = useState(null);
  const [searchValue, setSearchValue] = useState(" ");
  const [dropDownValue, setDropDownValue] = useState("dropdown");
  const [searchResults, setSearchResults] = useState(null);
  const [resultsList, setResultsList] = useState(null);
    const randomOffset = Math.floor(Math.random() * 10000);
    useEffect(()=>{
        async function fetchData() {
            if (session && session.accessToken){
                setaccessToken(session.accessToken);
                const response = await fetch(`https://api.spotify.com/v1/search?q=${getRandomSearch()}&type=track&limit=1&offset=${randomOffset}`,{
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`
                  }
                });
                const data = await response.json();
                console.log(data);
                setSearchResults(data);
                console.log(searchResults);
            }
        }
        fetchData();
    
    }, [session])
  return (
    <div>image</div>
  )
}
function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    
    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    let randomSearch = '';
  
    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + '%';
        break;
      case 1:
        randomSearch = '%' + randomCharacter + '%';
        break;
    }
  
    return randomSearch;
  }
export default Card
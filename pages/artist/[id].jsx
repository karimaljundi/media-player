import { useRouter } from "next/router";
import { useEffect, useState } from "react";import { useSession } from 'next-auth/react'
import { Playfair_Display_SC } from "next/font/google"
import Navbar from "@/components/Navbar";
 

const playFair = Playfair_Display_SC({weight: ['700'], style: ['italic'], subsets:['latin']})

export default function Artist(){
    const {data:session} = useSession();   
    const [artistData, setartistData] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=> {
        async function fetchData() {
            if (session && session.accessToken){
                const response = await fetch('https://api.spotify.com/v1/artists/'+ id,{
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`
                  }
                });
                const data = await response.json();
                console.log(data);
                setartistData(data);
              }
        } fetchData();}, [session])


console.log(artistData);
return ( <div>
     <Navbar/>
    <div style={{backgroundImage: `url(${artistData?.images[1].url})`}}>
       
    <h1 className={playFair.className}>{artistData?.name}</h1>
    </div>
   <img src={artistData?.images[1].url} alt={artistData?.name} />
</div>
)
}
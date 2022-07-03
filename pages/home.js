import React from 'react'
import Navbar from 'components/navbar'
import { useRouter } from 'next/router'
export default function home() {
    const router = useRouter()
    console.log(router.query) 
    
  

  return (
    <div>
        <Navbar/>
        <div>

        </div>
    </div>
  )
}

"use client"
import {useState} from 'react'

export default function LikeButton(params:any) {
  const [liked,setLiked]= useState(false);
  
    return (
    <button id={params} onClick={()=>setLiked(!liked)}>
        {liked ? 'corazon' : 'vacio'}
    </button>
  )
}

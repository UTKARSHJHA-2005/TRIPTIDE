import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useParams } from 'react-router-dom'
import { db } from '../../../db'
import Info from './Info'
import { doc, getDoc } from 'firebase/firestore'

export default function () {
  const {tripId}=useParams()
  const [trip,settrip]=useState([])
  useEffect(()=>{
    tripId&&gettripdata()
  },[tripId])
  const gettripdata=async ()=>{
    const docref=doc(db,"AITrips",tripId);
    const docsnap=await getDoc(docref);
    if(docsnap.exists()){
      console.log("Document:",docsnap.data());
      settrip(docsnap.data());
    }else{
      console.log("No such doc");
    }
  }
  return (
    <div>
        <Navbar/>
        <br /><br /><br />
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
          <Info trip={trip}/>
        </div>
    </div>
  )
}
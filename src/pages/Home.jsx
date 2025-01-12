import React from 'react'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import About from '../components/About'
import FAQ from '../components/FAQ'
import News from '../components/News'
import Landing from '../components/Landing'

export default function Home(){
  const user=localStorage.getItem("users")
  return (
    <><Navbar />
    <br /><br /><br />
      <Landing />
      <br />
      <About/>
      <br />
      <FAQ/>
      <News/>
      <Contact/>
    </>
  )
}
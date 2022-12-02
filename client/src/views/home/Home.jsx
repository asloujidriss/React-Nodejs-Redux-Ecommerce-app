import React from 'react'
import Container from '../../components/Container'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import TopBar from '../../components/TopBar'

const Home = () => {
  return (
   <div>
  <TopBar/>
  <Header/>
   <Navbar/>
  <Container/>
  <Footer/>
</div>
  )
}

export default Home
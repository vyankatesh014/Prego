import React from 'react'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className=''>
      <Categories />
      <BestSeller />
      <BottomBanner/>
      <NewsLetter />
    </div>
  )
}

export default Home

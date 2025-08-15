import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/categories'
import BestSeller from '../components/BestSeller'

const home = () => {
  return (
    <div className='mt-10'>
        <MainBanner />
        <Categories />
        <BestSeller/>
      
    </div>
  )
}

export default home
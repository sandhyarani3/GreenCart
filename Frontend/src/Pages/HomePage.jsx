import React from 'react'
import MainBanner from '../Components/MainBanner'
import Category from '../Components/Category'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewLetter from '../Components/NewLetter'


const HomePage = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Category/>
      <BestSeller/>
      <BottomBanner/>
      <NewLetter/>
    </div>
  )
}

export default HomePage

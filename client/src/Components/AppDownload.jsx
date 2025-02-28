import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-blue-50 to-indigo-100 p-12 sm:p-24 lg:p-32 rounded-lg shadow-lg'>
        <div className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>
          <h1>Download Our Mobile App</h1>
          <div className='flex gap-4 mt-4'>
            <a href="" className='inline-block'> 
              <img className='h-12' src={assets.play_store} alt="Google Play Store" />
            </a>
            <a href="" className='inline-block'> 
              <img className='h-12' src={assets.app_store} alt="Apple App Store" />
            </a>
          </div>
        </div>
        <img 
          className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' 
          src={assets.app_main_img} 
          alt="Mobile App Preview" 
        />
      </div>
    </div>
  )
}

export default AppDownload
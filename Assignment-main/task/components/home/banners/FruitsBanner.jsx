import Image from 'next/image'
import React from 'react'
import { BannerHeader } from './BannerHeader'

const FruitsBanner = () => {
  return (
    <div className="banner-container">
    <BannerHeader />
    <div className="banner-content h-[180px] md:h-[200px] bg-gray-100 rounded-xl">
      {/* Add fruits-specific content here */}
    </div>
  </div>
  )
}

export default FruitsBanner

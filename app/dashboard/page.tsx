'use client'

import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [imageUrl, setImageUrl] = useState<string>('')

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('/api/image')
      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (error) {
      console.error('Failed to fetch image:', error)
    }
  }

  useEffect(() => {
    fetchRandomImage()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Random"
            className="max-w-full h-auto rounded-md shadow-lg"
          ></img>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button onClick={fetchRandomImage}>Refresh Image</button>
    </div>
  )
}

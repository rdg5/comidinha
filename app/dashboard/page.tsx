'use client'

import React, { useState, useEffect } from 'react'

export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRandomImage() // Fetch the initial image when the component mounts
  }, [])

  const fetchRandomImage = () => {
    setLoading(true) // Start loading state
    fetch('/api/get-homepage-images') // API endpoint that returns a single random image URL
      .then((res) => res.json())
      .then((data) => {
        if (data.imageUrl) {
          setImageUrl(data.imageUrl)
        } else {
          console.error('No image URL found:', data)
        }
        setLoading(false) // End loading state
      })
      .catch((err) => {
        console.error('Error fetching image:', err)
        setLoading(false) // Ensure loading state is cleared on error
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Random Image"
            className="object-cover w-full h-full transition-opacity duration-500"
          />
        ) : loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <p className="text-center">Click "Next Image" to load an image.</p>
        )}
      </div>
      <div className="absolute bottom-10">
        <button
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          onClick={fetchRandomImage}
          disabled={loading}
        >
          Next Image
        </button>
      </div>
    </div>
  )
}

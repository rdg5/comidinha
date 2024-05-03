'use client'
import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'

export default function HomePage() {
  const [images, setImages] = useState([])
  const imageContainerRef = useRef(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-homepage-images')
        const data = await response.json()
        if (data.imageUrls && data.imageUrls.length) {
          setImages(data.imageUrls)
        } else {
          console.error('No images found or invalid response:', data)
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }
    fetchImages()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const { current } = imageContainerRef
        if (current) {
          const currentIndex = Math.round(
            current.scrollTop / window.innerHeight,
          )
          const nextIndex = currentIndex + (event.key === 'ArrowDown' ? 1 : -1)
          const nextElement = current.children[nextIndex]
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex h-screen">
      <div
        ref={imageContainerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="h-screen snap-start flex justify-center items-center"
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-1/4 max-h-1/4 object-contain"
            />
          </div>
        ))}
      </div>
      <Sidebar />
    </div>
  )
}

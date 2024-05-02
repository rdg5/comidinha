'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function HomePage() {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    fetch('/api/get-multiple-images')
      .then((res) => res.json())
      .then((data) => {
        if (data.imageUrls && data.imageUrls.length) {
          setImages(data.imageUrls)
        }
      })
      .catch((err) => console.error('Error fetching images:', err))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const newIndex = currentIndex + (event.key === 'ArrowDown' ? 1 : -1)

        if (newIndex >= 0 && newIndex < images.length) {
          setCurrentIndex(newIndex)
          containerRef.current.children[newIndex].scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, images.length])

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
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
  )
}

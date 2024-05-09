import { useState, useEffect } from 'react'
import { useS3Upload } from 'next-s3-upload'
import { useRouter } from 'next/navigation'

export default function UploadComponent() {
  let [imageUrl, setImageUrl] = useState()
  let [showSuccess, setShowSuccess] = useState(false)
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  const router = useRouter()

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file)
    setImageUrl(url)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      router.push('/dashboard')
    }, 6500)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-2 mb-1"
        onClick={openFileDialog}
      >
        Upload your lunch
      </button>
      {showSuccess && imageUrl && (
        <div style={{ position: 'relative' }}>
          <img alt="Uploaded lunch" src={imageUrl} style={{ width: '100%' }} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px #000000',
            }}
          >
            Uploaded Successfully
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, ChangeEvent } from 'react'
import { useS3Upload } from 'next-s3-upload'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function UploadComponent() {
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [showSuccess, setShowSuccess] = useState(false)
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  const router = useRouter()
  const { user } = useUser()

  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file)
    setImageUrl(url)
    setShowSuccess(true)

    if (user) {
      await saveImageToDB(url, user.id)
    }

    setTimeout(() => {
      setShowSuccess(false)
      router.push('/dashboard')
    }, 6500)
  }

  const saveImageToDB = async (url: string, userId: string) => {
    const response = await fetch('/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, imageUrl: url }),
    })

    if (!response.ok) {
      console.error('Failed to save image URL to the database')
    }
  }

  return (
    <div>
      <FileInput
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFileChange(e.target.files![0])
        }
      />
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

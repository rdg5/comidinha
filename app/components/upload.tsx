import { useState } from 'react'
import { useS3Upload } from 'next-s3-upload'

export default function UploadComponent() {
  let [imageUrl, setImageUrl] = useState()
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file)
    setImageUrl(url)
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

      {imageUrl && <img alt="" src={imageUrl} />}
    </div>
  )
}

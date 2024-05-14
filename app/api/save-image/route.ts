import { createClient } from 'edgedb'
import { NextResponse } from 'next/server'

const client = createClient()

export const POST = async (request) => {
  const { userId, imageUrl } = await request.json()

  if (!userId || !imageUrl) {
    return NextResponse.json(
      { error: 'Missing userId or imageUrl in the request body' },
      { status: 400 },
    )
  }

  try {
    await client.transaction(async (tx) => {
      await tx.query(
        `
        WITH
          user_id := (SELECT User FILTER .UserID = <uuid>$0),
          image_url := <str>$1,
          current_date := cal::local_date_current()
        INSERT Photo {
          PhotoURL := image_url,
          UploadDate := current_date,
          User := user_id
        };
      `,
        [userId, imageUrl],
      )
    })

    return NextResponse.json(
      { message: 'Image saved successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error saving image:', error)
    return NextResponse.json(
      { error: 'Error saving image to the database' },
      { status: 500 },
    )
  }
}

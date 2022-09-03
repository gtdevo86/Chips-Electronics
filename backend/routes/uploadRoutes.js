import express from 'express'
import { format } from 'util'
const router = express.Router()
import Multer from 'multer'
import { Storage } from '@google-cloud/storage'

var storage = null
if (process.env.NODE_ENV === 'production') {
  storage = new Storage()
} else {
  storage = new Storage({
    projectId: 'chips-electronics',
    keyFilename: '../keys.json',
  })
}
const bucket = storage.bucket('chips-electronics.appspot.com')
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})
import path from 'path'

router.post('/:id', multer.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.')
    return
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(
    `uploads/${req.params.id}${path.extname(req.file.originalname)}`
  )
  const blobStream = blob.createWriteStream()

  blobStream.on('error', (err) => {
    next(err)
  })

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    res.status(200).send(publicUrl)
  })

  blobStream.end(req.file.buffer)
})
export default router

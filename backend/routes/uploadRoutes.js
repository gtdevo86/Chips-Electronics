import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    var dest = 'uploads/' + req.params.id
    var stat = null
    try {
      stat = fs.statSync(dest)
    } catch (err) {
      fs.mkdirSync(dest)
    }
    cb(null, dest)
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/:id', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router

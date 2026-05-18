import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { listUploads, uploadFile, updateUpload, deleteUpload } from '../controllers/uploadsController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.resolve(__dirname, '../../public/uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now()
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    cb(null, `${timestamp}-${safeName}`)
  },
})

const upload = multer({ storage })
const router = Router()

router.get('/', listUploads)
router.post('/', upload.single('file'), uploadFile)
router.put('/:id', updateUpload)
router.delete('/:id', deleteUpload)

export default router

import express from 'express'
import { uploadSingleFile } from '../controllers/upload.controller'
const router = express.Router()

router.route('/').post(uploadSingleFile)
export default router

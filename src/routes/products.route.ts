import express from 'express'
import { createProduct, getProductByIdAndLocale, updateProduct, deleteProduct, deleteProductV2 } from '../controllers/product.controller'
import { validateBody, validateQueryParams, getOnly, validateDeleteBody } from '../middlewares/product.validator.middleware'
const router = express.Router()

router.route('/').post(validateBody(), createProduct)
router.route('/').get(getOnly, validateQueryParams(), getProductByIdAndLocale)
router.route('/').put(validateBody(), updateProduct)
// router.route('/').delete(validateDeleteBody(), deleteProduct) //case 1
router.route('/').delete(validateDeleteBody(), deleteProductV2) //case 2 where we don`t delete the record just hide them with a flag of visible boolean
// router.route('/getAnalysis')
export default router

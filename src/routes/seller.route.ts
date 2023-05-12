import express from 'express'
import { getProductBySellerName, getAllProducts } from '../controllers/seller.controller'
import { getOnly, validateParams } from '../middlewares/product.validator.middleware'
const router = express.Router()

router.route('/:seller_name/products').get(getOnly, validateParams(), getProductBySellerName)
router.route('/getAnalysis').get(getOnly, getAllProducts)
export default router

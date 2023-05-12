import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { StatusCodes } from 'http-status-codes'
import { body, param, validationResult, check } from 'express-validator'

export const validateBody = () => {
	return [
		body('asin').isString(),
		body('locale').isString(),
		body('seller_name').isString(),
		body('availability').isBoolean(),
		body('price').isFloat(),
		body('proudct_name').isString(),
		body('product_link').isString(),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: errors.array() })
			}
			next()
		},
	]
}
export const validateQueryParams = () => {
	return [
		check('locale').notEmpty().withMessage('locale is required.'),
		check('asin').notEmpty().withMessage('ASIN is required'),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: errors.array() })
			}
			next()
		},
	]
}
export const getOnly = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'GET' && Object.keys(req.body).length > 0) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: 'Request body not allowed in GET request' })
	}
	next()
}
export const validateDeleteBody = () => {
	return [
		body('products')
			.isArray()
			.withMessage('The "products" field must be an array')
			.isArray({ min: 1 })
			.withMessage('The "products" array must not be empty')
			.custom((products) => {
				if (!Array.isArray(products)) {
					throw new Error('products must be an array')
				}

				for (const product of products) {
					if (!product.asin) {
						throw new Error('ASIN is required for each item')
					}

					if (!product.locale) {
						throw new Error('Locale is required for each item')
					}
				}
				// Return true if all objects in the array are valid
				return true
			}),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: errors.array() })
			}
			next()
		},
	]
}
export const validateParams = () => {
	return [
		param('seller_name').trim().notEmpty().withMessage('Seller name is required'),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: errors.array() })
			}
			next()
		},
	]
}

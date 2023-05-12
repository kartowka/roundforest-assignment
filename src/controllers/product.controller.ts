import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
const prisma = new PrismaClient()

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = req.body
		const result = await prisma.seller_product.upsert({
			where: {
				asin_locale: {
					asin: product.asin,
					locale: product.locale,
				},
			},
			create: {
				asin: product.asin,
				locale: product.locale,
				seller_name: product.seller_name,
				availability: product.availability === 'true' ? true : false,
				price: parseFloat(product.price),
				product_name: product.proudct_name,
				product_link: product.product_link,
			},
			update: {},
		})
		res.status(StatusCodes.CREATED).json({ StatusCode: StatusCodes.CREATED, message: `Seller product [ASIN:"${product.asin}",Locale: "${product.locale}"] created successfully` })
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}
type QueryParams = {
	asin: string
	locale: string
}
export const getProductByIdAndLocale = async (req: Request, res: Response) => {
	try {
		const product = req.query as QueryParams
		const data = await prisma.seller_product.findFirst({
			where: {
				asin: product.asin,
				locale: product.locale.toUpperCase(),
				visible: !false,
			},
		})
		if (!data) {
			return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, data: 'data doesn`t exist.' })
		}
		return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, data: data })
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const product = req.body
		let productExist = await prisma.seller_product.findFirst({
			where: {
				asin: product.asin,
				locale: product.locale.toUpperCase(),
			},
		})
		if (!productExist) {
			return res.status(StatusCodes.CONFLICT).json({ StatusCode: StatusCodes.CONFLICT, errors: 'product doesn`t exist.' })
		}
		productExist = await prisma.seller_product.update({
			where: {
				asin_locale: {
					asin: product.asin,
					locale: product.locale,
				},
			},
			data: {
				seller_name: product.seller_name,
				availability: product.availability === 'true' ? true : false,
				price: parseFloat(product.price),
				product_name: product.proudct_name,
				product_link: product.product_link,
			},
		})
		return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, data: productExist, message: `product [ASIN:"${product.asin}",Locale: "${product.locale}"] has been updated.` })
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}
//first implementation
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const products = req.body
		const deletedProducts = await prisma.seller_product.deleteMany({
			where: {
				asin: { in: products.asin },
				locale: { in: products.locale },
			},
		})
		return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, message: `Deleted ${deletedProducts.count} products` })
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}
//second implementation
export const deleteProductV2 = async (req: Request, res: Response) => {
	try {
		const products = req.body
		const deletedProducts = await prisma.seller_product.updateMany({
			where: {
				asin: { in: products.asin },
				locale: { in: products.locale },
			},
			data: {
				visible: false,
			},
		})
		return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, message: `Deleted ${deletedProducts.count} products` })
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
const prisma = new PrismaClient()

export const getProductBySellerName = async (req: Request, res: Response) => {
	try {
		const seller_name = req.params.seller_name
		const data = await prisma.seller_product.findMany({
			where: {
				seller_name: seller_name,
				visible: true,
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
export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const result = await prisma.seller_product.groupBy({
			by: ['seller_name', 'locale'],
			_count: {
				availability: true,
			},
			_avg: {
				price: true,
			},
		})
		const unavailable = await prisma.seller_product.groupBy({
			by: ['seller_name', 'locale'],
			_count: true,
			where: { availability: false },
		})
		const formattedResult = result.map((group) => {
			const {
				seller_name,
				locale,
				_count: { availability: availableProducts },
				_avg: { price: avgPrice },
			} = group
			const unavailableRow = unavailable.find((row) => row.seller_name === seller_name && row.locale === locale)
			const unavailable_count = unavailableRow ? unavailableRow._count : 0
			const averagePrice = avgPrice

			return {
				seller_name,
				locale,
				available_products: availableProducts,
				unavailable_products: unavailable_count,
				average_price: averagePrice,
			}
		})

		res.json(formattedResult)
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}

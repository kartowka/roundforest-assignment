import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
const prisma = new PrismaClient()
interface Count {
	true: number
	// add other properties as needed
}

interface Item {
	seller_name: string
	locale: string
	_count: Count | number
	// add other properties as needed
}
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
		// const data = await prisma.seller_product.groupBy({
		// 	by: ['seller_name', 'locale'],
		// 	_count: {
		// 		_all: true,
		// 		availability: true,
		// 		price: true,
		// 	},
		// 	_sum: {
		// 		price: true,
		// 	},
		// })
		// return
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}

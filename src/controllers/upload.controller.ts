import { Request, Response } from 'express'
import Papa from 'papaparse'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { StatusCodes } from 'http-status-codes'
import { exit } from 'process'
const prisma = new PrismaClient()

type csv_seller = {
	asin: string
	locale: string
	price: string
	proudct_name: string
	product_link: string
}
export const uploadSingleFile = async (req: Request, res: Response) => {
	const { filename } = req.body
	const seller_name = path.basename(filename).split('_')[0]
	if (!filename) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: 'No file path provided' })
	}
	const products: csv_seller[] = []
	try {
		fs.createReadStream(filename)
			.pipe(
				Papa.parse(Papa.NODE_STREAM_INPUT, {
					header: true,
				})
			)
			.on('data', (data) => {
				products.push(data)
			})
			.on('error', (error) => {
				return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: error.message })
			})
			.on('end', async () => {
				for (const product of products) {
					await prisma.seller_product.upsert({
						where: {
							asin_locale: {
								asin: product.asin,
								locale: product.locale,
							},
						},
						create: {
							asin: product.asin,
							locale: product.locale,
							seller_name: seller_name,
							availability: true,
							price: parseFloat(product.price),
							product_name: product.proudct_name,
							product_link: product.product_link,
						},
						update: {},
					})
				}
				return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, message: 'file has been uploaded.' })
			})
	} catch (e) {
		return res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, errors: e })
	} finally {
		await prisma.$disconnect()
	}
}

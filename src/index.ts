import express, { Express, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import dotenv from 'dotenv'
import productRouter from './routes/products.route'
import sellerRouter from './routes/seller.route'
import uploadRouter from './routes/upload.route'
import connectDB from './db/config'

dotenv.config()

const app: Express = express()
const PORT = Number(process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(requestResponseLogger)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/seller', sellerRouter)
app.use('/api/v1/upload', uploadRouter)

app.use((req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: 'page not found.' })
})
app.listen(PORT, async () => {
	console.info(`server running on http://localhost:${PORT}`)
	// const data = fs.readFileSync('seller_products_template.csv', 'utf8')
	// const results = Papa.parse(data, { header: true }).data
	// console.log(JSON.stringify(results.slice(0, 10)))
	await connectDB()
})

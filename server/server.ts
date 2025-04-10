import fastifyStatic from '@fastify/static'
import { DOTA2GSI, Dota2Raw } from 'dotagsi'
import dotenv from "dotenv"
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import path from 'path'
import { Server as SocketIOServer } from 'socket.io'
import { processData } from './handlerData'
import fastifyCors from '@fastify/cors'
dotenv.config()

const fastify: FastifyInstance = Fastify()
const GSI = new DOTA2GSI()

let io: SocketIOServer | null = null

console.log(__dirname)

let readings = 0;

const PORT = process.env.PORT || "3006"
const HOST = process.env.HOST || 'localhost'

const FRONTEND_HOST = process.env.FRONTEND_HOST || 'localhost'
const FRONTEND_PORT = process.env.FRONTEND_PORT || '3007'

const FRONTEND_URL = `http://${FRONTEND_HOST}:${FRONTEND_PORT}` || 'http://localhost:3007'


fastify.register(fastifyCors, {
	origin: "*",
	methods: ['GET', 'POST'],
	credentials: true
})



fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend/build'), 
    prefix: '/', 
  })

// GSI POST route
fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
	const data = request.body as Dota2Raw 
	const digested = GSI.digest(data)
	const processed = processData(digested, data)

	

	if (io) {
		io.emit('data', processed)
		readings++
	}

	
	//console.clear()
	//console.log("Data readings: ", readings)

	return { received: true }
})



// Start server
const start = async () => {
	try {
		const address = await fastify.listen({ port: parseInt(PORT), host: HOST })

		io = new SocketIOServer(fastify.server, {
			cors: {
				origin: [FRONTEND_URL, `http://localhost:${FRONTEND_PORT}`],
				methods: ['GET', 'POST'],
				credentials: true,
			},
		})

		io.on('connection', (socket) => {
			//do nothing

			socket.on('disconnect', () => {
				//do nothing
			})
		})

		console.log(`Server running at http://${HOST}:${PORT}`)
        //console.log(`Expected Frontend at ${FRONTEND_URL}`) //DEV
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()

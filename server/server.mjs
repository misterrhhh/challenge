import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Server } from 'socket.io'
import { DOTA2GSI } from 'dotagsi'


const fastify = Fastify()
const GSI = new DOTA2GSI();



let io

//cors stuff
await fastify.register(cors, {
	origin: 'http://localhost:3000',
	credentials: true,
})


//GSI route
fastify.post('/', async (request, reply) => {
	let data = request.body
	let digested = GSI.digest(data) //clean data with "dotagsi" lib
	let processed = processData(digested, data) //OPTIONAL: process data with custom function

	// Send data to frontend with websockets
	if (io) {
		io.emit('data', processed) 
	}

	return { received: true }
})

// Endpoint qualquer
fastify.get('/', async (req, reply) => {
	return { msg: 'Servidor ativo' }
})

const processData = (digested, data) => {

	let processed = {
		...digested,
		league: {
			dire: data.league.dire,
			radiant: data.league.radiant,
			description: data.league.description,
			name: data.league.name,
			series_type: data.league.series_type,
		}
	}

	return processed;
}


// Start server
const start = async () => {
	try {
		const address = await fastify.listen({ port: 3006, host: 'localhost' })

		io = new Server(fastify.server, {
			cors: {
				origin: 'http://localhost:3000',
				methods: ['GET', 'POST'],
				credentials: true,
			},
		})

		io.on('connection', (socket) => {
			console.log('Socket connected!:', socket.id)

			socket.on('disconnect', () => {
				console.log('Socket disconnected!:', socket.id)
			})
		})

		console.log(`🔥 Server running (${address})`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()

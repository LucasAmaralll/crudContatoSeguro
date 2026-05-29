import express from 'express'

import { userRoutes } from './routes/user.routes.js'
import { ticketRoutes } from './routes/ticket.routes.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  })
})

app.use('/users', userRoutes)

app.use('/tickets', ticketRoutes)

export { app }

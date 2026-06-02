import express from 'express'
import { setupSwagger } from './config/swagger.js'
import { userRoutes } from './routes/user.routes.js'
import { ticketRoutes } from './routes/ticket.routes.js'

const app = express()

app.use(express.json())

// Configuração do Swagger
setupSwagger(app)

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se a API está online
 *     tags: [Geral]
 *     responses:
 *       200:
 *         description: API está funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: ok }
 */
app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  })
})

app.use('/users', userRoutes)

app.use('/tickets', ticketRoutes)

export { app }
